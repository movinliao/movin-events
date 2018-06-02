package com.base.db.impl
{
	import com.base.db.interfaces.IRow;
	
	import flash.utils.ByteArray;
	
	import utils.struct.MYHashMap;

	public class RowImpl implements IRow
	{
		private var mInt32Val:MYHashMap = new MYHashMap();
		private var mInt8Val:MYHashMap = new MYHashMap();
		private var mBoolVal:MYHashMap = new MYHashMap();
		private var mStrVal:MYHashMap = new MYHashMap();
		private var mArrayVal:MYHashMap = new MYHashMap();
		private var mMapVal: MYHashMap = new MYHashMap();
		private var mValueVal: MYHashMap = new MYHashMap();
		private var valueChanged: Boolean = false;
		
		
		public function RowImpl()
		{
		}
		
		public function getInt32(fieldId:uint):uint
		{
			if(!mInt32Val.containsKey(fieldId))
			{
				return 0;
			}
			return mInt32Val.get(fieldId);
		}
		
		public function getBool(fieldId:uint):Boolean
		{
			if(!mBoolVal.containsKey(fieldId))
			{
				return false;
			}
			return mBoolVal.get(fieldId);
		}
		
		public function getByte(fieldId:uint):uint
		{
			if(!mInt8Val.containsKey(fieldId))
			{
				return 0;
			}
			return mInt8Val.get(fieldId);
		}
		
		public function getString(fieldId:uint):ByteArray
		{
			if(!mStrVal.containsKey(fieldId))
			{
				return new ByteArray;
			}
			return mStrVal.get(fieldId);
		}
		
		public function getArray(fieldId:uint):Array
		{
			if(!mArrayVal.containsKey(fieldId))
			{
				setArray(fieldId, new Array());
			}
			return mArrayVal.get(fieldId);
		}
		
		public function getValue(fieldId:uint):*
		{
			if(!mValueVal.containsKey(fieldId))
			{
				return null;
			}
			return mValueVal.get(fieldId);
		}
		
		public function getMap(fieldId:uint): MYHashMap
		{
			if(!mMapVal.containsKey(fieldId))
			{
				setMap(fieldId, new MYHashMap());
			}
			return mMapVal.get(fieldId);
		}
		
		public function getField(fieldType: uint, fieldId: uint): *
		{
			var value: * = null;
			switch(fieldType)
			{
				case FieldType.ARRAY: value = getArray(fieldId); break;
				case FieldType.DWORD: value = getInt32(fieldId); break;
				case FieldType.BOOL: value = getBool(fieldId); break;
				case FieldType.STRING: value = getString(fieldId); break;
				case FieldType.BYTE: value = getByte(fieldId); break;
				case FieldType.MAP: value = getMap(fieldId); break;
				default: value = getValue(fieldId); break;
			}
			return value;
		}
		
		public function hasProp(fieldId:uint):Boolean
		{
			return mInt32Val.containsKey(fieldId) || 
				mBoolVal.containsKey(fieldId) || 
				mInt8Val.containsKey(fieldId) || 
				mArrayVal.containsKey(fieldId)||
				mMapVal.containsKey(fieldId)|| 
				mValueVal.containsKey(fieldId)|| 
				mStrVal.containsKey(fieldId);
		}
		
		public function setInt32(fieldId:uint, val:uint):void
		{
			valueChanged = (mInt32Val.put(fieldId, val) == val) || valueChanged;
		}
		
		public function setBool(fieldId:uint, val:Boolean):void
		{
			valueChanged = (mBoolVal.put(fieldId, val) == val) || valueChanged;
		}
		
		public function setByte(fieldId:uint, val:uint):void
		{
			valueChanged = (mInt8Val.put(fieldId, val) == val) || valueChanged;
		}
		
		public function setString(fieldId:uint, val:ByteArray):void
		{
			valueChanged = (mStrVal.put(fieldId, val) == val) || valueChanged;
		}
		
		public function setArray(fieldId:uint, val:Array):void
		{
			valueChanged = (mArrayVal.put(fieldId, val) == val) || valueChanged;
		}
		
		public function setValue(fieldId:uint, val:*):void
		{
			valueChanged = (mValueVal.put(fieldId, val) == val) || valueChanged;
		}
		
		public function setMap(fieldId:uint, val: MYHashMap):void
		{
			valueChanged = (mMapVal.put(fieldId, val) == val) || valueChanged;
		}
		
		public function beginEdit():void
		{
			valueChanged = false;
		}
		
		public function endEdit():Boolean
		{
			return valueChanged;
		}
		
		public function toString():String
		{
			// TODO Auto Generated method stub
			return null;
		}
		
		public function clear():void
		{
			mInt32Val = new MYHashMap();
			mInt8Val = new MYHashMap();
			mBoolVal = new MYHashMap();
			mStrVal = new MYHashMap();
			mArrayVal = new MYHashMap();
			mValueVal = new MYHashMap();
			mMapVal = new MYHashMap();
			valueChanged = true;
		}
		
		public function dump():void
		{
			
		}
	}
}