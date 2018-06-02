#pragma once

#include "baseevent.h"

class Dispatcher
	: public QObject
{
	Q_OBJECT;
public:
	Dispatcher(void);
	virtual ~Dispatcher(void);

	virtual void addListener(const std::wstring& key, QObject* listener, quint32 priority);
	virtual void removeListener(const std::wstring& key, QObject* listener, quint32 priority);
	virtual void dispatch(const std::wstring& key, const BaseEvent& event);
};