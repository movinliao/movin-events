/**
 * 事件分发基类
 * @type {[type]}
 * add by movinliao
 */
var IDispatcher = require('./IDispatcher');
var EventCenter = require('./EventCenter');
var BaseEvent = require('../base/BaseEvent');
var Handler = require('./Handler');

var DispKey = 0;

var DispImpl = IDispatcher.extend(function () {
  var self = this;
  var basekey = '';

  this.constructor = function (key) {
    ++DispKey;
    basekey = DispKey + '.' + key;
  };

  this.addListener = function (key, handler, priority) {
    EventCenter.addListener(basekey, key, self, new Handler(null, handler, self), priority);
  };

  this.removeListener = function (key, handler, priority) {
    EventCenter.removeListener(basekey, key, self, new Handler(null, handler, self), priority);
  };

  this.dispatch = function (key, event) {
    EventCenter.dispatch(basekey, key, event);
  };

  this.doEvent = function (key, param) {
    var event = new BaseEvent(key);
    event.eventData = param;

    self.dispatch(key, event);
  };

  this.clear = function () {
    EventCenter.clear(basekey, self);
  };

  this.setPaused = function (enabled) {
    EventCenter.setPause(basekey, enabled);
  };

  this.on = function (key, listener, handler, priority) {
    EventCenter.addListener(basekey, key, self,
      new Handler(listener, handler, listener), priority);
  };

  this.off = function (key, listener, handler, priority) {
    EventCenter.removeListener(basekey, key, self,
      new Handler(listener, handler, listener), priority);
  };
});

module.exports = DispImpl;
