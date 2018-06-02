
var getQuerys = function (onlyHash) {
  var str = (onlyHash ? location.hash : location.href).slice(1);
  var num = str.indexOf('?');
  var ex = /([^&]+?)=([^#&]+)/g;
  var result = {};

  str = str.substr(num + 1);
  while (ex.test(str)) {
    result[RegExp.$1] = RegExp.$2;
  }
  return result;
};

var getQuery = function (name) {
  var params = getQuerys();
  return params[name] || null;
};

module.exports = {
  getQuerys: getQuerys,
  getQuery: getQuery
};
