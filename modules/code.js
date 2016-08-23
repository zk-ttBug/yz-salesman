"use strict";

var fs = require("fs");

var SDK = require("youzan-sdk");
var secret = require("../conf/secret");
var sdk = SDK(secret());

var em = require("../libs/eagle-mysql/eagleMysql");
var sqlCondtion = require("../libs/eagle-mysql/sqlCondition");

var resObj = require("../conf/resObj");
var dateTool = require("../utils/dateTool");
var response = require("../utils/response");
var zLogger = require("../utils/zLogger");

/**
 * 记录日志 _logContent
 *
 * @param {Number} code 校验码
 * @param {String} checkRes 校验结果
 * @method _logContent
 */
var _logContent = function(code, checkRes) {
	var content = "";
	content += "兑换码：" + code + " | ";
	content += "操作结果: " + checkRes + "\n";
	return content;
}

/**
 * 检查用户
 *
 * @param {String} userAccount 校验码
 * @param {Function} callback 校验结果
 * @method _checkUser
 */
var _checkUser = function(userAccount, callback) {
	var selSql = "select count(*) from t_user where USER_ACCOUNT = " + userAccount + " and STATUS = 'Normal'";
	em.connect();      
 	em.excute(selSql, {
 		success : function (resp) {
 			if (resp.results[0]["count(*)"] > 0) {
 				callback && callback(response(resObj.success, {
 					userAccount: userAccount
 				}));
 			} else {
 				callback && callback(response(resObj.userNotExist));
 			} 
		},                                                                                 
        error : function (err) {   
        	callback && callback(response(resObj.userNotExist));                                               
        }                                                                           
    });
    em.disconnect();
}

/**
 * 获取提货码详情
 *
 * @param {String} userAccount 用户账号
 * @param {String} code 校验码
 * @param {Function} callback 回调方法
 * @method get
 */
var get = function(userAccount, code, callback) {
	_checkUser(userAccount, function(userResp) {
		if (userResp.code == resObj.userNotExist.code) {
			console.log(111, response(resObj.userNotExist), callback);
			callback && callback(response(resObj.userNotExist));
			return ;
		}

		zLogger.log("查询 code: " + code);
		sdk.get("kdt.trade.selffetchcode.get", {
		    code: code
		}).then(function(resp) {
			var sdkResp = resp.response;
			if (sdkResp === undefined || sdkResp.code === undefined || sdkResp.status === undefined 
				|| sdkResp.trade === undefined || sdkResp.trade.orders === undefined) {
				callback && callback(response(resObj.getCodeDetailError));
				return ;
			}

			var code = sdkResp.code;
			var status = sdkResp.status;
			var orders = sdkResp.trade.orders;

		    callback && callback(response(resObj.success, {
		    	code: code,
		    	status: status,
		    	userAccount: userResp.data.userAccount,
		    	orders: (function() {
		    		var oRes = [];
		    		for (var i = 0, len = orders.length; i < len; ++i) {
		    			var orderInfo = orders[i];
		    			oRes.push({
		    				orderId: orderInfo.oid,
		    				title: orderInfo.title,
		    				price: orderInfo.price,
		    				num: orderInfo.num,
		    				totalPrice: orderInfo.total_fee,
		    				imgUrl: orderInfo.pic_thumb_path
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
	});
}

/**
 * 应用 code
 *
 * @param {String} userAccount 用户账号
 * @param {String} code 校验码
 * @param {Function} callback 回调方法
 * @method apply
 */
var apply = function(userAccount, code, callback) {
	sdk.post("kdt.trade.selffetchcode.apply", {
	    code: code
	}).then(function(resp) {
		var insertParams = {                             
			table  : "t_operation",                      
			keys   : ["USER_ACCOUNT", "PRODUCT_CODE", "OPER_TIME", "STATUS"],                       
			values : [userAccount, code, new Date().getTime(), "Normal"]                        
		}; 
		em.connect();                                              
		em.insert(insertParams, {                
			success : function (data) {
			  	callback && callback(response(resObj.success));
	    		zLogger.log(_logContent(code, "操作成功"));           
			},                                           
			error : function (err) {                     
				callback && callback(response(resObj.addComFail));                   
			}                                            
		});
		em.disconnect();
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
		zLogger.log(_logContent(code, msg)); 
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