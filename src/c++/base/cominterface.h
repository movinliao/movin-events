#pragma once

namespace com_service
{
	using namespace mf;

	template <bool>
	struct throw_helper
	{
		static void nullInterface(){};
	};
	template<>
	struct throw_helper<true>
	{
		static void nullInterface()
		{
			throw std::exception("Invalid service or interface!");
		}
	};

	template <bool enable_throw = true>
	struct ComService
	{
		typedef throw_helper<enable_throw> MyThrow;

		ComService(const char *serviceName)
			:m_serviceName(serviceName)
		{

		}

		template <class Interface>
		operator comptr<Interface> ()
		{
			comptr<Interface> inter = comRoot() ? comRoot()->getServiceInterface<Interface>(m_serviceName) : 0;		
			if(!inter)
			{
				MyThrow::nullInterface();
			}
			return inter;
		}

	private:
		const char * const m_serviceName;
	};

	template <bool enable_throw = true>
	struct RootService
	{
		typedef throw_helper<enable_throw> MyThrow;
		template <class Interface>
		operator comptr<Interface> ()
		{
			comptr<Interface> inter;
			if(comRoot())
			{
				comRoot()->queryInterface(inter);
			}
			if(!inter)
			{
				MyThrow::nullInterface();
			}
			return inter;
		}
	};

	template <bool enable_throw = true>
	struct CreateService
	{
		typedef throw_helper<enable_throw> MyThrow;

		CreateService(const char *serviceName)
			:m_serviceName(serviceName)
		{
		}

		template <class Interface>
		operator comptr<Interface> ()
		{
			comptr<Interface> inter = NULL; 
			if(comRoot()) comRoot()->coCreateComService<Interface>(m_serviceName, NULL,  inter);
			if(!inter) MyThrow::nullInterface();
			return inter;
		}

	private:
		const char * const m_serviceName;
	};
}
typedef com_service::RootService<true> _RootService;
typedef com_service::ComService<true> _ComService;
typedef com_service::CreateService<true> _CreateService;
typedef com_service::RootService<false> _NothrowRootService;
typedef com_service::ComService<false> _NothrowComService;
typedef com_service::CreateService<false> _NothrowCreateService;

//IYYServiceConnectionExPtr ( KSERVICEServiceConnection );
//IDWUIContainerPtr >( KSERVICEMainTabItemContainer );
//IYYDebusHelperPtr >( KSERVICECommon );
//IYYChannelMessageExPtr >( KSERVICEChannel );
//IYYTicketSimulatorPtr >( KSERVICECommon );
//IYYComponentTranslatorPtr >( KSERVICECommonComponentLevel );
//IYYUICreatorPtr >( KSERVICECommonComponentLevel );
//IYYOnAirCardPtr >( KSERVICEChannel );
//IYYChannelMaiXuListPtr >( KSERVICEChannel );
//IYYChannelMessageListPtr >( KSERVICEChannel );
//IYYTicketPtr >( KSERVICECommonComponentLevel );
//IYYDataReportPtr >( KSERVICEMainframe );
//IDWLanguageInfoPtr >( "" );
//IDWComponentMiscInfoPtr >( "" );
//IYYChannelWindowPtr >( KSERVICEChannel );
//IYYChannelInfomationPtr >( KSERVICEChannel );
//IChannelTemplatePtr >( KSERVICEChannel );
//IYYAuthenticationPtr >( KSERVICECommon );
//IYYIPCWindowHostExPtr >( "" );
//IYYUDBTicketPtr >( KSERVICECommonComponentLevel );
//IYYCustomDataProviderNotifyPtr >( KSERVICEPlugin );
//IYYChannelFollowPtr >( KSERVICEChannel );
//IYYUtilityExPtr >( KSERVICECommon );
//IYYUserInfoFrameManagerPtr >( KSERVICECommon );
//IYYChannelSmilePtr >( KSERVICEChannel );
//IYYChannelSettingPtr >( KSERVICEChannel );
//IYYPropsPtr >( KSERVICEChannel );
//IYYBuddyListPtr >( KSERVICEImGroup );
//IYYImQueryUserInfoPtr >( KSERVICECommon );
//IYYFaceImagePtr >( KSERVICECommon );
//IYYChannelUserListPtr >( KSERVICEChannel );
//IChannelAudioLogicPtr >( KSERVICEChannel );
//IChannelInputEditPtr >( KSERVICEChannel );
//IYYSpeakSettingPtr >( KSERVICESpeakSetting );
//IYYNotifierPtr >( KSERVICECommon );
//IYYUrlhelperPtr >( KSERVICECommon );
//IYYWonderWorldInfoPtr >( KSERVICEChannel );
//IImageDecoratorPtr >( KSERVICEImageDecorator );
//IDecoratorLyricPtr >( KSERVICEDecorateLyric );
//IYYChannelKaraokeScorePlayerPtr >( KSERVICEChannelLogic );
//IChannelAudioLogicPtr >( KSERVICEChannel );
//IYYDataReportPtr >( KSERVICEMainframe );
//IYYComStorePtr >( KSERVICEYYComStore );

