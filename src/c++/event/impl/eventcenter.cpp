#include "stable.h"

#include "eventcenter.h"

namespace event{

	ModuleMap EventCenter::_modules = ModuleMap();
	bool EventCenter::_switched = false;

	EventCenter::EventCenter(QObject* parent)
		: QObject(parent)
	{

	}

	EventCenter::~EventCenter(void)
	{
		_modules.clear();
	}

	void EventCenter::addListener( const std::wstring& key, const std::wstring& subKey, QObject* listener, HandlerPtr handler, quint32 priority )
	{
		ModuleMap::iterator itr = _modules.find(key);
		if(itr == _modules.end())
		{
			_modules[key] = QSharedPointer<ModuleBody>(new ModuleBody(_switched));
		}
		QSharedPointer<ModuleBody>  body = _modules[key];
		body->add(subKey, listener, handler, priority);
	}

	void EventCenter::removeListener( const std::wstring& key, const std::wstring& subKey, QObject* listener, HandlerPtr handler, quint32 priority )
	{
		ModuleMap::iterator itr = _modules.find(key);
		if(itr == _modules.end())
		{
			return;
		}
		QSharedPointer<ModuleBody>  body = _modules[key];
		body->remove(subKey, listener, handler, priority);
	}

	void EventCenter::dispatch( const std::wstring& key, const std::wstring& subKey, BaseEventPtr evt )
	{
		ModuleMap::iterator itr = _modules.find(key);
		if(_switched || (itr == _modules.end()))
		{
			return;
		}
		QSharedPointer<ModuleBody>  body = _modules[key];
		body->exec(subKey, evt);
	}

	void EventCenter::setPause( const std::wstring& key, bool enabled )
	{
		ModuleMap::iterator itr = _modules.find(key);
		if(itr == _modules.end())
		{
			return;
		}
		QSharedPointer<ModuleBody>  body = _modules[key];

		body->setPaused(enabled);
	}

	void EventCenter::clear()
	{
		_modules.clear();
	}

	void EventCenter::clear( const std::wstring& key, const std::wstring& subKey, QObject* listener )
	{
		ModuleMap::iterator itr = _modules.find(key);
		if(itr == _modules.end())
		{
			return;
		}

		QSharedPointer<ModuleBody>  body = _modules[key];
		body->clear(subKey, listener);
	}

	void EventCenter::clear( const std::wstring& key )
	{
		ModuleMap::iterator itr = _modules.find(key);
		if(itr == _modules.end())
		{
			return;
		}

		QSharedPointer<ModuleBody>  body = _modules[key];
		body->clear();
	}

	bool EventCenter::getSwitched()
	{
		return _switched;
	}

	void EventCenter::setSwitched( bool enabled )
	{
		_switched = enabled;
	}
}
