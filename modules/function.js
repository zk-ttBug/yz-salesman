"use strict";

var fs = require("fs");

var SDK = require("youzan-sdk");
var secret = require("../conf/secret");
var sdk = SDK(secret());

var resObj = require("../conf/resObj");
var dateTool = require("../utils/dateTool");
var response = require("../utils/response");
var zLogger = require("../utils/zLogger");

/**
 * 获取活动信息
 *
 * @param {String} productCode 商品标示
 * @method getFunctionInfo
 */
var getFunctionInfo = function(productCode) {
	sdk.get("kdt.ump.timelimiteddiscount.find", {
	    page_size: 500,
	    page_no: 1
	}).then(function(resp) {
		var list = resp.response.list;
		for (var i = 0, len = list.length; i < len; ++i) {
			var alias = list[i].alias;
			if (alias == productCode) {
				resp
			}
		}
	}, function(resp) {
		console.log(resp);
	});
}

/**
 * node端：function 模块
 *
 * @author fsiaonma
 * @constructor
 */
module.exports = {
	getFunctionInfo: getFunctionInfo
}