package com.base.events
{
	public final class EventConst
	{
		private static var _logFunc: Function = null;
		private static var _debug: Boolean = false;
		
		//事件处理优先级
		public static const PRIORITY_LOW: uint = 0;    //低
		public static const PRIORITY_NORMAL: uint = 1; //中
		public static const PRIORITY_HIGH: uint = 2;   //高
		
		
		public function EventConst()
		{
		}
		
		//===========================事件总控=======================================
		/**
		 * 停止所有的回调 
		 * 
		 */
		public static function clear(): void
		{
			EventCenter.clearAll();
		}
		
		/**
		 *事件开关 读
		 * @return 
		 * 
		 */
		public static function get switched(): Boolean
		{
			return EventCenter.switched;
		}
		
		/**
		 * 事件开关写
		 * @param value
		 * 
		 */
		public static function set switched(value: Boolean): void
		{
			EventCenter.switched = value;
		}
		
		public static function log(...args): void
		{
			if(_logFunc != null) _logFunc.call(null, args); 
		}
		
		public static function setLogFunc(value: Function): void
		{
			_logFunc = value;
		}

		public static function get debug():Boolean
		{
			return _debug;
		}

		public static function set debug(value:Boolean):void
		{
			_debug = value;
		}
	}
}