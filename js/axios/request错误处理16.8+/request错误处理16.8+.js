import axios from "axios";
import toast from "../util/toast";

const JSON_TYPE = "application/json; charset=utf-8";
const URLENCODED_TYPE = "application/x-www-form-urlencoded; charset=utf-8";

// 请求的默认配置
const axiosDefaultConfig = {
  baseURL: "/api",
  headers: {
    "content-type": URLENCODED_TYPE,
  },
  timeout: 30000,
  // withCredentials: false
};

// Map Set

class Request {
  constructor(axiosDefaultConfig) {
    // 创建一个axios实例对象
    this.axiosInstance = axios.create(axiosDefaultConfig);

    // 添加拦截
    this.addRequestInterceptor();
    this.addResponseInterceptor();

    // 创建取消请求的容器
    this.map = new Map(); // {}

    this.showCover = 0;
  }

  // 添加请求的拦截
  addRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      // 请求成功的拦截
      (config) => {
        // 序列化post/put/patch请求参数
        if (
          config.data &&
          config.headers.get("Content-Type") === URLENCODED_TYPE
        ) {
          let qs = "";
          Object.entries(config.data).forEach(([key, value], index) => {
            qs +=
              (index === 0 ? "" : "&") +
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(value);
          });
          config.data = qs;
        }

        // 配置token
        if (!config.withoutToken) {
          const token = localStorage.getItem("token");
          token && config.headers.set("Authorization", token);
        }

        // 设置取消请求
        // config.signal
        // config.cancelToken

        // 判断这个请求是否发送过
        const requestKey = [config.method, config.url].join("_");
        const oldCancelMap = this.map.get(requestKey);
        if (oldCancelMap) {
          //该请求发送过
          // 取消上一次的请求
          oldCancelMap.controlller.abort();
          oldCancelMap.source.cancel();
        }

        // 1.构建signal和cancelToken
        const cancelMap = {
          controlller: new AbortController(),
          source: axios.CancelToken.source(),
        };

        // 保存在map中
        this.map.set(requestKey, cancelMap);

        // 2.配置请求的signal和cancelToken
        config.signal = cancelMap.controlller.signal;
        config.cancelToken = cancelMap.source.token;

        return config;
      },
      // 请求失败的拦截
      (error) => {
        console.log(error);
      }
    );
  }

  // 添加响应的拦截
  addResponseInterceptor() {
    // 响应的拦截
    this.axiosInstance.interceptors.response.use(
      // 成功的拦截
      (response) => {
        // console.log('成功的拦截：', response);

        // 请求已经成功了，将请求从map中移除掉
        const requestKey = [response.config.method, response.config.url].join(
          "_"
        );
        this.map.delete(requestKey);

        return [null, response];
      },
      // 失败的拦截
      (error) => {
        console.log(1);

        // 失败的原因：

        // 原因1:重复请求，取消了上一次的请求
        // 请求已经失败了，将请求从map中移除掉
        if (error.code === "ERR_CANCELED") {
          const requestKey = [error.config.method, error.config.url].join("_");
          this.map.delete(requestKey);
          return [error, null];
        }

        // 原因2:发送请求出去时，失败了，请求根本没发送
        if (!error.request) {
          console.log("发送请求出去时，失败了");
          toast("error", "出错了，请联系管理员");
          return [error, null];
        }

        // 原因3:发送请求出去了，服务器没有响应
        if (!error.response) {
          console.log("发送请求出去了，服务器没有响应");
          toast("error", "网络错误");
          return [error, null];
        }

        // 原因4:发送请求出去了，服务器也响应了，可是是失败的响应
        console.log("服务器也响应了，可是是失败的响应");
        switch (error.response.status) {
          case 401:
            toast("error", "请先登录");
            break;
          case 403:
            toast("error", "未授权");
            break;
          case 404:
            toast("error", "资源不存在");
            break;
          //。。。。。。
          default:
            toast("error", "服务器错误");
            break;
        }
        return [error, null];
      }
    );
  }

  //返回值的格式：[error, response]
  get(url, data = {}, config = {}) {
    return this.axiosInstance.request({
      method: "GET",
      url,
      params: data,
      ...config,
    });
  }

  //返回值的格式：[error, response]
  post(url, data = {}, config = {}) {
    return this.axiosInstance.request({
      method: "POST",
      url,
      data: data,
      ...config,
    });
  }

  //返回值的格式：[error, response]
  put(url, data = {}, config = {}) {
    return this.axiosInstance.request({
      method: "PUT",
      url,
      data: data,
      ...config,
    });
  }

  //返回值的格式：[error, response]
  patch(url, data = {}, config = {}) {
    return this.axiosInstance.request({
      method: "PUT",
      url,
      data: data,
      ...config,
    });
  }

  //返回值的格式：[error, response]
  delete(url, data = {}, config = {}) {
    return this.axiosInstance.request({
      method: "PUT",
      url,
      params: data,
      ...config,
    });
  }

  // 提供了axios的head和options方法，没有做任何事情。
  head(url, config) {
    return this.axiosInstance.head(url, config);
  }
  options(url, config) {
    return this.axiosInstance.head(url, config);
  }
}

const request = new Request(axiosDefaultConfig);

export default request;
