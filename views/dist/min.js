var shopCN={1:"龙津路店"},urlParams=function(){for(var o={},s=location.search,e=s.substr(1).split("&"),a=0,n=e.length;a<n;++a){var i=e[a],d=i.split("=");o[d[0]]=d[1]}return o};window.onload=function(){var o=function(){s(),e()},s=function(){var o=urlParams().shopCode;$("#shopName").html(shopCN[o])},e=function(){$("#getCodeInfoBtn").on("click",function(o){$.ajax({url:"./codeInfo",type:"GET",data:{code:$("#code").val()},dataType:"json",success:function(o,s,e){n(),200==o.code?(i(o.data),$("#code").val("")):$.tipsShow({message:o.msg,type:"warning"})},beforeSend:function(){a()},error:function(o,s,e){n(),console.log("网络请求失败, 请检查网络"),$.tipsShow({message:"网络异常",type:"danger"})}})}),$("#applyCodeBtn").on("click",function(o){$("#applyCodeBtn").hasClass("disabled")||$.ajax({url:"./code",type:"POST",data:{code:$("#orderDetailCode").html(),shopCode:urlParams().shopCode},dataType:"json",success:function(o,s,e){n(),200==o.code?($.tipsShow({message:"操作成功",type:"success"}),$("#code").val("")):$.tipsShow({message:o.msg,type:"warning"})},beforeSend:function(){a()},error:function(o,s,e){n(),console.log("网络请求失败, 请检查网络"),$.tipsShow({message:"网络异常",type:"danger"})}})}),$("#orderDetailMask").on("click",function(o){d()}),$("#resetCodeBtn").on("click",function(o){$("#code").val("")}),$("#toFaqBtn").on("click",function(o){alert("请联系：13632257593")}),$("#toShopBtn").on("click",function(o){window.open("http://www.baidu.com")})},a=function(){$("#loadingPanel").css("display","block")},n=function(){$("#loadingPanel").css("display","none")},i=function(o){$("#orderDetailDialog").css("display","block"),$("#orderDetailCode").html(o.code);for(var s="",e=0,a=o.orders.length;e<a;++e){var n=o.orders[e];s+='<div class="od-list-item"><div class="od-orderNo">订单号:'+n.orderId+'</div><div class="od-item"><div class="od-product-img-panel"><img src="'+n.imgUrl+'" class="od-product-img"></div><div class="od-info"><div class="odi-title"><span>'+n.title+'</span></div><div class="odi-price"><span>单价：￥'+n.price+'</span></div><div class="odi-num"><span>数量：x '+n.num+'</span></div><div class="odi-total-price"><span>总价：</span><span class="odi-price">￥'+n.totalPrice+"</span></div></div></div></div>"}$("#orderDetailPanel").html(s),0==o.status?($("#applyCodeBtn").removeClass("disabled"),$("#applyCodeBtn").html("确认发货")):($("#applyCodeBtn").addClass("disabled"),$("#applyCodeBtn").html("已发货"))},d=function(){$("#orderDetailDialog").css("display","none")};return o}();