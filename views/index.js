window.onload = (function() {
	return function() {
		var shopCode = urlParams().shopCode;
		
		$("#shopName").html(shopCN[shopCode]);

		$("#submitBtn").on("click", function(event) {
		 	$.ajax({
	            url: "http://127.0.0.1:5533/code",
	            type: "POST",
	            data: {
	                code: $("#code").val(),
	                shopCode: shopCode
	            },
	            dataType: 'json',
	            success: function (data, status, xhr) {
	                console.log("sussess");
	            },
	            beforeSend: function () {
	                console.log("showloading");
	            },
	            error: function (xhr, errorType, status) {
	                console.log("hideloading");
	                console.log("网络请求失败, 请检查网络");
	            }
	        });
		});
	}
})();