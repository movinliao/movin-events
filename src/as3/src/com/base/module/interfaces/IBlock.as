package com.base.module.interfaces
{
	import com.base.events.interfaces.IDispatcher;
	
	/**
	 * 子块定义框架
	 * @author movinliao
	 * 
	 */
	public interface IBlock extends IDispatcher
	{
		/**
		 * 模块初始化
		 * @param api
		 * 
		 */
		function init(module: IModule): void;
		/**
		 *模块销毁 
		 * 
		 */
		function destroy(): void;
		/**
		 *停止 
		 * 
		 */
		function stop(): void;
		/**
		 *开始 
		 * 
		 */
		function start(): void;
	}
}