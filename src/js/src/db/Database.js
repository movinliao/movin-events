/**
 * 数据库模拟
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');
var HashMap = require('../HashMap');
var Table = require('./Table');
var Field = require('./Field');

var Database = Class.extend(function () {
  var mDbId = 0;
  var mTables = new HashMap();
  var mFields = new HashMap();

  this.constructor = function (id) {
    mDbId = id;
  };

  this.getDbId = function () {
    return mDbId;
  };

  this.getTable = function (tableId) {
    var table = mTables.get(tableId);
    if (table === null) {
      table = new Table(tableId);
      mTables.put(tableId, table);
    }
    return table;
  };

  this.deleteTable = function (tableId) {
    return mTables.remove(tableId);
  };

  this.getField = function (tableId) {
    var field = mFields.get(tableId);
    if (field === null) {
      field = new Field(tableId);
      mFields.put(tableId, field);
    }
    return field;
  };

  this.deleteField = function (tableId) {
    return mFields.remove(tableId);
  };

  this.clear = function () {
    mTables.clear();
    mFields.clear();
  };
});

module.exports = Database;
