/**
 * 设置对象属性只读
 * @type {[type]}
 * add by movinliao
 */

var Readonly = function (obj, property) {
  var key;

  var writable = function (name) {
    Object.defineProperty(obj, name, { writable: false });
  };

  if (!obj) {
    return obj;
  }

  if (property) {
    writable(property);
    return obj;
  }

  for (key in obj) {
    writable(key);
  }

  return obj;
};

module.exports = Readonly;
