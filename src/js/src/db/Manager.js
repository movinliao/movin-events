/**
 * 数据库管理模拟
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');
var Database = require('./Database');

var Manager = Class.extend(function () {
  var mListDB = [];

  this.constructor = function () {
  };

  this.createDatabase = function (dbId) {
    var db = new Database(dbId);
    mListDB.push(db);
    return db;
  };

  this.openDatabase = function (dbId) {
    var i;
    var db;
    for (i = 0; i < mListDB.length; i++) {
      db = mListDB[i];
      if (db.getDBId() === dbId) {
        return db;
      }
    }
    return null;
  };

  this.dropDatabase = function (dbId) {
    var i;
    var db;
    for (i = 0; i < mListDB.length; i++) {
      db = mListDB[i];
      if (db.getDBId() === dbId) {
        mListDB.splice(i, 1);
        return;
      }
    }
  };
});

module.exports = Manager;
