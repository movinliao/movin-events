package com.base.events
{
	import com.base.events.interfaces.IDispatcher;

	/**
	 * 事件分发模型基类
	 * @author movinliao
	 * 
	 */
	public class DispImpl implements IDispatcher
	{
		private var _key: String = "";
		
		public function DispImpl(key: String)
		{
			_key = key;
		}
		
		public function addListener(key: String, listener:Function, priority:int=0):void
		{
			EventCenter.addListener(_key, key, this, listener, priority);
		}
		
		public function removeListener(key: String, listener:Function, priority:int=0):void
		{
			EventCenter.removeListener(_key, key, this, listener, priority);
		}
		
		public function dispatch(key: String, event:BaseEvent):void
		{
			EventCenter.dispatch(_key, key, event);
		}

		protected function doEvent(key: String, param: Object = null): void
		{
			var event: BaseEvent = new BaseEvent(key);
			event.eventData = param;
			dispatch(key, event);
		}
		
		protected function clear():void
		{
			EventCenter.clear(_key, this);
		}
		
		protected function set paused(value: Boolean): void
		{
			EventCenter.pause(_key, value);
		}
	}
}