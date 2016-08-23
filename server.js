"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var em = require("./libs/eagle-mysql/eagleMysql");
var dbConf = require("./conf/dbConf");

var app = express();
app.use(express.static(__dirname + "/views")); // 静态资源目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("port", process.env.PORT || 5533); // 端口
app.use(require("./router")());
em.init(dbConf); // 初始化数据库

if (require.main === module) {
    app.listen(app.get("port"), function() {
        console.log("[%s] pagium server listening on port %d",
            app.get("env").toUpperCase(), app.get("port"));
    });
}