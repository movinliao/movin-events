package com.base.db.interfaces
{
	public interface IDBManager
	{
		function createDatabase(dbId:uint):IDatabase;
		function openDatabase(dbId:uint):IDatabase;
		function dropDatabase(dbId:uint):void;
	}
}