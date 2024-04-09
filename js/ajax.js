function ajax(option) {
    let defauldOption = {
        type: 'get',
        async: true,
        data: '',
        error(err) {
            console.log(err);
        }
    }
    let params = Object.assign(defauldOption, option);

    if (!params.url) {
        throw Error('url参数是必填')
    }
    if (Object.prototype.toString.call(params.url) != '[object String]') {
        throw Error('url参数的值 必须是string类型')
    }

    if (!params.success) {
        throw Error('success 回调函数是必填参数');
    }
    if (Object.prototype.toString.call(params.success) != '[object Function]') {
        throw Error('success的值必须是一个函数')
    }
    if (Object.prototype.toString.call(params.type) != '[object String]') {
        throw Error('type 属性的属性值必须是字符串')
    }
    if (!/(get|post)/gi.test(params.type)) {
        throw Error('type 属性只能为 get 或者 post')
    }

    if (Object.prototype.toString.call(params.async) != '[object Boolean]') {
        throw Error('async 属性的值必须为布尔值')
    }

    let dataType = Object.prototype.toString.call(params.data)
    if (dataType != '[object String]' && dataType != '[object Object]') {
        throw Error('data 属性的值必须是string或者Object类型')
    }
    if (dataType == '[object Object]') {
        let arr = []
        for (let key in params.data) {
            arr.push(key + '=' + params.data[key])
        }
        params.data = arr.join('&');
    }

    let xhr = new XMLHttpRequest();
    if (params.type == 'get') {
        if (params.data.indexOf('{') != -1) {
            let data = JSON.parse(params.data);
            let arr = []
            for (let key in data) {
                arr.push(key + '=' + data[key])
            }
            params.data = arr.join('&');
        }
        let url = params.data ? params.url + '?' + params.data : params.url;
        xhr.open(params.type, url, params.async);
        xhr.send()
    } else {
        xhr.open(params.type, params.url, params.async);
        let type = params.data.indexOf('=') != -1 ? 'application/x-www-form-urlencoded' : 'application/json';
        xhr.setRequestHeader('Content-Type', type)
        xhr.send(params.data)
    }



    if (params.async == false) {
        if (/^[23]\d{2}$/.test(xhr.status)) {
            params.success(JSON.parse(xhr.responseText))
        } else {
            params.error(xhr.responseText)
        }
        return
    }

    // ajax请求状态码为4 的时候会触发该事件 xhr.readyState == 4
    // 不管数据接口是正确的还是错误的 只要网络没有问题 ajax的状态始终都会为4
    // http 状态码，xhr.status 为http的状态码 3个数表示
    // 这个状态主要表示数据接口请求是否是成功 或是失败
    // 当xhr.status 值为2 3 开头都表示请求成功
    // 当xhr.status 为4开头的表示前端数据接口路径错误 
    // 当xhr.status 为5开头 表示服务端错误
    xhr.onload = function () {
        if (/^[23]\d{2}$/.test(xhr.status)) {
            params.success(JSON.parse(xhr.responseText))
        } else {
            params.error(xhr.responseText)
        }
    }
}


// 封装一个promise的Ajax请求
// 利用之前的ajax 进行二次封装
function pajax(option) {
    let p = new Promise((resolve, reject) => {
        ajax({
            url: option.url,
            data: option.data || '',
            type: option.type || 'get',
            async: option.async == undefined ? true : option.async,
            success(data) {
                resolve(data);
            },
            error(err) {
                reject(err)
            }
        })
    })

    return p
}