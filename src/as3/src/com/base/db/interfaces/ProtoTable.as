package com.base.db.interfaces
{
	public final class ProtoTable
	{
		public static const MYINFO_KEY:uint = 1;
		
		public static const TABLE_ID:Object = {
			TBL_LOGINUINFO			:1, 
			TBL_SESSINFO			:2, 
			TBL_SESSUINFO			:3,
			TBL_SESSMICUINFO		:4,
			TBL_CHANNEL_FIELDSET	:5,
			TBL_STAT_FIELDSET		:6,
			TBL_UINFO				:7
		};
		
		public static const LOGINUINFO:Object = {        
			dwUid		:1,
			strCookie	:2,
			strSign		:3,
			strNick		:4,
			strPassport	:5,
			strAccount	:6,
			strMacaddr	:7,
			strPassword	:8,
			dwLoginType	:9,
			dwWanIp		:10,
			dwImid		:11,
			dwSid		:12,
			dwSubSid	:13,
			dwAsid		:14,
			strBirthday	:15,
			dwArea		:16,
			dwProvince	:17,
			dwCity		:18,
			dwUserJF	:19,
			strResume	:20,
			dwIspType	:21,
			dwAreaType	:22,
			dwSex		:23,
			strToken	:24,
			strClientVer:25,
			strPCInfo	:26,
			dwLinkLostTime:27,
			bHasJoined	:28,
			bSendLeaveChannel:29,
			dwRole		:30,
			strToken	:31
		};
		
		public static const CHANNEL_FIELDSET:Object = {
			dwReceptSid		:1,
			listMic			:2,
			listChorus		:3,
			dwUserCount		:4,
			bIsMicMute		:5,
			bIsMicDisable	:6,
			dwMicTotalTime	:7,
			dwMicValidTime	:8,
			strListenVol	:9,
			strUplinkVol	:10,
			strMicActiveLevel:11,
			strMuteArr		:12
		};
		
		public static const SESSINFO:Object = {
			dwSid				:1,
			strName				:2,
			btCodecRate			:3,
			btStyle				:4,
			dwSort				:5,
			dwPid				:6,
			bIsProtected		:7,
			bSubMemberOnly		:8,
			bIsTextLimit		:9,
			bTextLimitGuestOnly	:10,
			bGuestEnableLimit	:11,
			dwGuestWaitTime		:12,
			dwGuestMaxText		:13,
			dwGuestJoinMaiXu	:14,
			bGuestVoice			:15,
			bGuestAccessLimit	:16,
			bGuestAccessTopLimit:17,
			dwFrameTransMode	:18,
			dwFrameNumOfLow		:19,
			dwFrameNumOfHigh	:20,
			dwUserCount			:21,
			dwSubChannelOrder	:22,
			bHasPasswd			:23,
			dwMicroTime			:24,
			dwTxtLimitTime		:25,
			dwGuildLogo			:26,
			strGuildLogoUrl		:27,
			bBrocastEnableLimit	:28,
			dwBroadcastInterval	:29,
			dwMemberLimit		:30,
			btVoiceQc			:31,
			dwTemplateId		:32,
			bGuestTxtBindMobile	:33,
			dwAppType			:34
		};
		
		public static const SESSUINFO:Object = {        
			dwUid			:1,
			dwPid			:2,
			strSign			:3,
			strNick			:4,
			dwUinfoJifen	:5,
			dwSmemberJifen	:6,
			dwSex			:7,
			listRoles		:8,
			dwRole			:9,
			bIsVip			:10,
			dwVipJifen		:11,
			btVipLevel		:12,
			bVipChannelRedName:13,
			bVipChannelPurpleName:14,
			bPurpleDiamond	:15,
			bSuperPlDiamond	:16,
			dwImid			:17,
			strBasicCardData:18
		};
		
		public static const PROTOSTATISTIC:Object = {        
			strLbsIp		:1,
			strApIp			:2,
			dwLoginStartTime:3,
			dwLbsResTime	:4,
			dwApConnectTime	:5,
			dwApConnectedTime:6,
			dwApExgkeyTime	:7,
			dwApAuthTime	:8,
			dwApCredTime	:9,
			dwStage			:10,
			dwTopStage		:11,
			dwLoginRes		:12,
			dwJoinRes		:13,
			dwServiceRes	:14,
			strSerApIp		:15,
			dwSerStage		:16,
			dwSerTopStage	:17,
			dwIsFirstViewer	:18,
			dwHasVideo		:19,
			dwSerApGrpId	:20,
			dwSerStartTime	:21,
			dwSerEndTime	:22,
			dwPlayStep		:23,
			strFirstAp		:24,
			dwFirstApStartT	:25,
			dwFirstApEndT	:26
		};
		
		public static const UINFO:Object = {        
			dwUid		:1,
			strSign		:2,
			strNick		:3,
			strPassport	:4,
			dwImid		:5,
			strBirthday	:6,
			dwArea		:7,
			dwProvince	:8,
			dwCity		:9,
			dwUserJF	:10,
			strIntro	:11,
			dwIspType	:12,
			dwAreaType	:13,
			dwSex		:14
		};
	}
}