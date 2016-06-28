/**
 * Created by Administrator on 2015/10/20.
 */
//禁止滚动事件
function stopScroll(event){
    event.preventDefault();
}

//初始化alert,dialog等容器位置
function setContainerPosition(obj){

    var uitype = $(obj).attr('ui-type');
    if(uitype == 'alert' || uitype == 'tips' || uitype == 'block'){
        var $clone = $(obj).clone().css('display', 'block').appendTo('body');
        var top = Math.round((document.documentElement.clientHeight - $clone.height()) / 2);
        var left = Math.round((document.documentElement.clientWidth - $clone.width()) / 2);
        top = top > 0 ? top : 0;
        left = left > 0 ? left : 0;
        $clone.remove();
        $(obj).css({
            "top" : top,
            "left" : left
        });
    }

}

/*
 * block控件
 * 指定block对象的属性message
 * message : 信息提示内容(string/obj)
 * */

//创建弹窗
$.block = function (jsonData) {
    var currentObj = new blockObj(jsonData);
};

//关闭弹窗
$.unblock = function () {
    if ($("[ui-type='block']").length > 0) {
        $('body').find('.doraui_mask').remove();
        document.body.removeEventListener('touchmove', stopScroll , false);
        $("[ui-type='block']").each(function (i) {
            if ($(this).attr('msg-type') == 'obj') {
                $(this).children().eq(0).hide();
                $(this).children().eq(0).unwrap();
            } else {
                $(this).remove();
            }
        });
    }
};

var blockObj = function (jsonData) {

    var objId = "block_" + Math.round(Math.random() * 100);
    jsonData = jsonData || {};
    jsonData.message = jsonData.message || '<p>请稍后...</p>';
    jsonData.overClass = jsonData.overClass || 'block-a';

    this.html = blockHtml(objId, jsonData);
    this.init(objId, jsonData);
};

blockObj.prototype = {
//    block初始化
    init: function (objId, jsonData) {
        var _this = this;

        if (jsonData.message instanceof jQuery) {
            $(jsonData.message).wrap(this.html);
            _this.obj = $('#' + objId);
            $(_this.obj).attr('msg-type', 'obj');
            $(_this.obj).show();
            $(jsonData.message).show();
        } else {
            $('body').prepend(this.html);
            _this.obj = $('#' + objId);
            $(_this.obj).attr('msg-type', 'str');
            $(jsonData.message).appendTo(_this.obj);
        }

//        设置容器的居中显示
        $(_this.obj).css({
            'width' : $(_this.obj).width() +'px',
            'left' : '50%',
            'top' : '50%',
            'margin-left' : - $(_this.obj).width()/2 + 'px',
            'margin-top' : - $(_this.obj).height()/2 + 'px'
        });

        $("<div class='doraui_mask' style='z-index: 10'></div>").insertBefore(_this.obj);
        $(_this.obj).css('z-index', 11);
//        禁止背景拖动
        document.body.addEventListener('touchmove', stopScroll , false);

    }
};


function blockHtml(objId, jsonData) {
    var html = "";
    html += "<div class='block " + jsonData.overClass + "' ui-type='block' id='" + objId + "'></div>";
    return html;
}


/*
 * tips 操作提示控件
 * 指定tips对象的属性message
 * type : 信息提示类型 success 操作成功 warning 警告 danger 危险 info 提示
 * message : 信息提示内容(string/obj)
 * */

$.tipsShow = function (jsonData) {
    var currentObj = new tipsObj(jsonData);
};

$.tipsHide = function (obj) {
    $(obj).remove();
    document.body.removeEventListener('touchmove', stopScroll , false);
};

var tipsObj = function (jsonData) {
    var objId = "tips_" + Math.round(Math.random() * 100);
    jsonData = jsonData || {};
    jsonData.type = jsonData.type || 'success';
    jsonData.message = jsonData.message || '操作成功！';
    jsonData.overClass = jsonData.overClass || 'tips-a';
    jsonData.callBack = jsonData.callBack || '';
    this.html = tipsHtml(objId, jsonData);
    this.init(objId,jsonData.callBack);
};

