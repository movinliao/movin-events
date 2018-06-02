/**
 * 数据库数据集模拟
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');

var Field = Class.extend(function () {
  var mTableId = 0;

  this.constructor = function (tableId) {
    mTableId = tableId;
  };

  this.tableId = function () {
    return mTableId;
  };
});

module.exports = Field;
