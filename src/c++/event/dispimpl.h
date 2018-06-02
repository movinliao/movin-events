#pragma once

#include "common/event/baseevent.h"

namespace event{
	class DisImpl: public QObject
	{
		Q_OBJECT;
	public:
		explicit DisImpl(QObject* parent = NULL);
		virtual ~DisImpl(void);

		virtual void addListener(const std::wstring& key, const char * member, quint32 priority = 0);
		virtual void removeListener(const std::wstring& key, const char * member, quint32 priority = 0);
		virtual void dispatch(const std::wstring& key, BaseEventPtr evt);
		
		virtual void doEvent(const std::wstring& key, ParamPtr param = ParamPtr());
		virtual void on(const std::wstring& key, const char * member, quint32 priority = 0);
		virtual void off(const std::wstring& key, const char * member, quint32 priority = 0);
		virtual void clear();
	private:
		std::wstring _baseKey;
	};
}

#define  E_MEMBER(m) #m 