tipsObj.prototype = {
//    tips初始化
    init: function (objId,callBack) {
        var _this = this;

        $('body').prepend(this.html);
        _this.obj = $('#' + objId);
        var closeBtn = $(_this.obj).find('.close');
        var confirmBtn = $(_this.obj).find('.confirm');
//        设置容器的居中显示
        setContainerPosition(_this.obj);
        $(_this.obj).css('z-index', 11);
        document.body.addEventListener('touchmove', stopScroll , false);
        setTimeout(function () {
            // $(_this.obj).animate({
                // 'opacity': 0
            // }, 1000, function () {
                $(_this.obj).remove();
                document.body.removeEventListener('touchmove', stopScroll , false);
                if(callBack){
                    callBack();
                }
            // });
        }, 3000);
    }
};

function tipsHtml(objId, jsonData) {
    var html = "";
    var typeStr = 'check-right';
    if (jsonData.type == "info") {
        typeStr = 'notice-up';
    }else if(jsonData.type == "warning"){
        typeStr = 'notice-down'
    }else if(jsonData.type == "danger"){
        typeStr = 'notice-triangle'
    }
    html += "<div class='tips " + jsonData.overClass + "' ui-type='tips' id='" + objId + "'>";
    html += "<div class='tips-content'>";
    html += "<i class='icon-"+ typeStr +"'></i>";
    html += "&nbsp;<span class='tips-info'>" + jsonData.message + "</span></div>";
    html += "</div>";
    return html;
}

/**
 * doraSlider
 * @charset utf-8
 * @extends jquery.1.10.1
 * @fileOverview 焦点轮播图
 * @author 肖燊
 * @version 1.0
 * @date 2016-04-27
 * @example
 * new slider('#demo1',{});
 */

function doraSlider(id,settings){

    var defaultSettings = {
        width: '100%', //容器宽度
        height: '4em', //容器高度
        showFocus : true, // 轮播点是否显示
        during: 5000, //间隔时间
        speed: 200 //滑动速度
    };
    settings = $.extend(true, {}, defaultSettings, settings);

    this.obj = $(id) || {};
    this.width = settings.width ;
    this.height = settings.height;
    this.showFocus = settings.showFocus; // 轮播点是否显示
    this.during = settings.during;
    this.speed = settings.speed;
    this.init();

}


