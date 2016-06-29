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
		// $("#submitCodeBtn").on("click", function(event) {
		//  	$.ajax({
	 //            url: "http://127.0.0.1:5533/code",
	 //            type: "POST",
	 //            data: {
	 //                code: $("#code").val(),
	 //                shopCode: urlParams().shopCode
	 //            },
	 //            dataType: "json",
	 //            success: function (data, status, xhr) {
	 //                _hideLoading();
	 //            	if (data.code == 200) {
	 //            		$.tipsShow({message : "操作成功", type : "success"});
	 //            		$("#code").val("");
	 //            	} else {
	 //            		$.tipsShow({message : data.msg, type : "warning"});
	 //            	}
	 //            },
	 //            beforeSend: function () {
	 //                _showLoading();
	 //            },
	 //            error: function (xhr, errorType, status) {
	 //                _hideLoading();
	 //                console.log("网络请求失败, 请检查网络");
	 //                $.tipsShow({message : "网络异常", type : "danger"});
	 //            }
	 //        });
		// });	

		$("#getCodeInfoBtn").on("click", function(event) {
		 	$.ajax({
	            url: "http://127.0.0.1:5533/codeInfo",
	            type: "GET",
	            data: {
	                code: $("#code").val()
	            },
	            dataType: "json",
	            success: function (data, status, xhr) {
	                _hideLoading();
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

	return init;
})();