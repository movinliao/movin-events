/**
 * 数据vo基类
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');

var Cloneable = Class.extend(function () {
  var self = this;
  var _empty = true;

  var toObject = function (value) {
    var result = value;
    try {
      result = JSON.parse(JSON.stringify(value));
    } catch (__) {
      result = value;
    }
    return result;
  };

  var _type = function (value) {
    return Object.prototype.toString.call(value).slice(8).slice(0, -1).toLowerCase();
  };

  var isArray = function (value) {
    return _type(value) === 'array';
  };

  var isObject = function (value) {
    return _type(value) === 'object';
  };

  var doClone = function (object) {
    var cls = object.class || Object;
    var result = new cls();
    var key;
    var current;
    var source = toObject(object);

    for (key in source) {
      current = object[key];
      if (current === null) {
        continue;
      }

      if (typeof current === 'function') {
        continue;
      }

      if (current instanceof Cloneable) {
        result[key] = current.clone();
      } else if (isObject(current)) {
        result[key] = toObject(current);
      } else {
        result[key] = current;
      }
    }

    return result;
  };

  var doCompare = function (object, dest) {
    var result = (object === dest);
    var source;
    var key;
    var current;
    var other;

    if (result) return true;

    source = toObject(object);
    for (key in source) {
      current = object[key];
      other = dest[key];

      if (typeof current === 'function') {
        continue;
      }

      if (!(key in dest) || (_type(current) !== _type(other))) {
        result = false;
        break;
      }

      if (current instanceof Cloneable) {
        result = current.same(other);
      } else {
        result = (current === other);
      }

      if (!result) break;
    }

    return result;
  };

  var doClear = function (object) {
    var cls = object.class || null;
    var newObj;
    var key;
    if (cls) {
      newObj = new cls();
    } else if (isArray(object)) {
      newObj = [];
    } else {
      newObj = {};
    }

    for (key in object) {
      if (object[key] === null) {
        continue;
      }

      if (typeof object[key] === 'function') {
        continue;
      }

      if (object[key] instanceof Cloneable) {
        object[key].clear();
      } else if (isArray(object[key])) {
        object[key] = [];
      } else if (isObject(object[key])) {
        object[key] = {};
      } else {
        object[key] = newObj[key];
      }
    }
  };

  this.empty = function () {
    return _empty;
  };

  this.setEmpty = function (value) {
    _empty = value;
  };

  this.clone = function () {
    return doClone(self);
  };
  this.same = function (dest) {
    return doCompare(self, dest);
  };
  this.clear = function () {
    doClear(self);
  };
});

module.exports = Cloneable;
