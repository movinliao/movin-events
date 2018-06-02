#pragma once

#define E_KEY(k) static std::wstring k;
#define E_KEY_IMPL(c, k) std::wstring c::k = L#c##L"::"##L#k;

namespace event{
	typedef QSharedPointer<QObject> ParamPtr;

	class BaseEvent: public QObject
	{
		Q_OBJECT;
	public:
		BaseEvent(const std::wstring& key, ParamPtr data);
		virtual ~BaseEvent(void);

		ParamPtr eventData;
		std::wstring key;
		
		E_KEY(kInfoChanged);
	};

	typedef QSharedPointer<BaseEvent> BaseEventPtr;
}
