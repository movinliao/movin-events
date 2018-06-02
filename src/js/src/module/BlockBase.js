/**
 * 块基类
 * @type {[type]}
 * add by movinliao
 */

var DispImpl = require('../events/DispImpl');

var BlockBase = DispImpl.extend(function () {
  var module = null;
  var stoped = false;

  this.constructor = function (key) {
    this.super(key);
  };
  /**
   * 模块初始化
   * @param api
   *
   */
  this.init = function (mod) {
    module = mod;
  };
  /**
   *模块销毁
   *
   */
  this.destroy = function () {
    this.clear();
    module = null;
  };
  /**
   *停止
   *
   */
  this.stop = function () {
    stoped = true;
    this.setPaused(true);
  };
  /**
   *开始
   *
   */
  this.start = function () {
    stoped = false;
    this.setPaused(false);
  };

  this.stoped = function () {
    return stoped;
  };

  this.module = function () {
    return module;
  };

  this.log = function (context, priority) {
    if ('log' in module) {
      module.log(context, priority);
    }
  };
});

module.exports = BlockBase;
