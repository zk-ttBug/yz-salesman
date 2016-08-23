'use strict';

var express = require('express');
var router = express.Router();

var response = require("../utils/response");
var resObj = require("../conf/resObj");

var codeModule = require("../modules/code");

/**
 * node端：API 路由
 *
 * @class router
 * @author sam.sin
 * @constructor
 */
module.exports = function() {
	// 设置请求头
	router.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    next();
	});
	
	router.post("/code", function(req, res) {
		if (!req.body || !req.body.code || !req.body.userAccount) {
			res.send(response(resObj.paramsError));
			return ;
		}
		var userAccount = req.body.userAccount;
		var code = req.body.code;
		codeModule.apply(userAccount, code, function(resp) {
			res.send(resp);
		});
	});

	router.get("/codeInfo", function(req, res) {
		if (!req.query || !req.query.code || !req.query.userAccount) {
			res.send(response(resObj.paramsError));
			return ;
		}
		var userAccount = req.query.userAccount;
		var code = req.query.code;
		codeModule.get(userAccount, code, function(resp) {
			res.send(resp);
		});
	});

	router.get("/functionInfo", function(req, res) {
		if (!req.query || !req.query.code) {
			res.send(response(resObj.paramsError));
			return ;
		}
		var code = req.query.code;
		codeModule.get(code, function(resp) {
			res.send(resp);
		});
	});

    return router;
};