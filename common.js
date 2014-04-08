/*!
 * Common   常用Javascript函数库
 * Author   nisejay@163.com
 * License  www.nbcoders.com
 */

var Common = {

    //原生JavaScript实现字符串长度截取
    cutstr: function (str, len) {
        var temp;
        var icount = 0;
        var patrn = /[^\x00-\xff]/;
        var strre = "";
        for (var i = 0; i < str.length; i++) {
            if (icount < len - 1) {
                temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                    icount = icount + 1
                } else {
                    icount = icount + 2
                }
                strre += temp
            } else {
                break
            }
        }
        return strre + "..."
    },

    //获取域名主机
    getHost: function (url) {
        var host = "null";
        if (typeof url == "undefined" || null == url) {
            url = window.location.href;
        }
        var regex = /^\w+\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        if (typeof match != "undefined" && null != match) {
            host = match[1];
        }
        return host;
    },

    //是否为数字类型
    isDigit: function (value) {
        return /^[0-9]*$/.test(value);
    },

    //设置cookie值
    setCookie: function (name, value, hours) {
        var date = new Date();
        date.setTime(date.getTime() + hours*60*60*1000);
        document.cookie = name+"="+value+"; expires="+date.toGMTString()+"; domain="+domain+"; path=/";
    },

    //获取cookie值
    getCookie:function(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' '){
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0){
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },

    //清除Cookie
    clearCookie: function (name) {
        var date = new Date();
        date.setTime(date.getTime() - 360*24*60*60*1000);
        document.cookie = name+"=; expires="+date.toGMTString()+"; path=/";
    },

    //加入收藏夹
    AddFavorite:function(sURL, sTitle) {
        try {
            window.external.addFavorite(sURL, sTitle)
        } catch(e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "")
            } catch(e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加")
            }
        }
    },
    //设为首页
    setHomepage:function(url){
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url)
        } else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch(e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', url)
        }
    },

    //判断是否IE6
    isIe6:function(){
        var ua = navigator.userAgent.toLowerCase();
        var isIE6 = ua.indexOf("msie 6") > -1;
        if (isIE6) {
            try {
                document.execCommand("BackgroundImageCache", false, true)
            } catch(e) {}
        }
        return isIE6;
    },

    //导入样式
    LoadStyle:function(url){
        try {
            document.createStyleSheet(url)
        } catch(e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(cssLink)
        }
    }
}

//JavaScript Prototype 功能扩展

//String

//清除空格
String.prototype.trim = function () {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1")
}

//替换全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
}

//转义html标签
String.prototype.htmlEncode = function () {
    return this.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
}

//Date

//时间日期格式转换
Date.prototype.format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
}