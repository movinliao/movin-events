#pragma once

#include "common/event/impl/eventbody.h"

#include <list>
#include <map>

namespace event{
	class BaseEvent;
	class Handler;

	typedef std::list<QSharedPointer<EventBody> > EventList;
	typedef std::map<std::wstring, EventList*> EventMap;

	class ModuleBody: public QObject
	{
		Q_OBJECT;
	public:
		explicit ModuleBody(bool paused);
		virtual ~ModuleBody(void);

		void exec(const std::wstring& key, BaseEventPtr evt);
		void add(const std::wstring& key, QObject* listener, HandlerPtr handler, quint32 pri);
		void remove(const std::wstring& key, QObject* listener, HandlerPtr handler, quint32 pri);
		void clear(const std::wstring& key, QObject* listener);
		void clear(const std::wstring& key);
		void clear();
		void setPaused(bool paused);

	private:
		void execItems(EventList* list, BaseEventPtr evt);
		bool contain(EventList* list, QObject* lis, HandlerPtr han, quint32 pri);
		
	private:
		bool _paused;
		EventMap _events;
	};
}
