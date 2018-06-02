#include "stable.h"

#include "eventbody.h"
#include <map>

namespace event{
	static std::map<quint32, QSharedPointer<BodyInfo>> _handers;
	static quint32 _baseKey = 0;

	EventBody::EventBody(QObject* lis, HandlerPtr han, quint32 pri)
		: QObject(NULL)
		, _bodyKey(++_baseKey)
		, _priority(pri)
	{
		_handers[_bodyKey] = QSharedPointer<BodyInfo>(new BodyInfo(lis, han));
	}

	EventBody::~EventBody()
	{
		std::map<quint32, QSharedPointer<BodyInfo>>::iterator itr = _handers.find(_bodyKey);
		if(itr != _handers.end()) _handers.erase(itr);
	}

	QWeakPointer<BodyInfo> EventBody::getBody()
	{
		std::map<quint32, QSharedPointer<BodyInfo>>::iterator itr = _handers.find(_bodyKey);
		return (itr != _handers.end()) ? itr->second : QWeakPointer<BodyInfo>();
	}

	bool EventBody::same( QObject* lis, HandlerPtr han, quint32 pri )
	{
		QSharedPointer<BodyInfo> info = getBody();
		return !info.isNull() && info->handler->same(han) && (info->listener == lis) && (_priority == pri);
	}

	bool EventBody::same( QObject* lis )
	{
		QSharedPointer<BodyInfo> info = getBody();
		return !info.isNull() &&(info->listener == lis);
	}

	void EventBody::exec( BaseEventPtr evt )
	{
		QSharedPointer<BodyInfo> info = getBody();
		if(!info.isNull())
		{
			HandlerPtr handler = info->handler;
			// QObject* listener = info.listener;

			 if(!handler.isNull()) handler->apply(evt);
		}
	}

	void EventBody::clear()
	{
		_handers.clear();
	}

	quint32 EventBody::priority() const
	{
		return _priority;
	}
}


