/**
 * 数据库字段类型
 * @type {[type]}
 * add by movinliao
 */
var DWORD = 0;
var BOOL = 1;
var STRING = 2;
var BYTE = 3;
var ARRAY = 4;
var MAP = 5;
var VALUE = 6;

var FieldType = function () {};

FieldType.DWORD = DWORD;
FieldType.BOOL = BOOL;
FieldType.STRING = STRING;
FieldType.BYTE = BYTE;
FieldType.ARRAY = ARRAY;
FieldType.MAP = MAP;
FieldType.VALUE = VALUE;

module.exports = FieldType;
