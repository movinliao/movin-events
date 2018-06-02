(function (global) {
  var App = function () {
    var _callbacks = {};

    var excute = function (param) {
      var result = null;
      var url;
      var win = window || {};
      if (win.prompt) {
        // js://app?params=xxxx
        url = "js://app?params=" + JSON.stringify(param);
        result = win.prompt(url);
        result = JSON.parse(result);
      }

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
            valid = false;
            break;
          case App.REMOVELISTENER:
            delete _callbacks[command];
            valid = false;
            break;
        }
        if (!valid) break;
        result = excute(param);
      } while(false);

      return result;
    };

    this.callback = function (key) {
      return _callbacks[key];
    };
  };

  App.EXCUTE = 1;
  App.ADDLISTENER = 2;
  App.REMOVELISTENER = 3;

  App.APP = 1;

  App.ANDROID = 1;
  App.IOS = 2;

  var fromBase64 = function (data) {
    var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;

    var _atob = function (s) {
      var cur, prev, mod, i = 0, result = [];
      var str = s.replace(/\s|=/g, "");
      while (i < str.length) {
        // cur = b64chars.indexOf(s.charAt(i));
        cur = b64tab[str.charAt(i)];
        mod = i % 4;
        switch (mod) {
          case 0: break;
          case 1: result.push(fromCharCode(prev << 2 | cur >> 4)); break;
          case 2: result.push(fromCharCode((prev & 0x0f) << 4 | cur >> 2)); break;
          case 3: result.push(fromCharCode((prev & 3) << 6 | cur)); break;
        }
        prev = cur;
        ++i;
      }
      return result.join('');
    };

    return global && global.atob ? global.atob(data) : _atob(data);
  };

  var app = new App();
  var onCallback = function (key, base64, packed) {
    var callback;
    var json;
    var resp;
    do {
      callback = app.callback(key);
      if(!callback) break;
      json = fromBase64(base64);
      resp = !packed ? ((json && JSON.parse(json)) || null) : json;
      if (callback) callback.apply(null, [resp]);
    } while(false);
  };

  var dataRequest = function (param) {
    return app.dataRequest(param);
  };

  global.app = {
    onCallback: onCallback,
    dataRequest: dataRequest,
    appType: App.IOS,
    clientType: App.APP
  };
})(window || this);
