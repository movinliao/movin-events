/**
 * 事件执行体
 * @type {[type]}
 * add by movinliao
 */
var Class = require('../Class');

var ID = 0;
var Handler = Class.extend(function () {
  var _callback = null;
  var _listener = null;
  var _key = 0;
  var _gid = 0;

  this.constructor = function (listener, callback, key) {
    _listener = listener;
    _callback = callback;
    _gid = ++ID;
    _key = key || _gid;
  };

  this.call = function () {
    _callback && _callback.call(arguments);
  };

  this.apply = function (listener, args) {
    _callback && _callback.apply(_listener || listener, args);
  };

  this.same = function (handler) {
    return (handler instanceof Handler) &&
      (_listener === handler.listener()) &&
      (_key === handler.key()) &&
      (_callback === handler.callback());
  };

  this.callback = function () {
    return _callback;
  };

  this.listener = function () {
    return _listener;
  };

  this.key = function () {
    return _key;
  };

  this.keyId = function () {
    return _gid;
  };
});

module.exports = Handler;
