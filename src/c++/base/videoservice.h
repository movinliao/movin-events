#pragma once

#include "yycomponent/yychannel/yyserviceconnectionex_i.h"
#include "baseservice.h"

class VideoService
	: public BaseService
{
	Q_OBJECT
	Q_DISABLE_COPY(VideoService)

public:
	VideoService(UINT32 serviceId);
	~VideoService(void);

	virtual bool send(const std::string& data);

private:
	void _initConnection();
	void _onVideoDataArrived(const std::string& data);

private:
	IYYVideoDataConnectionPtr m_videoConnection;
};

