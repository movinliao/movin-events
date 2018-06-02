#include "stable.h"

#include "cominterface.h"
#include "baseservice.h"

BaseService::BaseService(QObject* parent/* = NULL*/, UINT32 serviceId/* = KServiceId*/, bool needClose/* = true*/)
	: QObject(parent)
	, m_connectionId(0)
	, m_serviceId(serviceId)
	, m_needClose(needClose)
{
	m_connection = connectionService;
	if(!m_connection)
	{
		logErr()<<"BaseService::Init"<<" yyServiceConnection = " << m_connection;
		return;
	}
	m_connection->setId(m_serviceId);

	_initConnection();

	xsignals_helper::sig_connect(*m_connection->getServiceReadySignal(), this, &BaseService::_onServiceReady);
	m_connectionId = m_connection->getConnection(true);
	if (m_connection->isServiceReady())
	{
		QMetaObject::invokeMethod(this, "_onServiceReady", Qt::QueuedConnection);
	}
}

BaseService::~BaseService()
{
	if(m_needClose && m_connection)
	{
		m_connection->closeConnection(m_connectionId);
	}
	xsignals_helper::free_all_slots_of(this);
}

bool BaseService::send(const std::string& data)
{
	if(!m_connectionId)
	{
		logErr()<<"BaseService::Send"<<" disconnect to yy.";
		return false;
	}

	m_connection->sendConnectionData(m_connectionId, data);
	return true;
}


void BaseService::_onAddonDataArrived(unsigned int id, const std::string& data)
{
	Q_UNUSED(id);
	Q_UNUSED(data);

	emit sigDataArrived(data);
}

void BaseService::_onServiceReady()
{
	log() << "service " << m_serviceId << " ready!";
	emit sigServiceReady();
}

void BaseService::_initConnection()
{
	xsignals_helper::sig_connect(*m_connection->getConnectionDataArrivedSignal(), this, &BaseService::_onAddonDataArrived);
}
