/**
 * Android中接口启动器
 * @type {[type]}
 * add by movinliao
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.APP = factory();
    }
}(this, function() {
  var Base64 = require('../src/Base64');
  var App = require('../src/patch/App');

  var app = new App();
  var onCallback = function (key, base64, packed) {
    var callback;
    var json;
    var resp;
    do {
      callback = app.callback(key);
      if(!callback) break;
      json = Base64.fromBase64(base64);
      resp = !packed ? ((json && JSON.parse(json)) || null) : json;
      if (callback) callback.apply(null, [resp]);
    } while(false);
  };

  var dataRequest = function (param) {
    return app.dataRequest(param);
  };

  return {
    onCallback: onCallback,
    dataRequest: dataRequest,
    appType: App.ANDROID,
    clientType: App.APP
  };
}));
