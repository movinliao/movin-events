#include "stable.h"

#include "baseevent.h"

namespace event{
	E_KEY_IMPL(BaseEvent, kInfoChanged);

	BaseEvent::BaseEvent(const std::wstring& key, ParamPtr data)
		: QObject(NULL)
		, eventData(data)
		, key(key)
	{
	}

	BaseEvent::~BaseEvent(void)
	{
	}
}

