#pragma once

#include "yycomponent/yychannel/yyserviceconnectionex_i.h"

class BaseService
	: public QObject
	, public xsignals::trackable
{
	Q_OBJECT
	Q_DISABLE_COPY(BaseService)

public:

	BaseService(QObject* parent = NULL, UINT32 serviceId = 0, bool needClose = true);
	virtual ~BaseService();

	virtual bool send(const std::string& data);

signals:
	void sigDataArrived(const std::string &data);
	void sigServiceReady();

protected:
	virtual void _initConnection();

private:
	void _onAddonDataArrived(unsigned int id, const std::string& data);
	void _onServiceReady();

protected:
	IYYServiceConnectionExPtr m_connection;

private:
	UINT32 m_connectionId;
	UINT32 m_serviceId;
	bool m_needClose;
};