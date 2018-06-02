#pragma once

#include "common/event/baseevent.h"
#include "common/event/handler.h"

namespace event{

	struct  BodyInfo: public QObject
	{
		explicit BodyInfo(QObject* lis, HandlerPtr han)
			:QObject(NULL), handler(han), listener(lis)
		{}
		virtual ~BodyInfo() 
		{
			listener = NULL;
		}
		HandlerPtr handler;
		QObject* listener;
	};

	class EventBody: public QObject
	{
		Q_OBJECT;
	public:
		explicit EventBody(QObject* lis, HandlerPtr han, quint32 pri);
		virtual ~EventBody();

		QWeakPointer<BodyInfo> getBody();
		bool same(QObject* lis, HandlerPtr han, quint32 pri);
		bool same(QObject* lis);
		void exec(BaseEventPtr evt);

		quint32 priority() const;

		static void clear();
	private:
		quint32 _bodyKey;
		quint32 _priority;
	};
}
