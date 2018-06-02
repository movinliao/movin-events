package com.base.db.impl
{
	import com.base.db.interfaces.IFieldSet;
	

	public class FieldSetImpl extends RowImpl implements IFieldSet
	{
		private var mTableId:uint = 0;
		
		public function FieldSetImpl(tableId:uint)
		{
			mTableId = tableId;
		}
	}
}