doraSlider.prototype = {

    init : function(){

        var _this = this.obj;
        var _showFocus = this.showFocus;
        var _during = this.during;
        var _speed = this.speed;
        var _slideIndex = 1; // 轮播索引值
        var _imgWidth = $(_this).width();
        var _ulContainer = $(_this).find('ul');
        var _liContainer = $(_this).find('ul li');
        var _imgNum = $(_liContainer).length; // 图片个数
        var _totalImgNum = _imgNum + 2;
        var _imgBoxWidth = _imgWidth * _totalImgNum;
        var _oPosition = {}; //触点位置
        var _startX = 0, _startY = 0; //触摸开始时手势横纵坐标
        var _temPos = - _imgWidth ;
        var _slideTask;

        //容器样式
        $(_this).css({height : this.height});
        //图片容器
        $(_ulContainer).css({
            width : _imgBoxWidth,
            left : -_imgWidth
        });
        //图片展示列表
        $(_liContainer).css({
            width : $(_this).width()
        });

        var _firstObj = $(_this).find('ul li').eq(0);
        var _lastObj = $(_this).find('ul li').eq(_imgNum-1);
        //构造循环对象
        $(_ulContainer).append(_firstObj.clone());
        $(_ulContainer).prepend(_lastObj.clone());

        //添加轮播事件
        if(_imgNum > 1){
            autoMove();
            //添加轮播小点
            addFocus();
        }

        if (isMobile()) {
            if(_imgNum > 1){
                //绑定触摸事件
                bindEvent();
            }
        }

        function bindEvent(){
            _ulContainer.get(0).addEventListener('touchstart', touchStartFunc, false);
            _ulContainer.get(0).addEventListener('touchmove', touchMoveFunc, false);
            _ulContainer.get(0).addEventListener('touchend', touchEndFunc, false);
        }

        function removeBindEvent(){
            _ulContainer.get(0).removeEventListener('touchstart',touchStartFunc, false);
            _ulContainer.get(0).removeEventListener('touchmove',touchMoveFunc, false);
            _ulContainer.get(0).removeEventListener('touchend',touchEndFunc, false);
        }


        function autoMove(){
            clearInterval(_slideTask);
            _slideTask = setInterval(function(){
                _slideIndex = _slideIndex + 1;
                removeBindEvent();
                $(_ulContainer).animate({
                    left : - _slideIndex * _imgWidth
                },_speed,function(){
                    setCurrentPos();
                    bindEvent();
                })
            },_during)
        }

        //重置图片集合的位置
        function setCurrentPos(){
            if(_slideIndex == _totalImgNum - 1){
                $(_ulContainer).css({left : -_imgWidth + 'px'});
                _slideIndex = 1;
            }else if(_slideIndex == 0){
                $(_ulContainer).css({left : -(_totalImgNum - 2) * _imgWidth + 'px'});
                _slideIndex = _totalImgNum - 2;
            }
            //切换轮播小点
            $(_this).find('.focus span').eq(_slideIndex-1).addClass('current').siblings().removeClass('current');
        }

        function addFocus(){
            _this.append('<div class="focus"><div></div></div>');
            var oFocusContainer = $(".focus",_this);
            for (var i = 0; i < _imgNum; i++) {
                $("div", oFocusContainer).append("<span></span>");
            }
            var oFocus = $("span", oFocusContainer);
            oFocus.first().addClass("current");
            oFocusContainer.css({
                display : _showFocus
            })
        }

        //判断是否是移动设备
        function isMobile(){
            if(navigator.userAgent.match(/Android/i) || navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || navigator.userAgent.indexOf('iPad') != -1) {
                return true;
            }
            else {
                return false;
            }
        }

        //获取触点位置
        function touchPos(e){
            var touches = e.changedTouches, l = touches.length, touch, tagX, tagY;
            for (var i = 0; i < l; i++) {
                touch = touches[i];
                tagX = touch.clientX;
                tagY = touch.clientY;
            }
            _oPosition.x = tagX;
            _oPosition.y = tagY;
            return _oPosition;
        }

        //触摸开始
        function touchStartFunc(e){
            touchPos(e);
            _startX = _oPosition.x;
            _startY = _oPosition.y;
            _temPos = _ulContainer.position().left;
        }

        //触摸移动
        function touchMoveFunc(e){
            clearInterval(_slideTask);
            touchPos(e);
            var moveX = _oPosition.x - _startX;
            var moveY = _oPosition.y - _startY;
            if (Math.abs(moveY) < Math.abs(moveX)) {
                e.preventDefault();
                _ulContainer.css({
                    left: _temPos + moveX
                });
            }
        }

        //触摸结束
        function touchEndFunc(e){
            touchPos(e);
            var moveX = _oPosition.x - _startX;
            var moveY = _oPosition.y - _startY;
            if (Math.abs(moveY) < Math.abs(moveX)) {
                if (moveX > 0) {
                    _slideIndex--;
                    if(_slideIndex >= 0){
                        doAnimate(- _slideIndex * _imgWidth, autoMove);
                    }else{
                        doAnimate(0, autoMove);
                    }
                }
                else {
                    _slideIndex++;
                    if (_slideIndex < _totalImgNum && _slideIndex >= 0) {
                        doAnimate( - _slideIndex * _imgWidth, autoMove);
                    }
                    else {
                        _slideIndex = _totalImgNum - 1;
                        doAnimate(-_slideIndex * _imgWidth, autoMove);
                    }
                }
            }
        }


        //动画效果
        function doAnimate(iTarget, fn){
            removeBindEvent();
            _ulContainer.stop().animate({
                left: iTarget
            }, _speed , function(){
                setCurrentPos();
                bindEvent();
                if (fn){
                    fn();
                }
            });
        }

    }

};