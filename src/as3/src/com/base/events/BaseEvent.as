package com.base.events
{
	import flash.events.Event;
	
	/**
	 * 框架事件基类
	 * @author movinliao
	 * 
	 */
	public class BaseEvent extends Event
	{
		public var eventData: Object;
		public var sequence: Number = new Date().time;
		
		public function BaseEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
		}
		
		override public function clone():Event
		{
			var event: BaseEvent = new BaseEvent(type, bubbles, cancelable);
			event.eventData = eventData;
			
			return event;
		}
	}
}