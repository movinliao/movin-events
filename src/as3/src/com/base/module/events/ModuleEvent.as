package com.base.module.events
{
	import com.base.events.BaseEvent;
	
	/**
	 * 模块事件定义
	 * @author movinliao
	 * 
	 */
	public class ModuleEvent extends BaseEvent
	{
		/**
		 *日志 
		 */
		public static const LOG: String = "ModuleEvent.LOG";
		/**
		 *模块初始化 
		 */
		public static const INIT: String = "ModuleEvent.INIT";
		/**
		 *模块销毁
		 */
		public static const DESTROY: String = "ModuleEvent.DESTROY";
		/**
		 *模块开始 
		 */
		public static const START: String = "ModuleEvent.START";
		/**
		 *模块停止 
		 */
		public static const STOP: String = "ModuleEvent.STOP";
		/**
		 *块加入 
		 */
		public static const ADD: String = "ModuleEvent.ADD";
		/**
		 *块移除 
		 */
		public static const REMOVE: String = "ModuleEvent.REMOVE";
		
		public var priority: *;
		
		public function ModuleEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
		}
	}
}