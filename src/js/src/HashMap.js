/**
 * hash表
 * @type {[type]}
 * add by movinliao
 */
var Class = require('./Class');

var HashMap = Class.extend(function () {
  var length = 0;
  var keys = [];
  var contents = {};

  this.constructor = function () {
    length = 0;
    keys = [];
    contents = {};
  };

  this.size = function () {
    return length;
  };

  this.isEmpty = function () {
    return (length === 0);
  };

  this.keys = function () {
    return keys;
  };

  this.eachKey = function (func, asc) {
    if (!func) return;
    asc = (asc === undefined) ? true : asc;
    var list = asc ? keys : keys.reverse();
    list = list.slice();
    for (var i in list) {
      if (func(list[i])) break;
    }
  };

  this.eachValue = function (func, asc) {
    if (!func) return;
    asc = (asc === undefined) ? true : asc;
    var list = asc ? keys : keys.reverse();
    list = list.slice();
    for (var i in list) {
      var key = list[i];
      if (!contents[key]) continue;
      if (func(contents[key])) break;
    }
  };

  this.values = function () {
    var temp = new Array(length);
    var index = 0;
    var i;
    var key;

    for (i in keys) {
      key = keys[i];
      if (!contents[key]) continue;
      temp[index] = contents[key];
      index++;
    }
    return temp;
  };

  this.containValue = function (value) {
    for (var i in contents) {
      var data = contents[i];
      if (data === value) {
        return true;
      }
    }
    return false;
  };

  this.containKey = function (key) {
    return (key in contents);
  };

  this.containAllKey = function (keys) {
    for (var i in keys) {
      var key = keys[i];
      if (!this.containKey(key)) {
        return false;
      }
    }
    return true;
  };

  this.get = function (key) {
    if (key in contents) {
      return contents[key];
    }
    return null;
  };

  this.getValue = function (key) {
    return this.get(key);
  };

  this.put = function (key, value) {
    if (key === null) {
      return null;
    } else if (value === null) {
      return this.remove(key);
    }
    var index = keys.indexOf(key);
    if (index > -1) {
      keys.splice(index, 1);
    }

    if (!this.containKey(key)) {
      length++;
    }
    var oldValue = this.get(key);
    keys.push(key);
    contents[key] = value;

    return oldValue;
  };

  this.remove = function (key) {
    var index = keys.indexOf(key);
    if (index > -1) {
      keys.splice(index, 1);
    }

    if (!this.containKey(key)) {
      return null;
    }

    var temp = contents[key];
    delete contents[key];
    length--;

    return temp;
  };

  this.removeValue = function (value) {
    for (var key in contents) {
      if (contents[key] === value) {
        return this.remove(key);
      }
    }
    return null;
  };

  this.push = function (key, value) {
    this.put(key, value);
  };

  this.pop = function () {
    if (keys.length <= 0) {
      return null;
    }

    var key = keys.pop();

    if (!this.containKey(key)) {
      return null;
    }

    var temp = contents[key];
    delete contents[key];
    length--;

    return temp;
  };

  this.shift = function () {
    if (keys.length <= 0) {
      return null;
    }

    var key = keys.shift();
    if (!this.containKey(key)) {
      return null;
    }
    var temp = contents[key];
    delete contents[key];
    length--;

    return temp;
  };

  this.clear = function () {
    length = 0;
    keys = [];
    contents = {};
  };
});

module.exports = HashMap;
