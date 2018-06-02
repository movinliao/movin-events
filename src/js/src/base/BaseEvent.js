/**
 * 事件基类
 * @type {[type]}
 * add by movinliao
 */
var Class = require('../Class');

var BaseEvent = Class.extend(function () {
  this.type = '';
  this.eventData = {};

  this.constructor = function (e) {
    this.type = e;
  };
});

module.exports = BaseEvent;
