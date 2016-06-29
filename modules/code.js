'use strict';

var fs = require("fs");

var SDK = require("youzan-sdk");
var sdk = SDK({key: "664b8df169ef1ba5f8", secret: "4363ed8c3d274d25f88075949076aac8"});

var dateTool = require("../utils/dateTool");
var response = require("../utils/response");
var resObj = require("../conf/resObj");

/**
 * 记录日志 _writeLog
 *
 * @param {Number} code 校验码
 * @param {Number} shopCode 店铺码
 * @param {String} checkRes 校验结果
 * @method _checkCodeLog
 */
var _checkCodeLog = function(code, shopCode, checkRes) {
	var date = new Date().getTime();
	var content = "";
	content += "操作时间：" + dateTool.dateTimeFormat(date) + " | ";
	content += "操作店铺代码：" + shopCode + " | ";
	content += "兑换码：" + code + " | ";
	content += "操作结果: " + checkRes + "\n";
	fs.writeFileSync("logs/" + dateTool.dateFormat(date), content, {flag: "a"});
}

/**
 * 获取提货码详情
 *
 * @param {String} code 校验码
 * @param {Function} callback 回调方法
 * @method get
 */
var get = function(code, callback) {
	sdk.get("kdt.trade.selffetchcode.get", {
	    code: code
	}).then(function(resp) {
		var response = resp.response;
		if (!response || !response.code || !response.trade || !response.trade.status || !response.trade.orders) {
			callback && callback(response(resObj.getCodeDetailError));
			return ;
		}
		var code = response.code;
		var status = response.trade.status;
		var orders = response.trade.orders;

	    callback && callback(response(resObj.success, {
	    	code: code,
	    	status: status,
	    	orders: (function() {
	    		var oRes = [];
	    		for (var i = 0, len = orders.length; i < len; ++i) {
	    			var orderInfo = orders[i];
	    			oRes.push({
	    				title: orderInfo.title,
	    				price: orderInfo.price,
	    				num: orderInfo.num,
	    				totalPrice: orderInfo.total_fee,
	    				pic_thumb_path: orderInfo.pic_thumb_path
	    			})
	    		}
	    		return oRes;
	    	})()
	    }));
	}, function(resp) {
		var msg;
		try {
			var errorResponse = JSON.parse(resp).error_response;
			msg = errorResponse.msg;
		} catch(e) {
			console.log(e);
			msg = resObj.getCodeDetailError.msg
		}
		callback && callback(response({
			code: resObj.getCodeDetailError.code,
			msg: msg
		}));
	});
}

/**
 * 应用 code
 *
 * @param {String} code 校验码
 * @param {String} shopCode 店铺码
 * @param {Function} callback 回调方法
 * @method apply
 */
var apply = function(code, shopCode, callback) {
	sdk.post("kdt.trade.selffetchcode.apply", {
	    code: code,
	}).then(function(resp) {
	    callback && callback(response(resObj.success));
	    _checkCodeLog(code, shopCode, "操作成功");
	}, function(resp) {
		var msg;
		try {
			var errorResponse = JSON.parse(resp).error_response;
			msg = errorResponse.msg;
		} catch(e) {
			console.log(e);
			msg = resObj.applyCodeError.msg
		}
		callback && callback(response({
			code: resObj.applyCodeError.code,
			msg: msg
		}));
		_checkCodeLog(code, shopCode, msg);
	});
}

/**
 * node端：code 模块
 *
 * @class code
 * @author fsiaonma
 * @constructor
 */
module.exports = {
	get: get,
	apply: apply
}