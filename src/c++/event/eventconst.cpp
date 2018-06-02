#include "stable.h"

#include "eventconst.h"

namespace event{
	bool EventConst::m_debug = false;
	EventConst::log_call EventConst::m_logCall = NULL;
	bool EventConst::m_switched = false;

	void EventConst::clear()
	{

	}

	bool EventConst::getSwitched()
	{
		return m_switched;
	}

	void EventConst::setSwitched( bool enabled )
	{
		m_switched = enabled;
	}

	void EventConst::debug( const std::wstring& str, quint32 priority )
	{
		if(m_logCall) m_logCall(str, priority);
	}

	void EventConst::registerLogCallback( log_call call )
	{
		m_logCall = call;
	}

	bool EventConst::isDebug()
	{
		return m_debug;
	}

	void EventConst::setDebug( bool enabled )
	{
		m_debug = enabled;
	}
}

