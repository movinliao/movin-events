/**
 * App中接口启动器
 * @type {[type]}
 * add by movinliao
 */
var App = function () {
  var _callbacks = {};

  var excute = function (param) {
    var result = null;
    var url;
    // js://app?params=xxxx
    url = 'js://app?params=' + JSON.stringify(param);
    result = win.prompt(url);
    result = JSON.parse(result);

    return result;
  };

  this.dataRequest = function (param) {
    var result = null;
    var valid = true;
    var command;
    do {
      if (!param || !param.command) break;
      command = param.command;

      switch (param.type) {
        case App.ADDLISTENER:
          valid = !!param.onCallbackDo;
          valid && (_callbacks[command] = param.onCallbackDo);
          break;
        case App.REMOVELISTENER:
          delete _callbacks[command];
          break;
      }

      result = excute(param);
    } while(false);

    return result;
  };

  this.callback = function (key) {
    return _callbacks[key];
  }
};

App.EXCUTE = 1;
App.ADDLISTENER = 2;
App.REMOVELISTENER = 3;

App.APP = 1;

App.ANDROID = 1;
App.IOS = 2;

module.exports = App;
