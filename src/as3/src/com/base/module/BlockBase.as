package com.base.module
{
	import com.base.events.DispImpl;
	import com.base.module.interfaces.IBlock;
	import com.base.module.interfaces.IModule;
	
	/**
	 * 子块模型基类
	 * @author movinliao
	 * 
	 */
	public class BlockBase extends DispImpl implements IBlock
	{
		protected var _module: IModule = null;
		protected var _stoped: Boolean = false;
		
		public function BlockBase(key:String)
		{
			super(key);
		}
		
		public function init(module: IModule):void
		{
			_module = module;
		}
		
		public function destroy():void
		{
			super.clear();
			_module = null;
		}
		
		public function start():void
		{
			_stoped = false;
			super.paused = false;
		}
		
		public function stop():void
		{
			_stoped = true;
			super.paused = true;
		}
		///////////////////////////////////////////////////
		protected function log(context:String, priority:*=0):void
		{
			if(_module) _module.log(context, priority);
		}
	}
}