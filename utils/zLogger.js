"use strict";

var fs = require("fs");

/**
 * 时间戳转换为日期
 *
 * @path {Number} timeStamp 时间戳
 * @method deleteFolder 
 */
var _dateFormat = function(timeStamp) {
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

/**
 * 写日志
 *
 * @path {String} content 内容
 * @method log 
 */
var log = function(content) {
	if (!fs.existsSync("logs/")) {
		fs.mkdir("logs/");
	}
	var timeStamp = new Date().getTime();
	fs.writeFileSync("logs/" + _dateFormat(timeStamp), "[" + dateTimeFormat(timeStamp) + "] " + content, {flag: "a"});
}

module.exports = {
	log: log
} 