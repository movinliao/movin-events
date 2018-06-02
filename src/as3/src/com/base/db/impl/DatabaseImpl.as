package com.base.db.impl
{
	import com.base.db.interfaces.IDatabase;
	import com.base.db.interfaces.IFieldSet;
	import com.base.db.interfaces.ITable;
	import utils.struct.MYHashMap;
	

	public class DatabaseImpl implements IDatabase
	{
		private var mDbId:uint = 0;
		private var mTables:MYHashMap = new MYHashMap();
		private var mFieldSet:MYHashMap = new MYHashMap();
		
		public function DatabaseImpl(id:uint)
		{
			mDbId = id;
		}
		
		public function getDBId():uint
		{
			return mDbId;
		}
		
		public function getTable(tableId:uint):ITable
		{
			var table:ITable = mTables.get(tableId);
			if(table == null)
			{
				table = new TableImpl(tableId);
				mTables.put(tableId, table);
			}
			return table;
		}
		
		public function deleteTable(tableId:uint):void
		{
			mTables.remove(tableId);
		}
		
		public function getFieldSet(tableId:uint):IFieldSet
		{
			var fieldset:IFieldSet = mFieldSet.get(tableId);
			if(fieldset == null)
			{
				fieldset = new FieldSetImpl(tableId);
				mFieldSet.put(tableId, fieldset);
			}
			return fieldset;
		}
		
		public function deleteFieldSet(tableId:uint):void
		{
			mFieldSet.remove(tableId);
		}
		
		public function clear():void
		{
			mTables.clear();
			mFieldSet.clear();
		}
	}
}