extern _RootService rootService;
extern _ComService commonService; //KSERVICECommon
extern _ComService channelService; //KSERVICEChannel
extern _ComService channelLogicService; //KSERVICEChannelLogic
extern _ComService mainframeService; //KSERVICEMainframe
extern _ComService mainframeLogicService; //KSERVICEMainframeLogic
extern _ComService imGroupService; //KSERVICEImGroup
extern _ComService channelLogicComponentService; //KSERVICEChannelLogicComponentLevel
extern _ComService commonComponentService; // KSERVICECommonComponentLevel
extern _ComService pluginService; // KSERVICEPlugin
extern _CreateService downloaderService; //KSERVICEDownloader
extern _CreateService connectionService; //KSERVICEServiceConnection
extern _ComService comStore; // KSERVICEYYComStore
extern _CreateService templateService; //KSERVICEOpConnection

extern _NothrowRootService noThrowRootService;
extern _NothrowComService noThrowCommonService;
extern _NothrowComService noThrowChannelService;
extern _NothrowComService noThrowChannelLogicService;
extern _NothrowComService noThrowMainframeService;
extern _NothrowComService noThrowMainframeLogicService;
extern _NothrowComService noThrowImGroupService;
extern _NothrowComService noThrowChannelLogicComponentService;
extern _NothrowComService noThrowCommonComponentService;
extern _NothrowComService noThrowPluginService;
extern _NothrowCreateService noThrowDownloaderService;
extern _NothrowCreateService noThrowConnectionService;
extern _NothrowComService noThrowComStore;
extern _NothrowCreateService noThrowTemplateService; 

class DuiMenu;
class DuiWidget;
class DuiFrameWindow;
class DuiTextToolTip;
namespace yy
{
	bool			createWidget(const QString &fileName, DuiWidget *parent);
	DuiFrameWindow* createFrameWindow(const QString& fileName,  QWidget *parent);
	DuiMenu	*		createMenu(const QString& xml, QObject* actionSlotReceiver, Qt::ConnectionType connectionType);
	DuiFrameWindow *channelFrame();
	DuiWidget *mainTemplate();
	DuiTextToolTip* textToolTip();

	QString componentRootPath();



	void openUrl(const std::wstring &url);
	void openLoginUrl(const std::wstring &url);
	bool sendByProcess(uint dataType, const char* data, uint len, uint addonid);
	std::wstring yypath();
	std::wstring yycomponentPath();
	user_id myUid();
	bool isWonderWorld();
	time_t serviceTime();
	void changeChannel(__int64 sid, __int64 ssid);
	void changeChannel(__int64 sid, __int64 ssid, const QString& userData);
	QString getJoinInfo();
	quint32 channelSid();
	quint32 channelShortSid();
	quint32 curSubSid();
	void showSpeakedUsersView();
}

