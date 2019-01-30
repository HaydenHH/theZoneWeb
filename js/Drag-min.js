var funDrag = function (element, callback) {
    callback = callback || function () {};
    elementMove = document.getElementById('show_title')
    var params = {
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false
    };
    //获取相关CSS属性
    var getCss = function (o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    };

    //拖拽的实现
    if (getCss(elementMove, "left") !== "auto") {
        params.left = getCss(elementMove, "left");
    }
    if (getCss(elementMove, "top") !== "auto") {
        params.top = getCss(elementMove, "top");
    }
    //o是移动对象
    elementMove.onmousedown = function (event) {
        params.flag = true;
        event = event || window.event;
        params.currentX = event.clientX;
        params.currentY = event.clientY;
    };
    document.onmouseup = function () {
        params.flag = false;
        if (getCss(element, "left") !== "auto") {
            params.left = getCss(element, "left");
        }
        if (getCss(element, "top") !== "auto") {
            params.top = getCss(element, "top");
        }
        callback();
    };
    document.onmousemove = function (event) {
        event = event || window.event;
        if (params.flag) {
            var nowX = event.clientX,
                nowY = event.clientY;
            var disX = nowX - params.currentX,
                disY = nowY - params.currentY;
            element.style.left = parseInt(params.left) + disX + "px";
            element.style.top = parseInt(params.top) + disY + "px";
        }
    }
};