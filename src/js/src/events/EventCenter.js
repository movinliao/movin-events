/**
 * 事件分发基类
 * @type {[type]}
 * add by movinliao
 */
var Class = require('../Class');
var HashMap = require('../HashMap');
var EventConst = require('./EventConst');
var Handler = require('./Handler');

var handers = new HashMap();
var base_key = 0;

var EventBody = Class.extend(function () {
  var self = this;
  var priority = EventConst.PRIORITY_NORMAL;
  var bodyKey = ++base_key;

  this.constructor = function (listener_, handler_, priority_) {
    priority = priority_;
    handers.put(bodyKey, { listener: listener_, handler: handler_ });
  };

  this.getBody = function () {
    return handers.get(bodyKey);
  };

  this.destroy = function () {
    handers.remove(bodyKey);
  };

  this.priority = function () {
    return priority;
  };

  this.same = function (listener, handler, priority_) {
    var info = self.getBody();

    return (info && (info.listener === listener) &&
      ((info.handler === handler) ||
        (info.handler instanceof Handler && info.handler.same(handler))) &&
      (priority === priority_));
  };

  this.exec = function (event) {
    var handler;
    var listener;

    var item = self.getBody();

    if (!item) return;

    handler = item.handler;
    listener = item.listener;

    if (handler && ((typeof handler === 'function') || (handler instanceof Handler))) {
      // try{
      handler.apply(listener, [event]);
      // }catch(error){
      //   if(EventConst.isDebug) throw(error);
      // }
    } else if (console) {
      console.info('====监听事件错误======', handler);
    }
  };
});

var ModuleBody = Class.extend(function () {
  var self = this;

  var paused = false;
  var events = new HashMap();

  var execItems = function (list, event) {
    var i;
    var item;

    for (i in list) {
      item = list[i];

      if (!item) {
        continue;
      }

      item.exec(event);
    }
  };

  var indexOf = function (list, listener, handler, priority) {
    var index = -1;
    var i;
    var item;

    for (i = 0; i < list.length; ++i) {
      item = list[i];
      if (item && item.same(listener, handler, priority)) {
        index = i;
        break;
      }
    }

    return index;
  };

  this.constructor = function (paused_) {
    paused = paused_;
  };

  this.exec = function (key, event) {
    var list;

    if (paused || !events.containKey(key)) {
      return;
    }

    list = events.getValue(key) || [];

    execItems(list.slice(), event);
  };

  this.add = function (key, listener, handler, priority) {
    var list;

    if (!events.containKey(key)) {
      events.put(key, []);
    }

    list = events.getValue(key);

    if (indexOf(list, listener, handler, priority) === -1) {
      list.push(new EventBody(listener, handler, priority));
      list.sort(function (item1, item2) {
        return item2.priority() - item1.priority();
      });
    }
  };

  this.remove = function (key, listener, handler, priority) {
    var list;
    var index = -1;
    var item;

    if (!events.containKey(key)) {
      return;
    }

    list = events.getValue(key);
    do {
      index = indexOf(list, listener, handler, priority);
      if (index > -1) {
        item = list[index];
        list.splice(index, 1);
        if (item && item.getBody()) {
          item.destroy();
          item = null;
        }
      }
    } while (index > -1);
  };

  this.clear = function (key, listener) {
    var list;
    var i;
    var item;
    var body;
    var index;
    var evb;

    if (!events.containKey(key)) {
      return;
    }

    list = events.getValue(key);
    for (i in list) {
      item = list[i];
      if (!item) {
        continue;
      }

      body = item.getBody();
      if (body && (body.listener === listener)) {
        index = list.indexOf(item);
        if (index !== -1) {
          evb = list[index];
          list.splice(index, 1);
          if (evb && evb.body) {
            evb.destroy();
            evb = null;
          }
        }
      }
    }
  };

  this.clearAll = function () {
    events.clear();
  };

  this.setPaused = function (enabled) {
    paused = enabled;
  };
});


var moduleMap = new HashMap();
var switched = true;

var EventCenter = function () {};
/**
 * 加入事件
 * @param key      模块标志
 * @param subKey   事件标志
 * @param listener 事件属主
 * @param handler  事件执行体
 * @param priority 事件处理优先级
 *
 */
EventCenter.addListener = function (key, subKey, listener, handler, priority) {
  var module;

  if (!handler || !(handler instanceof Handler)) {
    console.info('====添加监听事件错误======', handler);
    throw new Error('添加事件监听不是有效的 Handler ');
  }

  key = String(key);
  subKey = String(subKey);

  if (!moduleMap.containKey(key)) {
    moduleMap.put(key, new ModuleBody(!switched));
  }

  module = moduleMap.getValue(key);
  module.add(subKey, listener, handler, priority);

  EventConst.log('Listener add: key=' + key + ', subKey=' + subKey);
};

/**
 * 移除事件
 * @param key      模块标志
 * @param subKey   事件标志
 * @param listener 事件属主
 * @param handler  事件执行体
 * @param priority 事件处理优先级
 *
 */
EventCenter.removeListener = function (key, subKey, listener, handler, priority) {
  var module;

  key = String(key);
  subKey = String(subKey);

  if (!moduleMap.containKey(key)) {
    return;
  }

  module = moduleMap.getValue(key);
  module.remove(subKey, listener, handler, priority);

  EventConst.log('Listener remove: key=' + key + ', subKey=' + subKey);
};

/**
 *分发一个事件
 * @param key     模块标志
 * @param subKey  事件标志
 * @param args    事件分发参数
 *
 */
EventCenter.dispatch = function (key, subKey, event) {
  var module;

  key = String(key);
  subKey = String(subKey);

  if (!switched || !moduleMap.containKey(key)) {
    return;
  }
  module = moduleMap.getValue(key);
  module.exec(subKey, event);

  EventConst.log('Event dispatch: key=' + key + ', subKey=' + subKey);
};

/**
 *  暂停激活或者暂停某个组
 * @param key    模块标志
 * @param enabled  true 为暂停 false 为激活
 *
 */
EventCenter.setPause = function (key, enabled) {
  var module;

  key = String(key);

  if (!moduleMap.containKey(key)) {
    return;
  }

  module = moduleMap.getValue(key);
  module.setPaused(enabled);

  EventConst.log('Event pause: key=' + key + ', enabled=' + enabled);
};

/**
 * 停止所有的回调
 *
 */
EventCenter.clearAll = function () {
  moduleMap.clear();
  EventConst.log('Event clearAll');
};

/**
 *停止指定的回调
 * @param key
 * @param listener
 *
 */
EventCenter.clear = function (key) {
  var module;

  key = String(key);

  if (!moduleMap.containKey(key)) {
    return;
  }

  module = moduleMap.getValue(key);
  module.clearAll();
  // module.clear(key, listener);

  EventConst.log('Event clear: key=' + key);
};

/**
 *事件开关 读
 * @return
 *
 */
EventCenter.getSwitched = function () {
  return switched;
};

/**
 * 事件开关写
 * @param enabled
 *
 */
EventCenter.setSwitched = function (enabled) {
  switched = enabled;
  EventConst.log('Event switched: enabled=' + enabled);
};

module.exports = EventCenter;
