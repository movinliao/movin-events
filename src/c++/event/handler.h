#pragma once

#include "common/event/baseevent.h"

namespace event{

	class Handler: public QObject
	{
		Q_OBJECT;
	public:
		explicit Handler(QObject* lis, const char * mem, Qt::ConnectionType type = Qt::AutoConnection);
		virtual ~Handler(void);
		
		void apply(BaseEventPtr evt);
		bool operator==(const Handler* other);
		bool operator==(QSharedPointer<Handler> other);
		bool same(QSharedPointer<Handler> other);
	private:
		std::string _member;
		QObject* _listener;
		Qt::ConnectionType _type;
	};

	typedef QSharedPointer<Handler> HandlerPtr;
}
