"use strict";

/**
 * 返回结果代码集
 *
 * @author sam.sin
 * @class response
 * @constructor
 */
module.exports = {
	/**
     * 请求成功
     * @property success 
     * @type Object
     * @static 
     */
	success: {
		code: 200,
		msg: "success"
	},

	/**
     * 参数错误
     * @property paramsError 
     * @type Object
     * @static 
     */
	paramsError: {
		code: 4001,
		msg: "params error"
	},

	/**
     * 检查校验码错误
     * @property checkCodeError 
     * @type Object
     * @static 
     */
	checkCodeError: {
		code: 4002,
		msg: "check code error"
	}
}