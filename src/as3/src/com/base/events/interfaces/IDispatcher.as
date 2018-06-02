package com.base.events.interfaces
{
	import com.base.events.BaseEvent;

	public interface IDispatcher
	{
		/**
		 * 注册事件处理器 
		 * @param key 消息名,来自各模块定义EventList
		 * @param handler 对应的事件处理
		 * @priority 事件的处理优先级，整数值越大，处理的优先级越高
		 */	
		function addListener(key: String, listener: Function, priority:int = 0): void;
		/**
		 * 移除事件处理,
		 * 如果handler为空,可以考虑把所有监听去掉,暂时不实现
		 * @param key
		 */
		function removeListener(key: String, listener: Function, priority:int = 0):void;
		/**
		 * 分发事件 
		 * @event
		 * 
		 */		
		function dispatch(key: String, event: BaseEvent):void;
	}
}