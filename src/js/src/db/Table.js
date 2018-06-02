/**
 * 数据表模拟
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');
var HashMap = require('../HashMap');
var Row = require('./Row');

var Table = Class.extend(function () {
  var mTableId = 0;
  var mRows = new HashMap();

  this.constructor = function (tableId) {
    mTableId = tableId;
  };

  this.getTableId = function () {
    return mTableId;
  };

  this.getRow = function (rowId) {
    return mRows.get(rowId);
  };

  this.getAllRows = function () {
    return mRows;
  };

  this.hasRow = function (rowId) {
    return mRows.containKey(rowId);
  };

  this.insertRow = function (rowId) {
    var row;

    if (this.hasRow(rowId)) {
      return this.getRow(rowId);
    }

    row = new Row();
    mRows.put(rowId, row);

    return row;
  };

  this.removeRow = function (rowId) {
    mRows.remove(rowId);
  };

  this.clear = function () {
    mRows = new HashMap();
  };
});

module.exports = Table;
