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
     * 查看提货码详情错误
     * @property getCodeDetailError 
     * @type Object
     * @static 
     */
	getCodeDetailError: {
		code: 4002,
		msg: "get code detail error"
	},

	/**
     * 检查提货码错误
     * @property applyCodeError 
     * @type Object
     * @static 
     */
	applyCodeError: {
		code: 4003,
		msg: "apply code error"
	},

	/**
     * 用户不存在
     * @property userNotExist 
     * @type Object
     * @static 
     */
	userNotExist: {
		code: 4004,
		msg: "员工手机号不存在，请检查清楚 ^_^"
	}
}