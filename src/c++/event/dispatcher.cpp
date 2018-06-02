#include "stable.h"

#include "dispatcher.h"

Dispatcher::Dispatcher()
: QObject(NULL)
{

}

Dispatcher::~Dispatcher()
{

}

void Dispatcher::addListener( const std::wstring& key, QObject* listener, quint32 priority )
{
	// todo:
}

void Dispatcher::removeListener( const std::wstring& key, QObject* listener, quint32 priority )
{
	// todo:
}

void Dispatcher::dispatch( const std::wstring& key, const BaseEvent& event )
{
	// todo:
}
