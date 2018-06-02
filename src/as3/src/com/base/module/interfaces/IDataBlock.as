package com.base.module.interfaces
{
	import com.base.db.interfaces.IRow;

	/**
	 * 带数据段子块定义框架
	 * @author movinliao
	 * 
	 */
	public interface IDataBlock extends IBlock
	{
		/**
		 *获取区块的段数据 
		 * @return 
		 * 
		 */
		function get row(): IRow;
		/**
		 *执行某个操作 
		 * @param cmd
		 * @param params
		 * @return 
		 * 
		 */
		function excute(cmd: String, args: Array = null): *;
	}
}