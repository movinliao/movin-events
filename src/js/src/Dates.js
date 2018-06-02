var Strings = require('./Strings');
var Dates = function () {};

Dates.MILLISECOND = 1;
Dates.SECOND = Dates.MILLISECOND * 1000;
Dates.MINUTE = Dates.SECOND * 60;
Dates.HOUR = Dates.MINUTE * 60;
Dates.DAY = Dates.HOUR * 24;
Dates.WEEK = Dates.DAY * 7;
Dates.CHINESE_DATE_FORMAT = 'YYYY-MM-DD';
Dates.CHINESE_DATETIME_FORMAT = 'YYYY-MM-DD HH:NN:SS';

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、
  12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
  可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
  Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      **/
Dates.format = function (fmt) {
  var result = fmt;
  var date = new Date();
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  var week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  };
  if (/(y+)/.test(result)) {
    result = result.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(result)) {
    result = result.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(result)) {
      result = result.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return result;
};

Dates.formatDateTime = function (date, formats) {
  var result = formats || Dates.CHINESE_DATE_FORMAT;
  return Dates.dateToString(date, result);
};

Dates.dateToString = function (date, formats) {
  var result = formats;
  result = Strings.replace(result, 'YYYY', date.getFullYear().toString());
  result = Strings.replace(result, 'MM', (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) :
    (date.getMonth() + 1).toString());
  result = Strings.replace(result, 'DD', date.getDate() < 10 ? '0' + date.getDate() :
    date.getDate().toString());
  result = Strings.replace(result, 'HH', date.getHours());
  result = Strings.replace(result, 'mm', date.getMinutes() < 10 ? '0' + date.getMinutes() :
    date.getMinutes());
  result = Strings.replace(result, 'SS', date.getSeconds() < 10 ? '0' + date.getSeconds() :
    date.getSeconds());
  return result;
};

module.exports = Dates;
