/**
 * Created by Administrator on 2017/7/5.
 */

var Strings = function () {};

var _htmlTranslateStrs = [{ str: '<', htmlStr: '&lt;' }, { str: '>', htmlStr: '&gt;' }];
/** 用字符串填充数组，并返回数组副本 */
Strings.fillArray = function (arr, str, type) {
  var temp = arr.slice();
  var a;
  var value;
  var i = 0;
  var n;

  if (str) {
    a = str.split(',');
    for (n = Math.min(temp.length, a.length); i < n; ++i) {
      value = a[i];
      temp[i] = (value === 'true') ? true : ((value === 'false') ? false : value);
      if (type !== null) {
        temp[i] = type(value);
      }
    }
  }
  return temp;
};

/** 转换Rectangle为逗号间隔的字符串*/
Strings.rectToString = function (rect) {
  if (rect) {
    return rect.x + ',' + rect.y + ',' + rect.width + ',' + rect.height;
  }
  return null;
};

Strings.replace = function (value, fromStr, replaceString) {
  return value.split(fromStr).join(replaceString);
};

Strings.htmlTranslate = function (value) {
  var index;
  var item;
  var result;
  for (index in _htmlTranslateStrs) {
    item = _htmlTranslateStrs[index];
    result = Strings.replace(value, item.str, item.htmlStr);
  }
  return result;
};

Strings.trim = function (input) {
  return Strings.ltrim(Strings.rtrim(input));
};

Strings.ltrim = function (input) {
  var size = input.length;
  var i = 0;

  for (; i < size; ++i) {
    if (input.charCodeAt(i) > 32) {
      return input.substring(i);
    }
  }
  return '';
};


Strings.rtrim = function (input) {
  var i = input.length;
  for (; i > 0; --i) {
    if (input.charCodeAt(i - 1) > 32) {
      return input.substring(0, i);
    }
  }
  return '';
};

/** 在一段文字中，删除某些文字 */
Strings.remove = function (input, remove) {
  return Strings.replace(input, remove, '');
};

/** 在一段文字中，把某些文字替换 文字 */
Strings.replace = function (input, replace, replaceWith) {
  return input.split(replace).join(replaceWith);
};

Strings.stringHasValue = function (s) {
  return (s != null && s.length > 0);
};

Strings.fomaNumber = function (value) {
  if (value >= 100000000) {
    return (value / 100000000).toFixed(2).toString() + '亿';
  }
  if (value >= 10000) {
    return (value / 10000).toFixed(2).toString() + '万';
  }
  return value.toString();
};

/**
 * 截取字符长度
 * @param length
 *
 */
Strings.slice = function (value, length, istTip) {
  var result = value;
  if (!istTip) istTip = true;
  if (value.length > length) {
    result = value.slice(0, length - 1);
    if (istTip) {
      result += '...';
    }
  }
  return result;
};

module.exports = Strings;
