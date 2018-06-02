#include "stable.h"

#include "videoservice.h"

VideoService::VideoService(UINT32 serviceId)
: BaseService(NULL, serviceId, true)
{
	if (!m_connection->queryInterface(m_videoConnection))
	{
		logErr();
		return;
	}
}

VideoService::~VideoService(void)
{
	xsignals_helper::free_all_slots_of(this);
}

void VideoService::_initConnection()
{
	xsignals_helper::sig_connect(*m_videoConnection->getSigOnAppVideoData(), this, &VideoService::_onVideoDataArrived);
}

bool VideoService::send(const std::string& data)
{
	if (m_videoConnection)
	{
		bool result = m_videoConnection->sendAppVideoData(data);
		if (!result) {
			logErr();
		}
		return result;
	}
	return false;
}

void VideoService::_onVideoDataArrived(const std::string& data)
{
	emit sigDataArrived(data);
}
