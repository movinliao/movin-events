package com.base.events
{
	import utils.Singleton;
	import utils.struct.MYHashMap;
	
	/**
	 * 事件分发总类
	 * @author movinliao
	 * 
	 */
	internal class EventCenter extends Singleton
	{
		private static var _moduleMap: MYHashMap = new MYHashMap();
		private static var _switched: Boolean = true;
		
		public function EventCenter()
		{
			super(null);
		}
		
		/**
		 * 加入事件 
		 * @param key      模块标志
		 * @param subKey   事件标志
		 * @param listener 事件属主
		 * @param handler  事件执行体
		 * @param priority 事件处理优先级
		 * 
		 */
		public static function addListener(key:String, subKey: String, 
			listener: *, handler:Function, priority:int  = EventConst.PRIORITY_NORMAL):void
		{
			if(!_moduleMap.containsKey(key))
				_moduleMap.put(key, new ModuleBody(!_switched));
			
			var module: ModuleBody = _moduleMap.getValue(key);
			
			module.add(subKey, listener, handler, priority);
			
			EventConst.log("Listener add: key=" + key 
				+ ", subKey=" + subKey 
				+ ", listener=" + listener 
				+ ", handler=" + handler 
				+ ", priority=" + priority);
		}
				
		/**
		 * 移除事件
		 * @param key      模块标志
		 * @param subKey   事件标志
		 * @param listener 事件属主
		 * @param handler  事件执行体
		 * @param priority 事件处理优先级
		 * 
		 */
		public static function removeListener(key:String, subKey: String, 
			listener: *, handler:Function, priority:int = EventConst.PRIORITY_NORMAL):void
		{
			if(!_moduleMap.containsKey(key))
				return;
			
			var module: ModuleBody = _moduleMap.getValue(key);
			module.remove(subKey, listener, handler, priority);
			
			EventConst.log("Listener remove: key=" + key 
				+ ", subKey=" + subKey 
				+ ", listener=" + listener 
				+ ", handler=" + handler 
				+ ", priority=" + priority);
		}
		
		/**
		 *分发一个事件 
		 * @param key     模块标志
		 * @param subKey  事件标志
		 * @param args    事件分发参数
		 * 
		 */
		public static function dispatch(key:String, subKey: String, ...args):void
		{
			if(!_switched || !_moduleMap.containsKey(key))
				return;
			var module: ModuleBody = _moduleMap.getValue(key);
			
			module.exec(subKey, args);
			
			EventConst.log("Event dispatch: key=" + key 
				+ ", subKey=" + subKey); 
		}
		
		/**
		 *  暂停激活或者暂停某个组 
		 * @param key    模块标志
		 * @param value  true 为暂停 false 为激活
		 * 
		 */
		public static function pause(key:String, value: Boolean): void
		{
			if(!_moduleMap.containsKey(key))
				return;
			
			var module: ModuleBody = _moduleMap.getValue(key);
			module.paused = value;
			
			EventConst.log("Event pause: key=" + key 
				+ ", value=" + value ); 
		}
		
		/**
		 * 停止所有的回调 
		 * 
		 */
		public static function clearAll(): void
		{
			_moduleMap.clear();
			
			EventConst.log("Event clearAll" );
		}
		
		/**
		 *停止指定的回调 
		 * @param key
		 * @param listener
		 * 
		 */
		public static function clear(key:String, listener: Object): void
		{
			if(!_moduleMap.containsKey(key))
				return;
			var module: ModuleBody = _moduleMap.getValue(key);
			module.clear(key, listener);
			
			EventConst.log("Event clear: key=" + key 
				+ ", listener=" + listener ); 
		}
		
		/**
		 *事件开关 读
		 * @return 
		 * 
		 */
		public static function get switched(): Boolean
		{
			return _switched;
		}
		
		/**
		 * 事件开关写
		 * @param value
		 * 
		 */
		public static function set switched(value: Boolean): void
		{
			_switched = value;
			
			EventConst.log("Event switched: value=" + value); 
		}
	}
}


import com.base.events.EventConst;

import utils.struct.MYHashMap;

internal final class EventBody
{
	private static var _handers: MYHashMap = new MYHashMap();
	
	public var priority: int = EventConst.PRIORITY_NORMAL;
	
	public function EventBody(listener_: *, handler_: Function, priority_: int)
	{
		priority = priority_;
		_handers.put(this, {listener: listener_, handler: handler_});
	}
	
	public function get body(): Object
	{
		return _handers.get(this);
	}
	
	public function destroy(): void
	{
		_handers.remove(this);
	}
	
	public function same(listener: *, handler:Function, priority_:int): Boolean
	{
		var info: Object = body;
		
		return (info && (info.listener == listener) 
			&& (info.handler == handler) && (priority == priority_));
	}
	
	public function exec(args: Array): *
	{
		var item: Object = body;
		if(!item) return;
		var handler: * = item.handler;
		var listener: * =  item.listener;
		if(handler && listener)
		{
			try
			{
				handler.apply(listener, args);
			}
			catch(error:Error)
			{
				if(EventConst.debug) throw(error);
			}
		}
	}
}

internal final class ModuleBody
{
	private var _paused: Boolean = false;
	private var _events: MYHashMap = new MYHashMap();
	
	public function ModuleBody(paused: Boolean)
	{
		_paused = paused;
	}
	
	public function exec(key: String, args: Array): void
	{
		if(_paused || !_events.containsKey(key)) 
			return;
		var list: Array = _events.getValue(key) || [];
		
		execItems(list.slice(), args);
	}
	
	public function add(key: String, listener: *, handler:Function, priority:int): void
	{
		if(!_events.containsKey(key))
			_events.put(key, []);
		
		var list: Array = _events.getValue(key);
		if(indexOf(list, listener, handler, priority) == -1)
		{
			list.push(new EventBody(listener, handler, priority));
			list.sortOn("priority", Array.DESCENDING | Array.NUMERIC);
		}
	}
	
	public function remove(key: String, listener: *, handler:Function, priority:int): void
	{
		if(!_events.containsKey(key)) 
			return;
		
		var list: Array = _events.getValue(key);
		do
		{
			var index: int = indexOf(list, listener, handler, priority);
			if(index > -1)
			{
				var item: EventBody = list[index];
				list.splice(index , 1);
				if(item && item.body)
				{
					item.destroy();
					item = null;
				}
			}
		}while(index > -1);
	}
	
	public function clear(key: String, listener: *): void
	{
		if(!_events.containsKey(key)) 
			return;
		
		var list: Array = _events.getValue(key);
		for each(var item: EventBody in list)
		{
			var body: Object = item.body;
			if(body && (body.listener == listener))
			{
				var index:int = list.indexOf(item);
				if(index != -1)
				{
					var evb: EventBody = list[index];
					list.splice(index , 1);
					if(evb && evb.body)
					{
						evb.destroy();
						evb = null;
					}
				}
			}
		}
	}
	
	public function set paused(value: Boolean): void
	{
		_paused = value;
	}
	
	private function execItems(list: Array, args: Array): void
	{
		for each(var item: EventBody in list)
		{
			item.exec(args);
		}
	}
	
	private function indexOf(list: Array, listener: *, handler:Function, priority:int): int
	{
		var index: int = -1;
		for(var i:int = 0; i < list.length; ++i)
		{
			var item: EventBody = list[i];
			if(item && item.same(listener, handler, priority))
			{
				index = i;
				break;
			}
		}
		return index;
	}
}