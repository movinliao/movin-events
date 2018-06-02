/**
 * 模块定义框架
 * @type {[type]}
 * add by movinliao
 */
var DispImpl = require('../events/DispImpl');
var HashMap = require('../HashMap');
var ModuleEvent = require('./ModuleEvent');

var ModuleBase = DispImpl.extend(function () {
  var self = this;

  var _blocks = new HashMap();
  var _api = null;
  var _inited = false;

  this.constructor = function (key) {
    this.super(key);
  };
  /**
   * 模块初始化
   * @param api
   *
   */
  this.init = function (api) {
    _api = api;

    _blocks.eachValue(function (item) {
      item.init(self);
      return false;
    });

    _inited = true;

    self.dispatchEvent(ModuleEvent.INIT);
  };
  /**
   *模块销毁
   *
   */
  this.destroy = function () {
    self.dispatchEvent(ModuleEvent.DESTROY);

    _blocks.eachValue(function (item) {
      item.destroy();
      return false;
    }, false);

    _blocks.clear();

    _api = null;
    _blocks = null;
  };
  /**
   *停止
   *
   */
  this.stop = function () {
    self.dispatchEvent(ModuleEvent.STOP);

    self.setPaused(true);

    _blocks.eachValue(function (item) {
      item.stop();
      return false;
    }, false);
  };
  /**
   *开始
   *
   */
  this.start = function () {
    self.setPaused(false);

    _blocks.eachValue(function (item) {
      item.start();
      return false;
    });

    self.dispatchEvent(ModuleEvent.START);
  };
  /**
   * 增加块
   * @param key
   * @param block
   *
   */
  this.addBlock = function (key, block) {
    if (!block || _blocks.containKey(key)) {
      return;
    }

    if (_inited) {
      block.init(self);
    }

    _blocks.put(key, block);
    self.dispatchEvent(ModuleEvent.ADD, key);
  };
  /**
   * 移除块
   * @param key
   *
   */
  this.removeBlock = function (key) {
    var item;

    self.dispatchEvent(ModuleEvent.REMOVE, key);

    if (!_blocks.containKey(key)) {
      return;
    }
    item = _blocks.remove(key);
    item.destroy();
  };
  /**
   *获取块
   * @param key
   * @return
   *
   */
  this.block = function (key) {
    return _blocks.getValue(key);
  };
  /**
   *判断是否已经加载
   * @return Boolean
   *
   */
  this.hasBlock = function (key) {
    return _blocks.containKey(key);
  };
  /**
   *获取是否已经初始化
   * @return
   *
   */
  this.inited = function () {
    return _inited;
  };
  /**
   * 获取api
   * @return
   *
   */
  this.api = function () {
    return _api;
  };
  /**
   *获取模块键值组
   * @return Array
   *
   */
  this.keys = function () {
    return _blocks.keys();
  };
  /**
   * 关注某块事件
   * @param blockKey 块标志
   * @param key 事件标志
   * @param listener 事件
   * @param priority 优先级
   *
   */
  this.addBlockListener = function (blockKey, key, listener, priority) {
    var block = _blocks.getValue(blockKey);
    if (block) {
      block.addListener(key, listener, priority);
    }
  };
  /**
   *移除块事件关注
   * @param blockKey 块标志
   * @param key 事件标志
   * @param listener 事件
   * @param priority 优先级
   *
   */
  this.removeBlockListener = function (blockKey, key, listener, priority) {
    var block = _blocks.getValue(blockKey);
    if (block) {
      block.removeListener(key, listener, priority);
    }
  };
  /**
   *记录日志
   * @param content
   * @param type
   * @return
   *
   */
  this.log = function (content, priority) {};

  this.dispatchEvent = function (key, data, priority) {
    var event = new ModuleEvent(key);
    event.eventData = data || {};
    event.priority = priority || 0;

    self.dispatch(key, event);
  };
});

module.exports = ModuleBase;
