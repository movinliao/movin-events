var getCookie = function (name) {
  if (!document) {
    return '';
  }
  var arr,
    RE = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(RE)) {
    return unescape(arr[2]);
  }
  return '';
};

var setCookie = function (name, value, expires, domain, path, secure) {
  var cookieText = '';
  cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  if (expires instanceof Date) {
    cookieText += '; expires=' + expires.toGMTString();
  }
  if (path) {
    cookieText += '; path=' + path;
  }
  if (domain) {
    cookieText += '; domain=' + domain;
  }
  if (secure) {
    cookieText += '; secure';
  }
  document.cookie = cookieText;
};

var delCookie = function (name, domain, path, secure) {
  setCookie(name, "", Date(0), domain, path, secure);
};
//
//  有符号转无符号
//  http://www.jb51.net/article/44242.htm
//  http://www.360doc.com/content/14/0217/16/7566064_353253881.shtml

var toSigned = function (num) {

};

module.exports = {
  getCookie: getCookie,
  setCookie: setCookie,
  delCookie: delCookie
};
