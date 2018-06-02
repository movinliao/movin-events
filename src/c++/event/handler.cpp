#include "stable.h"

#include "handler.h"

namespace event{
	Handler::Handler(QObject* lis, const char * mem, Qt::ConnectionType type)
		: QObject(NULL)
		, _listener(lis)
		, _member(mem)
		, _type(type)
	{
	}

	Handler::~Handler(void)
	{
		_listener = NULL;
		_member = "";
	}

	void Handler::apply( BaseEventPtr evt )
	{
		_listener && QMetaObject::invokeMethod(_listener, _member.c_str(), _type, Q_ARG(BaseEventPtr, evt));
	}

	bool Handler::operator==( const Handler* other )
	{
		return (_listener == other->_listener) && (_member == other->_member) && (_type == other->_type);
	}

	bool Handler::operator==( QSharedPointer<Handler> other )
	{
		return !other.isNull() && (_listener == other->_listener) && (_member == other->_member) && (_type == other->_type);
	}

	bool Handler::same( QSharedPointer<Handler> other )
	{
		return !other.isNull() && (_listener == other->_listener) && (_member == other->_member) && (_type == other->_type);
	}

}

