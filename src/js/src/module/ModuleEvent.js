/**
 * 模块事件
 * @type {[type]}
 * add by movinliao
 */
var BaseEvent = require('../base/BaseEvent');

var ModuleEvent = BaseEvent.extend(function () {
  this.priority = 0;
});

/**
 *日志
 */
BaseEvent.LOG = 'moduleevent.log';
/**
 *模块初始化
 */
BaseEvent.INIT = 'moduleevent.init';
/**
 *模块销毁
 */
BaseEvent.DESTROY = 'moduleevent.destroy';
/**
 *模块开始
 */
BaseEvent.START = 'moduleevent.start';
/**
 *模块停止
 */
BaseEvent.STOP = 'moduleevent.stop';
/**
 *块加入
 */
BaseEvent.ADD = 'moduleevent.add';
/**
 *块移除
 */
BaseEvent.REMOVE = 'moduleevent.remove';

module.exports = ModuleEvent;
