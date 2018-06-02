#include "stable.h"
#include "common/base/cominterface.h"

#include "dwbase/dwcominterface_i.h"

#include "dwutility/usystem.h"

#include "yycomponent/yychannel/yychannelinfo_i.h"
#include "yycomponent/yychannel/yychanneltemplate_i.h"
#include "yycomponent/yychannel/yychannelvoiceinfo_i.h"
#include "yycomponent/yychannel/yychannelwindow_i.h"

#include "yycomponent/yychannellogic/yychannelLogic_i.h"

#include "yycomponent/yycomclsid.h"

#include "yycomponent/yycommon/yyauthentication_i.h"
#include "yycomponent/yycommon/yydebushelper_i.h"
#include "yycomponent/yycommon/yyuicreator_i.h"

_RootService rootService;
_ComService commonService(KSERVICECommon);
_ComService channelService(KSERVICEChannel);
_ComService channelLogicService(KSERVICEChannelLogic);
_ComService mainframeService(KSERVICEMainframe);
_ComService mainframeLogicService(KSERVICEMainframeLogic);
_ComService imGroupService(KSERVICEImGroup);
_ComService channelLogicComponentService(KSERVICEChannelLogicComponentLevel);
_ComService commonComponentService(KSERVICECommonComponentLevel);
_ComService pluginService(KSERVICEPlugin);
_CreateService downloaderService(KSERVICEDownloader);
_CreateService connectionService(KSERVICEServiceConnection);
_ComService comStore(KSERVICEYYComStore);
 _CreateService templateService(KSERVICEOpConnection);

_NothrowRootService noThrowRootService;
_NothrowComService noThrowCommonService(KSERVICECommon);
_NothrowComService noThrowChannelService(KSERVICEChannel);
_NothrowComService noThrowChannelLogicService(KSERVICEChannelLogic);
_NothrowComService noThrowMainframeService(KSERVICEMainframe);
_NothrowComService noThrowMainframeLogicService(KSERVICEMainframeLogic);
_NothrowComService noThrowImGroupService(KSERVICEImGroup);
_NothrowComService noThrowChannelLogicComponentService(KSERVICEChannelLogicComponentLevel);
_NothrowComService noThrowCommonComponentService(KSERVICECommonComponentLevel);
_NothrowComService noThrowPluginService(KSERVICEPlugin);
_NothrowCreateService noThrowDownloaderService(KSERVICEDownloader);
_NothrowCreateService noThrowConnectionService(KSERVICEServiceConnection);
_NothrowComService noThrowComStore(KSERVICEYYComStore);
_NothrowCreateService noThrowTemplateService(KSERVICEOpConnection);


DWDEFINE_INTERFACE(IYYWebLoginTicket) : public IUnk
{
	virtual void getTicket(unsigned int cookie) = 0;
	virtual void openUrl(const std::wstring& strUrl, int type) = 0;
	virtual void doGetTicket(UINT32 callbackWindowId, UINT32 serviceid) = 0;
};

namespace yy
{

	QString componentRootPath()
	{
		QString rootPath;

		if (IDWComponentMiscInfoPtr miscInfoPtr = rootService)
		{
			rootPath = QString::fromStdWString(miscInfoPtr->componentRootPath());
		}
		return rootPath;
	}

	bool createWidget( const QString &fileName, DuiWidget *parent )
	{
		IYYUICreatorPtr creator = commonComponentService;
		return creator->createWidget(fileName, componentRootPath(), parent);
	}

	DuiFrameWindow* createFrameWindow( const QString& fileName, QWidget *parent )
	{
		IYYUICreatorPtr creator = commonComponentService;
		return creator->createFrameWindow(fileName, componentRootPath(), parent);
	}

	DuiMenu	* createMenu( const QString& xml, QObject* actionSlotReceiver, Qt::ConnectionType connectionType )
	{
		IYYUICreatorPtr creator = commonComponentService;
		return creator->createMenu(xml, componentRootPath(), actionSlotReceiver, connectionType);
	}

	DuiFrameWindow *channelFrame()
	{
		IYYChannelWindowPtr channelWidPtr = channelService;
		return channelWidPtr ? channelWidPtr->channelWindow() : NULL;
	}

