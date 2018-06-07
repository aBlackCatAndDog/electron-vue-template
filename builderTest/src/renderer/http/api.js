// 二次封装 axios ,拦截器等

import axios from "axios";
import config from "./config"; // 引入默认配置
import qs from "qs"; // 序列化请求数据，视服务端的要求

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    // 创建 axios 实例
    let cancel;
    let promiseArr = {};
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      withCredentials: true, // 设置 withCredentials 使请求带上 'cookies'
      cancelToken: new axios.CancelToken(function(c) {
        cancel = c; // 记录当前请求的取消方法
      }),
      transformResponse: [function(data) {}]
    });

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        // Tip1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

        // Tip2
        // 带上 token ,可以结合 vuex 或者 localStorage
        // if(store.getters.token){
        // config.headers["X-token"] = getToken();
        // } else {
        // 重定向到登录页面
        // }

        // Tip3 每次发起请求前取消掉在进行中的相同请求(后期测试是否会取消掉定时器发送的请求)
        if (promiseArr[config.url]) {
          promiseArr[config.url]("操作取消");
          promiseArr[config.url] = cancel;
        } else {
          promiseArr[config.url] = cancel;
        }
        // Tip4
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (
          config.method.toLocaleLowerCase === "post" ||
          config.method.toLocaleLowerCase === "put" ||
          config.method.toLocaleLowerCase === "delete"
        ) {
          config.data = qs.stringify(config.data);
        }
        return config;
      },
      error => {
        // 请求错误时做的处理(接口错误、超时等)
        // Tip5
        // 关闭 loading
        console.log("request:", error);

        // 1.判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          console.log(
            "根据设置的timeout/真的请求超时 判断请求现在超时了，可以在此加入超时的处理方案"
          );
          // return service.request(originalRequest); // 例如再重复请求一次
        }

        // 2.需要重定向到错误页面
        const errorInfo = err.response;
        console.log(errorInfo);
        if (errorInfo) {
          // error = errorInfo.data // 页面那边 catch 的时候就能拿到详细的错误信息，看最下边的 Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          });
        }
        return Promise.reject(error); // 在调用那边可以拿到(catch)想返回的错误信息
      }
    );

    // reponse 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9 时 response.data 是 undefined ,因此需要使用 response.request.responseText(Stringify 后的字符串)
        if (response.data == undefined) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }

        // 根据返回的 code 值来做不同的处理 (和后端约定)
        switch (data.code) {
          case "":
            break;
          default:
            break;
        }
        // 若不是正确的返回 code，且已经登录，就抛出错误
        // const err = new Error(data.description)

        // err.data = data;
        // err.reponse = response

        // throw err
        return data;
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权，请登录";
              break;
            case 403:
              err.message = "拒绝访问";
              break;
            case 404:
              err.message = `请求地址错误:${err.response.config.url}`;
              break;
            case 408:
              err.message = "请求超时";
              break;
            case 500:
              err.message = "服务器内部错误";
              break;
            case 501:
              err.message = "服务未实现";
              break;
            case 502:
              err.message = "网关错误";
              break;
            case 503:
              err.message = "服务不可用";
              break;
            case 504:
              err.message = "网关超时";
              break;
            case 505:
              err.message = "HTTP版本不受支持";
              break;
            default:
              break;
          }
        }
        console.error(err);
        // 此处使用的是 Element UI 的提示组件
        // Message.error(`Error: ${err}`);
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );

    // 请求处理
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
}
