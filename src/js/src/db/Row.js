/**
 * 数据库行模拟
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');
var HashMap = require('../HashMap');
var FieldType = require('./FieldType');

var Row = Class.extend(function () {
  var mInt32Val = new HashMap();
  var mInt8Val = new HashMap();
  var mBoolVal = new HashMap();
  var mStrVal = new HashMap();
  var mArrayVal = new HashMap();
  var mMapVal = new HashMap();
  var mValueVal = new HashMap();
  var valueChanged = false;

  this.constructor = function () {
  };

  this.getInt32 = function (fieldId) {
    if (!mInt32Val.containKey(fieldId)) {
      return 0;
    }
    return mInt32Val.get(fieldId);
  };

  this.getBool = function (fieldId) {
    if (!mBoolVal.containKey(fieldId)) {
      return false;
    }
    return mBoolVal.get(fieldId);
  };

  this.getByte = function (fieldId) {
    if (!mInt8Val.containKey(fieldId)) {
      return 0;
    }
    return mInt8Val.get(fieldId);
  };

  this.getString = function (fieldId) {
    if (!mStrVal.containKey(fieldId)) {
      return '';
    }
    return mStrVal.get(fieldId);
  };

  this.getArray = function (fieldId) {
    if (!mArrayVal.containKey(fieldId)) {
      this.setArray(fieldId, []);
    }
    return mArrayVal.get(fieldId);
  };

  this.getValue = function (fieldId) {
    if (!mValueVal.containKey(fieldId)) {
      return null;
    }
    return mValueVal.get(fieldId);
  };

  this.getMap = function (fieldId) {
    if (!mMapVal.containKey(fieldId)) {
      this.setMap(fieldId, new HashMap());
    }
    return mMapVal.get(fieldId);
  };

  this.getField = function (fieldType, fieldId) {
    var value = null;
    switch (fieldType) {
      case FieldType.ARRAY: value = this.getArray(fieldId); break;
      case FieldType.DWORD: value = this.getInt32(fieldId); break;
      case FieldType.BOOL: value = this.getBool(fieldId); break;
      case FieldType.STRING: value = this.getString(fieldId); break;
      case FieldType.BYTE: value = this.getByte(fieldId); break;
      case FieldType.MAP: value = this.getMap(fieldId); break;
      default: value = this.getValue(fieldId); break;
    }
    return value;
  };

  this.hasProp = function (fieldId) {
    return mInt32Val.containKey(fieldId) ||
      mBoolVal.containKey(fieldId) ||
      mInt8Val.containKey(fieldId) ||
      mArrayVal.containKey(fieldId) ||
      mMapVal.containKey(fieldId) ||
      mValueVal.containKey(fieldId) ||
      mStrVal.containKey(fieldId);
  };

  this.setInt32 = function (fieldId, val) {
    valueChanged = (mInt32Val.put(fieldId, val) === val) || valueChanged;
  };

  this.setBool = function (fieldId, val) {
    valueChanged = (mBoolVal.put(fieldId, val) === val) || valueChanged;
  };

  this.setByte = function (fieldId, val) {
    valueChanged = (mInt8Val.put(fieldId, val) === val) || valueChanged;
  };

  this.setString = function (fieldId, val) {
    valueChanged = (mStrVal.put(fieldId, val) === val) || valueChanged;
  };

  this.setArray = function (fieldId, val) {
    valueChanged = (mArrayVal.put(fieldId, val) === val) || valueChanged;
  };

  this.setValue = function (fieldId, val) {
    valueChanged = (mValueVal.put(fieldId, val) === val) || valueChanged;
  };

  this.setMap = function (fieldId, val) {
    valueChanged = (mMapVal.put(fieldId, val) === val) || valueChanged;
  };

  this.beginEdit = function () {
    valueChanged = false;
  };

  this.endEdit = function () {
    return valueChanged;
  };

  this.toString = function () {
    // TODO Auto Generated method stub
    return null;
  };

  this.clear = function () {
    mInt32Val = new HashMap();
    mInt8Val = new HashMap();
    mBoolVal = new HashMap();
    mStrVal = new HashMap();
    mArrayVal = new HashMap();
    mValueVal = new HashMap();
    mMapVal = new HashMap();
    valueChanged = true;
  };

  this.dump = function () {
  };
});

module.exports = Row;
