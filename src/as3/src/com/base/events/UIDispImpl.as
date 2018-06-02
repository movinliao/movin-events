package com.base.events
{
	import com.base.events.interfaces.IDispatcher;
	
	import flash.display.Sprite;
	
	public class UIDispImpl extends Sprite implements IDispatcher
	{
		private var _key: String = "";
		private var _parent: Sprite = null;
		
		public function UIDispImpl(key: String, parent: Sprite = null)
		{
			_key = key;
			_parent = parent;
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