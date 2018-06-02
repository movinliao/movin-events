/**
 * 事件常量定义
 * @type {[type]}
 * add by movinliao
 */
var EventCenter = require('./EventCenter');

var logFunc = null;
var debug = false;

module.exports = {
  // 低
  PRIORITY_LOW: 0,
  // 中
  PRIORITY_NORMAL: 1,
  // 高
  PRIORITY_HIGH: 2,

  clear: function () {
    EventCenter.clearAll();
  },
  getSwitched: function () {
    return EventCenter.getSwitched();
  },
  setSwitched: function (enabled) {
    EventCenter.setSwitched(enabled);
  },
  log: function () {
    if (logFunc !== null) logFunc.apply(null, arguments);
  },
  setLogFunc: function (value) {
    logFunc = value;
  },
  isDebug: function () {
    return debug;
  },
  setDebug: function (enabled) {
    debug = enabled;
  }
};
