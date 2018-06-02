#pragma once

#include "common/event/impl/modulebody.h"
#include "common/event/handler.h"
#include "common/event/baseevent.h"

#include <map>

namespace event{
	class ModuleBody;

	typedef std::map<std::wstring, QSharedPointer<ModuleBody>> ModuleMap;

	class EventCenter: public QObject
	{
		Q_OBJECT;
	public:
		explicit EventCenter(QObject* parent = NULL);
		virtual ~EventCenter(void);

		static void addListener(const std::wstring& key, const std::wstring& subKey, QObject* listener, HandlerPtr handler, quint32 priority = 0);
		static void removeListener(const std::wstring& key, const std::wstring& subKey, QObject* listener, HandlerPtr handler, quint32 priority = 0);
		static void dispatch(const std::wstring& key, const std::wstring& subKey, BaseEventPtr evt);
		static void setPause(const std::wstring& key, bool enabled);
		static void clear();
		static void clear(const std::wstring& key, const std::wstring& subKey, QObject* listener);
		static void clear(const std::wstring& key);
		static bool getSwitched();
		static  void setSwitched(bool enabled);
	private:
		static ModuleMap _modules;
		static bool _switched;
	};
}
