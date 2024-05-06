
/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
    let time = null
    return function(...args) {
        if(time) clearTimeout(time)
        time = setTimeout(fn,t,...args)
    }
};

/*
    作用：对默认时间对象进行格式化
    参数：
        一个时间对象
        时间格式的 类型
    返回值：
        格式化的时间对象
*/

function formatTime(date, type) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m

    var d = date.getDate();
    d = d < 10 ? '0' + d : d

    var h = date.getHours();
    h = h < 10 ? '0' + h : h

    var f = date.getMinutes();
    f = f < 10 ? '0' + f : f

    var s = date.getSeconds();
    s = s < 10 ? '0' + s : s

    var day = date.getDay();
    var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    if (type == 'cn') {
        return `${y}年${m}月${d}日 ${h}:${f}:${s} ${week[day]}`
    }
    return `${y}${type}${m}${type}${d} ${h}:${f}:${s} ${week[day]}`
}

/* 
    作用：求任意两个时间对象的时间差
    参数:两个时间对象
        date1
        date2
    返回值：
        把求得时间差天数 小时 分钟 秒数 以对象 当成返回值返回      
*/
function timeDifference(date1, date2) {
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    var time = Math.abs(time1 - time2);


    var d = parseInt(time / 1000 / 60 / 60 / 24); // 求天数
    var h = parseInt((time / 1000 / 60 / 60) % 24); // 求不足1天的小时数
    var f = parseInt((time / 1000 / 60) % 60);  // 求得不足1小时的分钟数
    var m = parseInt((time / 1000) % 60); // 求不足一分钟的秒数
    // return 后面只能返回一个值
    // 怎么才能把d h f m 一起返回
    // 可以 把 d h f m 存入数组中 [d,h,f,m] 得到数据之后不知道数字对应单位的是什么
    // return [d, h, f, m]

    // 也可以把数据存在对象中 把对象返回
    return {
        day: d < 10 ? '0' + d : d,
        hours: h < 10 ? '0' + h : h,
        minutes: f < 10 ? '0' + f : f,
        seconds: m < 10 ? '0' + m : m
    }
}


/* 
    作用：用来获取样式
    参数：
        ele:dom元素对象
        css属性是可变
    返回值：把获取到属性的属性值返回
*/
function getStyle(ele, attr) {
    // 在操作对象
    // 对象.属性
    // 对象['属性'|变量]
    if (window.getComputedStyle) {
        var value = window.getComputedStyle(ele)[attr]
    } else {
        var value = ele.currentStyle[attr];
    }
    return value;
}

/* 
    作用：实现事件监听的兼容写法
    参数：
        ele 事件源：每一次绑定事件的事件源都不一样
        type 事件类型 
        callback 事件处理函数：每一次触发事件之后执行代码都不一样，所以事件处理函数中代码不能写死
    返回值：触发事件之后 实现某一个功能而已 不需要返回值
*/

function addEvent(ele, type, callback) {
    if (window.addEventListener) {
        ele.addEventListener(type, callback)
    } else {
        ele.attachEvent('on' + type, callback)
    }
}

/* 
    封装一个给元素添加样式的函数：
*/
function setStyle(ele, obj) {
    for (let key in obj) {
        ele.style[key] = obj[key];
    }
}

function strToObj(url) {
    let arr = url.substr(url.indexOf('?') + 1).split('&');
    let obj = {};
    arr.forEach(item => {
        obj[item.split('=')[0]] = item.split('=')[1]
    })
    return obj
}

function objToStr(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push(key + '=' + obj[key]);

    }
    let res = arr.join('&')
    return res
}

// 动画函数
function animation(ele, option, callback) {
    let moveIndex = 0;
    for (let key in option) {
        moveIndex++;
        let move = function () {
            let style = parseInt(getStyle(ele, key));
            let speed = (option[key] - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;

            ele.style[key] = style + 'px';
            if (style == option[key]) {
                moveIndex--;
                if (moveIndex == 0) callback && callback();

                cancelAnimationFrame(ele[key + 'timer']);
                return
            }
            ele[key + 'timer'] = requestAnimationFrame(move)
        }
        cancelAnimationFrame(ele[key + 'timer']);
        ele[key + 'timer'] = requestAnimationFrame(move);
    }
}

// 给数组的原型对象中添加一个方法 这个放用于对数组去重
Array.prototype.norepeat = function () {
    let s = new Set(this);
    return [...s]
}
Object.defineProperty(Array.prototype, 'norepeat', {
    enumerable: false
})

// 移除元素的类名
NodeList.prototype.removeClass = function (name) {
    this.forEach(item => {
        item.classList.remove(name)
    })
}

function setCookie(key, value, expires) {
    if (!expires) {
        document.cookie = `${key}=${value};`;
        return
    }
    let date = new Date();
    let time = date.getTime() - 8 * 60 * 60 * 1000 + expires * 60 * 1000;
    date.setTime(time);
    document.cookie = `${key}=${value};expires=${date}`;
}

function deleteCookie(key) {
    let date = new Date();
    let time = date.getTime() - 8 * 60 * 60 * 1000 - 1;
    date.setTime(time);
    document.cookie = `${key}='';expires=${date}`;
}

function getCookie(key) {
    let cookie = document.cookie;
    let res = cookie.split('; ');
    let obj = {};
    res.forEach(item => {
        let s = item.split('=');
        obj[s[0]] = s[1];
    })

    if (key) {
        return obj[key]
    }
    return obj;
}