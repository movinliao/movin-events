#include "stable.h"

#include "modulebody.h"

#include "common/event/handler.h"
#include "common/event/baseevent.h"

namespace event{
	ModuleBody::ModuleBody(bool paused)
		: QObject(NULL)
		, _paused(paused)
	{

	}

	ModuleBody::~ModuleBody(void)
	{
		clear();
	}

	void ModuleBody::execItems( EventList* list, BaseEventPtr evt )
	{
		EventList::const_iterator itr = list->begin();
		for (; itr != list->end(); ++itr)
		{
			QSharedPointer<EventBody> item = *itr;
			if(!item.isNull()) item->exec(evt);
		}
	}

	void ModuleBody::exec( const std::wstring& key, BaseEventPtr evt )
	{
		EventMap::const_iterator itr = _events.find(key);
		if(_paused || itr == _events.end())
		{
			_events[key] = new EventList(); 
		}

		EventList* list = _events[key];

		execItems(list, evt);
	}

	void ModuleBody::add( const std::wstring& key, QObject* listener, HandlerPtr handler, quint32 pri )
	{
		EventMap::const_iterator itr = _events.find(key);
		if(itr == _events.end())
		{
			_events[key] = new EventList(); 
		}

		EventList* list = _events[key];
		if(!contain(list, listener, handler, pri))
		{
			list->push_back(QSharedPointer<EventBody>(new EventBody(listener, handler, pri)));
		}
	}

	void ModuleBody::remove( const std::wstring& key, QObject* listener, HandlerPtr handler, quint32 pri )
	{
		EventMap::const_iterator itr = _events.find(key);
		if(itr == _events.end())
		{
			return;
		}
		EventList* list = _events[key];

		EventList::iterator eitr = list->begin();
		while(eitr != list->end())
		{
			QSharedPointer<EventBody> item = *eitr;
			if(!item.isNull() && item->same(listener, handler, pri))
			{
				eitr = list->erase(eitr);
				continue;
			}
			++eitr;
		}
	}

	void ModuleBody::clear( const std::wstring& key, QObject* listener )
	{
		EventMap::const_iterator itr = _events.find(key);
		if(itr == _events.end())
		{
			return;
		}
		EventList* list = _events[key];
		EventList::iterator litr = list->begin();
		while(litr != list->end())
		{
			QSharedPointer<EventBody> event = *litr;
			if(!event.isNull() && event->same(listener))
			{
				litr = list->erase(litr);
				continue;
			}
			++litr;
		}
	}

	void ModuleBody::setPaused( bool paused )
	{
		_paused = paused;
	}

	void ModuleBody::clear()
	{
		EventMap::iterator itr = _events.begin();
		for (; itr != _events.end(); ++itr)
		{
			EventList* list = itr->second;
			if(list) 
			{
				list->clear();
				delete list;
			}
		}
		_events.clear();
	}

	void ModuleBody::clear( const std::wstring& key )
	{
		EventMap::const_iterator itr = _events.find(key);
		if(itr == _events.end())
		{
			return;
		}
		EventList* list = _events[key];
		list->clear();
	}

	bool ModuleBody::contain( EventList* list, QObject* lis, HandlerPtr han, quint32 pri )
	{
		EventList::iterator itr = list->begin();
		for (; itr != list->end(); ++itr)
		{
			QSharedPointer<EventBody> item = *itr;
			if(!item.isNull() && item->same(lis, han, pri))
			{
				return true;
			}
		}
		return false;
	}

}

