window.onload = (function() {
	var init = function() {
		_initTitle();
		_bindEvents();
	}

	var _initTitle = function() {
		var shopCode = urlParams().shopCode;
		$("#shopName").html(shopCN[shopCode]);
	}

	var _bindEvents = function() {
		$("#getCodeInfoBtn").on("click", function(event) {
		 	$.ajax({
	            url: "./codeInfo",
	            type: "GET",
	            data: {
	                code: $("#code").val()
	            },
	            dataType: "json",
	            success: function (resp, status, xhr) {
	                _hideLoading();
	                if (resp.code == 200) {
	                	_showOrderInfoDialog(resp.data);
	                	$("#code").val("");
	                } else {
	                	$.tipsShow({message : resp.msg, type : "warning"});
	                }
	            },
	            beforeSend: function () {
	                _showLoading();
	            },
	            error: function (xhr, errorType, status) {
	                _hideLoading();
	                console.log("网络请求失败, 请检查网络");
	                $.tipsShow({message : "网络异常", type : "danger"});
	            }
	        });
		});	

		$("#applyCodeBtn").on("click", function(event) {
			if ($("#applyCodeBtn").hasClass("disabled")) return ;

		 	$.ajax({
	            url: "./code",
	            type: "POST",
	            data: {
	                code: $("#orderDetailCode").html(),
	                shopCode: urlParams().shopCode
	            },
	            dataType: "json",
	            success: function (resp, status, xhr) {
	                _hideLoading();
	            	if (resp.code == 200) {
	            		$.tipsShow({message : "操作成功", type : "success"});
	            		$("#code").val("");
	            		_hideOrerInfoDialog();
	            	} else {
	            		$.tipsShow({message : resp.msg, type : "warning"});
	            	}
	            },
	            beforeSend: function () {
	                _showLoading();
	            },
	            error: function (xhr, errorType, status) {
	                _hideLoading();
	                console.log("网络请求失败, 请检查网络");
	                $.tipsShow({message : "网络异常", type : "danger"});
	            }
	        });
		});	

		$("#orderDetailMask").on("click", function(event) {
			_hideOrerInfoDialog();
		});

		$("#resetCodeBtn").on("click", function(event) {
		 	$("#code").val("");
		});	

		$("#toFaqBtn").on("click", function(event) {
		 	alert("请联系：13632257593");
		});	

		$("#toShopBtn").on("click", function(event) {
		 	window.open("http://www.baidu.com");
		});	
	}

	var _showLoading = function() {
		$("#loadingPanel").css("display", "block");
	}

	var _hideLoading = function() {
		$("#loadingPanel").css("display", "none");
	}

	var _showOrderInfoDialog = function(data) {
		$("#orderDetailDialog").css("display", "block");
		$("#orderDetailCode").html(data.code);

		var orderDetailHTML = "";
		for (var i = 0, len = data.orders.length; i < len; ++i) {
			var order = data.orders[i];
			orderDetailHTML += '<div class="od-list-item">' +
                '<div class="od-orderNo">订单号:' + order.orderId + '</div>' +
                '<div class="od-item">' +
                    '<div class="od-product-img-panel"><img src="' + order.imgUrl + '" class="od-product-img"></div>' +
                    '<div class="od-info">' +
                        '<div class="odi-title"><span>' + order.title + '</span></div>' +
                        '<div class="odi-price"><span>单价：￥' + order.price + '</span></div>' +
                        '<div class="odi-num"><span>数量：x ' + order.num + '</span></div>' +
                        '<div class="odi-total-price"><span>总价：</span><span class="odi-price">￥' + order.totalPrice + '</span></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
		}
		$("#orderDetailPanel").html(orderDetailHTML);

		if (data.status == 0) { // 未核销
			$("#applyCodeBtn").removeClass("disabled");
			$("#applyCodeBtn").html("确认发货");
		} else { // 已核销 
			$("#applyCodeBtn").addClass("disabled");
			$("#applyCodeBtn").html("已发货");
		}
	}

	var _hideOrerInfoDialog = function() {
		$("#orderDetailDialog").css("display", "none");
	}

	return init;
})();