	//enum ChannelJoinStyle
	//{
	//	JoinNormalStyle,
	//	JoinWonderChannelStyle,
	//	JoinWonderWordStyle,
	//};
	bool isWonderWorld()
	{
		IYYDebusHelperPtr bus = commonService;
		QVariant var =  bus->debusCall(KChannelService, KIChannel, KJoinChannelStyle);
		return var.toUInt()  == 1;
	}

	void openUrl( const std::wstring &url )
	{
		DwUtility::system::openUrl(url);
	}

	void openLoginUrl( const std::wstring &url )
	{
		IYYDebusHelperPtr login = commonService;
		QVariantList args;
		args << QString::fromStdWString(url);
		args << 0;
		login->debusCall( KMainframeService, KMainframeLogin, "openUrl", args);
	}

	time_t serviceTime()
	{
		IYYAuthenticationPtr authen = commonService;
		return authen->syncGetServerTime();
	}

	bool sendByProcess( uint dataType, const char* data, uint len, uint addonid )
	{
		IChannelTemplatePtr templateptr = channelService;
		return templateptr->ct_sendByProcess( dataType, data, len, addonid);
	}

	std::wstring yypath()
	{
		IDWComponentMiscInfoPtr miscInfoPtr = rootService ;
		if (miscInfoPtr)
		{
			return miscInfoPtr->yypath();
		}
		return L"";
	}

	std::wstring yycomponentPath()
	{
		IDWComponentMiscInfoPtr miscInfoPtr = rootService;
		if (miscInfoPtr)
		{
			return miscInfoPtr->componentRootPath();
		}
		return L"";
	}

	user_id myUid()
	{
		IYYAuthenticationPtr authen = commonService;
		return authen->getMyUid();
	}

	void changeChannel( __int64 sid, __int64 ssid )
	{
		IYYDebusHelperPtr dbus = commonService;
		if(dbus)
		{
			if(isWonderWorld())
			{
				dbus->debusCall(KChannelService,KIChannel,KChannelTemplateJoinWithData, sid, ssid, sid, "type=wonder_channel");
				//dbus->debusCall(KChannelService, KIChannel, KChannelWonderWorldJoin, sid, ssid, sid);
			}
			else
			{
				dbus->debusCall(KChannelService,KIChannel,KChannelJoin, sid, ssid, sid);
			}
		}

		//if(dbus) dbus->debusCall(KChannelService,KIChannel,KChannelJoinWithUserData, sid, ssid, sid, userData);
		//if(dbus) dbus->debusCall(KChannelService,KIChannel,KChannelJoin, sid, ssid, sid);
	}

	void changeChannel( __int64 sid, __int64 ssid, const QString& userData )
	{
		IYYDebusHelperPtr dbus = commonService;
		if(dbus) dbus->debusCall(KChannelService,KIChannel,KChannelJoinWithUserData, sid, ssid, sid, userData);
	}

	quint32 channelSid()
	{
		static quint32 ss_sid = 0;
		if(ss_sid == 0)
		{
			IYYChannelInfomationPtr channel = channelService;
			ss_sid = channel ? channel->getSid() : 0;
		}
		return ss_sid;
	}

	quint32 channelShortSid()
	{
		static quint32 ss_sid = 0;
		if(ss_sid == 0)
		{
			IYYChannelInfomationPtr channel = channelService;
			ss_sid = channel ? channel->getAsid() : 0;
		}
		return ss_sid;
	}


	quint32 curSubSid()
	{
		static quint32 ss_cursid = 0;
		if(ss_cursid == 0)
		{
			IYYChannelInfomationPtr channel = channelService;
			ss_cursid = channel ? channel->getCurSubSid() : 0;
		}
		return ss_cursid;
	}

	QString getJoinInfo()
	{
		//似乎传不过来
		QString userData("");
		IYYChannelLogicPtr logic = channelLogicService;
		if (logic)
		{
			JoinInfoHelper helper(logic->getJoinInfo());
			userData = helper.userData();
		}
		return userData;
	}

	void showSpeakedUsersView()
	{
		if (IYYChannelVoiceInfoPtr logic = channelLogicService)
		{
			//logic->showSpeakedUsersView();
		}
	}

}