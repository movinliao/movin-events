/**
 * 单例模型
 * @type {[type]}
 * add by movinliao
 */

var Singleton = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

module.exports = Singleton;
