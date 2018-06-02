/* eslint-disable */
/**
 * 事件分发接口
 * @type {[type]}
 * add by movinliao
 */

var Class = require('../Class');

var IDispatcher = Class.extend(function(){
  this.addListener = function(key, listener, priority){};
  this.removeListener = function(key, listener, priority){};
  this.dispatch = function(key, event){};
});

module.exports = IDispatcher;


