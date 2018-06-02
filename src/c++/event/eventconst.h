#pragma once

namespace event{
	class EventConst
	{
	public:
		typedef  void (* log_call)(const std::wstring& str, int priority); 

		enum{LOW = 0, NORMAL, HIGH};

		static void clear();

		static bool getSwitched();
		static void setSwitched(bool enabled);

		static void debug(const std::wstring& str, quint32 priority);
		static void registerLogCallback(log_call call);

		static bool isDebug();
		static void setDebug(bool enabled);

	private:
		static bool m_debug;
		static log_call m_logCall;
		static bool m_switched;
	};
}
