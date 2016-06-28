"use strict";

/**
 * 公用 urlParams 处理逻辑
 *
 * @class urlParams
 * @constructor
 */
var urlParams = function() {
    var params = {};
    var search = location.search;
    var kvs = search.substr(1).split("&");
    for (var i = 0, len = kvs.length; i < len; ++i) {
        var kvstr = kvs[i];
        var kv = kvstr.split("=");
        params[kv[0]] = kv[1];
    }
    return params;
}   