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
if (!window.console) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; i++) window.console[names[i]] = function () {
    };
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
if (!Array.isArray) Array.isArray = function (vArg) {
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
if (!Array.prototype.indexOf) Array.prototype.indexOf = function (match, fromIndex) {
    var len = this.length;
    fromIndex |= 0;
    if (fromIndex < 0) {  //小于0
        fromIndex = Math.max(0, len + fromIndex)
    }
    for (; fromIndex < len; fromIndex++) {
        if (fromIndex in this && this[fromIndex] === match) {
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
if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function (match, fromIndex) {
    var len = this.length >>> 0;
    fromIndex |= 0;
    if (!fromIndex || fromIndex >= len) {
        fromIndex = len - 1;
    }
    if (fromIndex < 0) {
        fromIndex += len;
    }
    for (; fromIndex >= 0; fromIndex--) {
        if (fromIndex in this && this[fromIndex] === match) {
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
if (!Array.prototype.every) Array.prototype.every = function (fun, thisP) {
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
if (!Array.prototype.filter) Array.prototype.filter = function (fun, thisP) {
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
if (!Array.prototype.some) Array.prototype.some = function (fun, thisP) {
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
if (!Array.prototype.map) Array.prototype.map = function (fun, thisP) {
    if (typeof fun != 'function') throw new TypeError();
    var len = this.length >>> 0, res = new Array(len);
    for (var i = 0; i < len; i++) {
        if (i in this) res[i] = fun.call(thisP, this[i], i, this);
    }
    return res;
};

/**
 * 对数组中的所有元素调用指定的回调函数。该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
 * @name Array.reduce
 * @function
 * @grammar Array.reduce(accumulator[, thisP])
 * @param {Function} accumulator 需要执行的回调函数
 *
 *  @example
 *  var myArray = [1,4,5,63,6];
 *  myArray.reduce(function(result, value, index, obj){
 *      return result + value;
 *  });
 *
 * @result 79
 *
 * @returns {Boolean} 通过运算后的累计结果
 */
if (!Array.prototype.reduce) Array.prototype.reduce = function reduce(accumulator) {
    if (this === null || this === undefined) throw new TypeError("Object is null or undefined");
    var i = 0, l = this.length >> 0, curr;
    if (typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
        throw new TypeError("First argument is not callable");
    if (arguments.length < 2) {
        if (l === 0) throw new TypeError("Array length is 0 and no second argument");
        curr = this[0];
        i = 1; // start accumulating at the second element
    } else {
        curr = arguments[1];
    }
    while (i < l) {
        if (i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
        ++i;
    }
    return curr;
};

/**
 * 按降序顺序对数组中的所有元素调用指定的回调函数。该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。
 * @name Array.reduceRight
 * @function
 * @grammar Array.reduceRight(accumulator[, thisP])
 * @param {Function} accumulator 需要执行的回调函数
 *
 * @returns {Boolean} 通过运算后的累计结果
 */
if (!Array.prototype.reduceRight) Array.prototype.reduceRight = function (callbackfn, initialValue) {
    if (this == null) throw new TypeError();
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof callbackfn != "function") throw new TypeError(); // no value to return if no initial value, empty array
    if (len === 0 && arguments.length === 1) throw new TypeError();
    var k = len - 1;
    var accumulator;
    if (arguments.length >= 2) {
        accumulator = arguments[1];
    } else {
        do {
            if (k in this) {
                accumulator = this[k--];
                break;
            } // if array contains no values, no initial value to return
            if (--k < 0) throw new TypeError();
        } while (true);
    }
    while (k >= 0) {
        if (k in t) accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
        k--;
    }
    return accumulator;
};


/**
 * 返回所有用户自定义的属性
 * @name Object.keys
 * @function
 * @grammar Object.keys(obj)
 * @param {Object|Function} obj 需要检测的对象
 *
 * @returns {Array} 自定义属性组成的数组
 */
if (!Object.keys) Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [ 'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor' ],
        dontEnumsLength = dontEnums.length;
    return function (obj) {
        if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null)
            throw new TypeError('Object.keys called on non-object');
        var result = [];
        for (var prop in obj) {
            if (hasOwnProperty.call(obj, prop)) result.push(prop);
        }
        if (hasDontEnumBug) {
            for (var i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
            }
        }
        return result;
    }
})();

/**
 * 向指定日期添加“年”
 * @name Date.addYears
 * @function
 * @type Date
 * @grammar Date.addYears(num)
 * @param {Number} num 添加的年数
 * @memberOf Date#

 * @example
 * var dtm = new Date("01/12/2008");
 * dtm.addYears(1);
 * dtm.toString();
 * @result Mon Jan 12 2009 00:00:00
 *
 * @returns {Date} 添加年数后的日期
 */
if (!Date.prototype.addYears) Date.prototype.addYears = function (num) {
    this.setFullYear(this.getFullYear() + num);
    return this;
};

/**
 * 向指定日期添加“月”
 * @name Date.addMonths
 * @function
 * @type Date
 * @grammar Date.addMonths(num)
 * @param {Number} num 添加的月数
 * @memberOf Date#
 *
 * @example var dtm = new Date("01/12/2008");
 * dtm.addMonths(1);
 * dtm.toString();
 * @result Tue Feb 12 2008 00:00:00
 *
 * @returns {Date} 添加月数后的日期
 */
if (!Date.prototype.addMonths) Date.prototype.addMonths = function (num) {
//    var tmpdtm = this.getDate();
    this.setMonth(this.getMonth() + num);
//    if (tmpdtm > this.getDate()) this.addDays(-this.getDate());//TODO:此行没必要
    return this;
};

/**
 * 向指定日期添加“日”
 * @name Date.addDays
 * @function
 * @type Date
 * @grammar Date.addDays(num)
 * @param {Number} num 添加的日数
 * @memberOf Date#
 *
 * @example var dtm = new Date("01/12/2008");
 * dtm.addDays(1);
 * dtm.toString();
 * @result Sun Jan 13 2008 00:00:00
 *
 * @returns {Date} 添加日数后的日期
 */
if (!Date.prototype.addDays) Date.prototype.addDays = function (num) {
    this.setTime(this.getTime() + (num * 86400000));
    return this;
};

/**
 * 向指定日期添加“小时”
 * @name Date.addHours
 * @function
 * @type Date
 * @grammar Date.addHours(num)
 * @param {Number} num 添加的小时数
 * @memberOf Date#
 *
 * @example var dtm = new Date("01/12/2008");
 * dtm.addHours(1);
 * dtm.toString();
 * @result Sun Jan 13 2008 00:00:00
 *
 * @returns {Date} 添加小时数后的日期
 */
if (!Date.prototype.addHours) Date.prototype.addHours = function (num) {
    this.setHours(this.getHours() + num);
    return this;
};

/**
 * 向指定日期添加“分钟”
 * @name Date.addMinutes
 * @function
 * @type Date
 * @grammar Date.addMinutes(num)
 * @param {Number} num 添加的分钟数
 * @memberOf Date#
 *
 * @example var dtm = new Date("01/12/2008");
 * dtm.addMinutes(1);
 * dtm.toString();
 * @result Sat Jan 12 2008 01:00:00
 *
 * @returns {Date} 添加分钟数后的日期
 */
if (!Date.prototype.addMinutes) Date.prototype.addMinutes = function (num) {
    this.setMinutes(this.getMinutes() + num);
    return this;
};

/**
 * 向指定日期添加“秒”
 * @name Date.addSeconds
 * @function
 * @type Date
 * @grammar Date.addSeconds(num)
 * @param {Number} num 添加的秒数
 * @memberOf Date#
 *
 * @example var dtm = new Date("01/12/2008");
 * dtm.addSeconds(60);
 * dtm.toString();
 * @result Sat Jan 12 2008 00:01:00
 *
 * @returns {Date} 添加秒数后的日期
 */
if (!Date.prototype.addSeconds) Date.prototype.addSeconds = function (num) {
    this.setSeconds(this.getSeconds() + num);
    return this;
};

/**
 * 对目标日期对象进行格式化
 * @name Date.format
 * @function
 * @type Date
 * @grammar Date.format(pattern)
 * @param {string} pattern 日期格式化规则
 * @remark
 *
 格式表达式，变量含义：
 hh: 带 0 补齐的两位 12 进制时表示
 h: 不带 0 补齐的 12 进制时表示
 HH: 带 0 补齐的两位 24 进制时表示
 H: 不带 0 补齐的 24 进制时表示
 mm: 带 0 补齐两位分表示
 m: 不带 0 补齐分表示
 ss: 带 0 补齐两位秒表示
 s: 不带 0 补齐秒表示
 yyyy: 带 0 补齐的四位年表示
 yy: 带 0 补齐的两位年表示
 MM: 带 0 补齐的两位月表示
 M: 不带 0 补齐的月表示
 dd: 带 0 补齐的两位日表示
 d: 不带 0 补齐的日表示
 * @memberOf Date#
 *
 * @returns {string} 格式化后的字符串
 */
if (!Date.prototype.format) Date.prototype.format = function (pattern) {
    pattern = pattern || "yyyy-MM-dd HH:mm:ss";
    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }

    var _zeroPad = function (num, digit) {
            var s = '0' + num;
            return s.substring(s.length - digit)
            //return ('0'+num).substring(-2); // doesn't work on IE :(
        },
        year = this.getFullYear(),
        month = this.getMonth() + 1,
        date2 = this.getDate(),
        hours = this.getHours(),
        minutes = this.getMinutes(),
        seconds = this.getSeconds();
    replacer(/yyyy/g, _zeroPad(year, 4));
    replacer(/yy/g, _zeroPad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, _zeroPad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, _zeroPad(date2, 2));
    replacer(/d/g, date2);
    replacer(/HH/g, _zeroPad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, _zeroPad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, _zeroPad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, _zeroPad(seconds, 2));
    replacer(/s/g, seconds);
    return pattern;
};

/**
 * 去掉字符串两端的空格
 * @name String.trim
 * @function
 * @type String
 * @grammar String.trim()
 * @memberOf String#
 *
 * @returns {String} 去掉两侧空格后的字符串
 */
if (!String.prototype.trim) String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};

/**
 * 去掉字符串左面的空格
 * @name String.trimLeft
 * @function
 * @type String
 * @grammar String.trimLeft()
 * @memberOf String#
 *
 * @returns {String} 去掉左侧空格后的字符串
 */
if (!String.prototype.trimLeft) String.prototype.trimLeft = function () {
    return this.replace(/^\s+$/g, '');
};

/**
 * 去掉字符串右面的空格
 * @name String.trimRight
 * @function
 * @type String
 * @grammar String.trimRight()
 * @memberOf String#
 *
 * @returns {String} 去掉右侧空格后的字符串
 */
if (!String.prototype.trimRight) String.prototype.trimRight = function () {
    return this.replace(/\s+$$/g, '');
};


/**
 * NB 常用Javascript函数库
 * @Author  nisejay@163.com
 * License www.nbcoders.com
 */

var NB = {};

/**
 * 引入命名空间
 * @name LT.Namespace
 * @function
 * @grammar LT.Namespace(param1[,param2,param3...])
 * @param {String} param 要引入的命名空间名称，多个以逗号分割
 *
 * @example LT.Namespace("LT.Message");
 * //为LT引入Message命名空间，其中LT.还可以省略，若没有LT，会自动添加到LT上
 * @example LT.Namespace("Message");
 * //上一示例的简写
 *
 * @returns {Object} 返回命名空间对象
 */
NB.Namespace = function () {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i++) {
        d = a[ i ].split('.');
        o = NB;
        for (j = ( d[0] == 'LT' ) ? 1 : 0; j < d.length; j++) {
            o[ d[ j ] ] = o[ d[ j ] ] || {};
            o = o[ d[ j ] ];
        }
    }
    return o;
};

/**
 * 环境变量
 * @namespace Env
 * @name NB.Env
 */
NB.Env = {
    /**
     * 根域名：nbcoders.com
     * @name NB.Env.domain
     * @constant
     */
    domain: 'nbcoders.com',
    /**
     * 静态s域前缀：http://s.nbcoders.com/，用于引用静态文件version.js及jQuery.js
     * @name NB.Env.staticRoot
     * @constant
     */
    staticRoot: 'http://s.nbcoders.com/',
    /**
     * 静态pic域前缀：http://pic.nbcoders.com/images/，用于引用网站图片
     * @name NB.Env.picRoot
     * @constant
     */
    picRoot: 'http://pic.nbcoders.com/images/',
    /**
     * 静态css域前缀：http://css.nbcoders.com/css/，用于引用网站样式表
     * @name NB.Env.cssRoot
     * @constant
     */
    cssRoot: 'http://css.nbcoders.com/css/',
    /**
     * 静态js域前缀：http://js.nbcoders.com/js/，用于引用网站js文件
     * @name NB.Env.jsRoot
     * @constant
     */
    jsRoot: 'http://js.nbcoders.com/js/',
    /**
     * www域前缀：http://www.nbcoders.com/
     * @name NB.Env.wwwRoot
     * @constant
     */
    wwwRoot: 'http://www.nbcoders.com/'
};

/**
 * 校验类型与格式
 * @namespace Verify
 * @name NB.Verify
 */
NB.Verify = {
    /**
     * 校验电话号码
     * @name NB.Verify.isTel
     * @constant
     */
    isTel: function (str) {
        return /(^(\d{3,5}-)?\d{7,8})$|(^13[0-9]{9}$)|(^((\+)?\d{2,5}-)(\d{3,5}-)\d{7,8})$/.test(str);
    },
    /**
     * 校验手机号码
     * @name NB.Verify.isPhone
     * @constant
     */
    isPhone: function (str) {
        return /^0{0,1}(13[0-9]|145|147|15[0-3]|15[5-9]|18[0-9])[0-9]{8}$/.test(str);
    },
    /**
     * 校验电子邮箱格式
     * @name NB.Verify.isEmail
     * @constant
     */
    isEmail: function (str) {
        //return /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(str);
        return /[\u4e00-\u9fa5\w]+((-w+)|(\.[\u4e00-\u9fa5\w]+))*\@[\u4e00-\u9fa5A-Za-z0-9]+((\.|-)[\u4e00-\u9fa5A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(str);
    },
    /**
     * 校验邮编
     * @name NB.Verify.isPost
     * @constant
     */
    isPost: function (str) {
        return /\d{6}/.test(str);
    },
    /**
     * 校验身份证号码
     * @name NB.Verify.isIdCardNo
     * @constant
     */
    isIdCardNo: function (str) {
        return /^\d{17}[\d|x]$|^\d{15}$/.test(str);
    },
    /**
     * 校验身份证号码(严格校验地区码，出生日期，校验码等信息)
     * @name NB.Verify.isPost
     * @constant
     */
    isIdCardNoStrict: function (str) {
        return /^\d{17}[\d|x]$|^\d{15}$/.test(str);
    },
    /**
     * 校验IP地址格式
     * @name NB.Verify.isIp
     * @constant
     */
    isIp: function (str) {
        return /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)$)/.test(str);
    },
};

NB.Common = {

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
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        document.cookie = name + "=" + value + "; expires=" + date.toGMTString() + "; domain=" + domain + "; path=/";
    },

    //获取cookie值
    getCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    },

    //清除Cookie
    clearCookie: function (name) {
        var date = new Date();
        date.setTime(date.getTime() - 360 * 24 * 60 * 60 * 1000);
        document.cookie = name + "=; expires=" + date.toGMTString() + "; path=/";
    },

    //加入收藏夹
    AddFavorite: function (sURL, sTitle) {
        try {
            window.external.addFavorite(sURL, sTitle)
        } catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "")
            } catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加")
            }
        }
    },

    //设为首页
    setHomepage: function (url) {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url)
        } else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch (e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', url)
        }
    },

    //判断是否IE6
    isIe6: function () {
        var ua = navigator.userAgent.toLowerCase();
        var isIE6 = ua.indexOf("msie 6") > -1;
        if (isIE6) {
            try {
                document.execCommand("BackgroundImageCache", false, true)
            } catch (e) {
            }
        }
        return isIE6;
    },

    //导入样式
    LoadStyle: function (url) {
        try {
            document.createStyleSheet(url)
        } catch (e) {
            var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = url;
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(cssLink)
        }
    }
};

