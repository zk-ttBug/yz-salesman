"use strict";

/**
 * 时间戳转换为日期
 *
 * @path {Number} timeStamp 时间戳
 * @method deleteFolder 
 */
var dateFormat = function(timeStamp) {
    var date = new Date(Number(timeStamp));
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    return year + "-" + month + "-" + day;
};

/**
 * 时间戳转换为日期，时间
 *
 * @path {Number} timeStamp 时间戳
 * @method deleteFolder 
 */
var dateTimeFormat = function(timeStamp) {
    var date = new Date(Number(timeStamp));
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second;
};

module.exports = {
   dateFormat: dateFormat,
   dateTimeFormat: dateTimeFormat
}