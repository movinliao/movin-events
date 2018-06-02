#include "stable.h"

#include "dispimpl.h"
#include "common/event/impl/eventcenter.h"
#include "common/event/handler.h"

namespace event{
	DisImpl::DisImpl(QObject* parent)
		: QObject(parent)
	{
		_baseKey = QString("%1>%2>").arg(QString::fromStdString(this->metaObject()->className())).arg(quint32(this)).toStdWString();
	}

	DisImpl::~DisImpl(void)
	{
	}

	void DisImpl::addListener( const std::wstring& key, const char * member, quint32 priority )
	{
		EventCenter::addListener(_baseKey, key, this, HandlerPtr(new Handler(this, member)), priority);
	}

	void DisImpl::removeListener( const std::wstring& key, const char * member, quint32 priority )
	{
		EventCenter::removeListener(_baseKey, key, this, HandlerPtr(new Handler(this, member)), priority);
	}

	void DisImpl::dispatch( const std::wstring& key, BaseEventPtr evt )
	{
		EventCenter::dispatch(_baseKey, key, evt);
	}

	void DisImpl::doEvent( const std::wstring& key, ParamPtr param )
	{
		BaseEventPtr event(new BaseEvent(key, param));
		dispatch(key, event);
	}

	void DisImpl::clear()
	{
		EventCenter::clear(_baseKey);
	}

	void DisImpl::on( const std::wstring& key, const char * member, quint32 priority )
	{
		addListener(key, member, priority);
	}

	void DisImpl::off( const std::wstring& key, const char * member, quint32 priority )
	{
		removeListener(key, member, priority);
	}

}

