/**
 * Http请求
 * @type {[type]}
 * add by movinliao
 */

var JQuery = require('./jquery');

var Http = function () {};

Http.get = function (url, data, done, fail, always, dataType) {
  JQuery.get(url, data, done, dataType).fail(fail).always(always);
};

Http.getEx = function (url, data, done, fail, always) {
  JQuery.ajax({
    url: url,
    data: data,
    success: done,
    // xhrFields: {
    //   withCredentials: true
    // },
    // crossDomain: true,
    dataType: 'jsonp'
  }).fail(fail).always(always);
};

Http.post = function (url, data, done, fail, always, dataType) {
  JQuery.post(url, data, done, dataType).fail(fail).always(always);
};

module.exports = Http;
