/*!
 * Common Javascript Library
 * Common - v1.0.0 (2014-04-8T14:55:51+0800)
 * https://github.com/NiseJay/WebLib | Released under MIT license
 */


/**
 * console兼容性支持，防止低版本的IE报错
 * @namespace console
 * @static
 * @name console
 * @grammar console
 * @property {function} log
 * @property {function} debug
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} assert
 * @property {function} dir
 * @property {function} dirxml
 * @property {function} group
 * @property {function} groupEnd
 * @property {function} time
 * @property {function} timeEnd
 * @property {function} count
 * @property {function} trace
 * @property {function} profile
 * @property {function} profileEnd
 * @since 2013-04-14
 */
if(!window.console){
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i=0; i<names.length; i++) window.console[names[i]] = function() {};
}

/**
 * 判断一个对象是不是数组
 * @name Array.isArray
 * @function
 * @grammar Array.isArray(vArg)
 * @param {Any} vArg 需要判断的对象
 *
 * @example
 * Array.isArray(myobj);
 *
 * @returns {Boolean} 判断结果
 */
if(!Array.isArray) Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
};

/**
 * 从前往后，查询数组中指定元素的索引位置
 * @name Array.indexOf
 * @function
 * @grammar Array.indexOf(match[, fromIndex])
 * @param {Any} match 查询项
 * @param {Number} [fromIndex] 查询的起始位索引位置，如果为负数，则从Array.length + fromIndex往后开始查找
 * @memberOf Array#
 *
 * @example
 * var myarray = [2,4,9,10,28,10,19];
 * myarray.indexOf(10);
 * @result 3
 *
 * @returns {Number} 指定元素的索引位置，查询不到时返回-1
 */
if(!Array.prototype.indexOf) Array.prototype.indexOf = function(match, fromIndex) {
    var len = this.length;
    fromIndex |= 0;
    if(fromIndex < 0) {  //小于0
        fromIndex = Math.max(0, len + fromIndex)
    }
    for ( ; fromIndex < len; fromIndex++) {
        if(fromIndex in this && this[fromIndex] === match) {
            return fromIndex;
        }
    }
    return -1;
};

/**
 * 从后往前，查询数组中指定元素的索引位置
 * @name Array.lastIndexOf
 * @function
 * @grammar Array.lastIndexOf(match[, fromIndex])
 * @param {Any} match 查询项
 * @param {Number} [fromIndex] 查询的起始位索引位置，如果为负数，则从source.length+fromIndex往前开始查找
 * @memberOf Array#
 *
 * @example
 * var myarray = [2,4,9,10,28,10,19];
 * myarray.lastIndexOf(10);
 * @result 5
 *
 * @returns {Number} 指定元素的索引位置，查询不到时返回-1
 */
if(!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function(match, fromIndex) {
    var len = this.length >>> 0;
    fromIndex |= 0;
    if(!fromIndex || fromIndex >= len) {
        fromIndex = len - 1;
    }
    if(fromIndex < 0){
        fromIndex += len;
    }
    for(; fromIndex >= 0; fromIndex--){
        if(fromIndex in this && this[fromIndex] === match){
            return fromIndex;
        }
    }
    return -1;
};

/**
 * 遍历数组，验证数组中的每一个元素是否符合回调函数指定的规则。如数组中的每一项都符合回调函数指定的规则，则返回true，否则返回false
 * @name Array.every
 * @function
 * @grammar Array.every(fun[, thisP])
 * @param {Function} fun 需要执行的回调函数
 * @param {Any} [thisP] fun函数中this关键字指向的内容
 * @memberOf Array#
 *
 * @example
 * var myarray = [2,4,9,10,28,10,19];
 * myarray.every(function(value, index, obj){
 *   return value > 2;
 * });
 * @result false
 *
 *
 * @returns {Boolean} 数组中的每一项是否符合指定的规则
 */
if (!Array.prototype.every) Array.prototype.every = function(fun, thisP) {
    if (typeof fun != "function") throw new TypeError();
    //使用new Object定义变量t，防止fun对原数组造成破坏
    var t = new Object(this), len = t.length >>> 0;
    for (var i = 0; i < len; i++) {
        if (i in t && !fun.call(thisP, t[i], i, t)) return false;
    }
    return true;
};

/**
 * 遍历数组，把符合回调函数指定规则的元素组成一个新的数组并返回
 * @name Array.filter
 * @function
 * @grammar Array.filter(fun[, thisP])
 * @param {Function} fun 需要执行的回调函数
 * @param {Any} [thisP] fun函数中this关键字指向的内容
 * @memberOf Array#
 *
 * @example
 * var myArray = [2,4,9,10,28,10,19];
 * myArray.filter(function(value, index, obj){
 *   return value > 10;
 * });
 * @result [28,19]
 *
 * @returns {Array} 过滤后的新数组
 */
if (!Array.prototype.filter) Array.prototype.filter = function(fun, thisP) {
    if (typeof fun != "function") throw new TypeError();
    var t = new Object(this), len = t.length >>> 0, res = [];//todo:无符号位右移0 ？？？
    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i]; //todo:为什么另外申请变量
            if (fun.call(thisP, val, i, t)) res.push(val);
        }
    }
    return res;
};

/**
 * 遍历数组，验证数组是否有某项元素符合回调函数指定的规则。如数组中存在符合验证规则的项，则返回true，否则返回false
 * @name Array.some
 * @function
 * @grammar Array.some(fun[, thisP])
 * @param {Function} fun 需要执行的回调函数
 * @param {Any} [thisP] fun函数中this关键字指向的内容
 * @memberOf Array#
 *
 * @example
 * var myArray = [2,4,9,10,28,10,19];
 * myArray.some(function(value, index, obj){
 *   return value < 3;
 * });
 * @result true
 *
 * @returns {Boolean} 数组中是否存在符合规则的项
 */
if (!Array.prototype.some) Array.prototype.some = function(fun, thisP) {
    if (typeof fun != "function") throw new TypeError();
    var t = new Object(this), len = t.length >>> 0;
    for (var i = 0; i < len; i++) {
        if (i in t && fun.call(thisP, t[i], i, t)) return true;
    }
    return false;
};

/**
 * 在数组中的每一个项运行一个函数，并将所有的结果作为数组返回
 * @name Array.map
 * @function
 * @grammar Array.map(fun[, thisP])
 * @param {Function} fun 需要执行的回调函数
 * @param {Any} [thisP] fun函数中this关键字指向的内容
 * @memberOf Array#
 *
 * @example
 * var myArray = [2,4,9,10,28,10,19];
 * myArray.map(function(value, index, obj){
 *   return value + 1;
 * });
 * @result [3,5,10,11,29,11,20]
 *
 * @returns {Array} 遍历后的新数组
 */
if (!Array.prototype.map) Array.prototype.map = function(fun, thisP) {
    if(typeof fun != 'function') throw new TypeError();
    var len = this.length >>> 0, res = new Array(len);
    for(var i = 0; i < len; i++) {
        if(i in this) res[i] = fun.call(thisP, this[i], i, this);
    }
    return res;
};

/**
 * JavaScript Prototype 扩展
 */

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

