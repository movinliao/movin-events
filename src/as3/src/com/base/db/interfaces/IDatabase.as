package com.base.db.interfaces
{
	public interface IDatabase
	{
		function getDBId():uint;
		function getTable(tableId:uint):ITable;
		function deleteTable(tableId:uint):void;
		function getFieldSet(tableId:uint):IFieldSet;
		function deleteFieldSet(tableId:uint):void;
		function clear(): void;
	}
}