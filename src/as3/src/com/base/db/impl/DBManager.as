package com.base.db.impl
{
	import com.base.db.interfaces.IDBManager;
	import com.base.db.interfaces.IDatabase;
	

	public class DBManager implements IDBManager
	{
		private static var mInstance:DBManager = null;
		private var mListDB:Array = new Array();
		
		public function DBManager()
		{
		}
		
		public function createDatabase(dbId:uint):IDatabase
		{
			var db:IDatabase = new DatabaseImpl(dbId);
			mListDB.push(db);
			return db;
		}
		
		public function openDatabase(dbId:uint):IDatabase
		{
			var length:uint = mListDB.length;
			for(var i:uint = 0; i < length; i++)
			{
				var db:IDatabase = mListDB[i];
				if(db.getDBId() == dbId)
					return db;
			}
			return null;
		}

		public function dropDatabase(dbId:uint):void
		{
			var length:uint = mListDB.length;
			for(var i:uint = 0; i < length; i++)
			{
				var db:IDatabase = mListDB[i];
				if(db.getDBId() == dbId)
				{
					mListDB.splice(i, 1);
					return;
				}
			}
		}
	}
}