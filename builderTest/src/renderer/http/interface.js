// 请求接口文件

import axios from './api'; // 引入 api

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
*/
// 单独导出
export const query = params => {
    return axios({
        url: '/query',
        method: 'get',
        params
    })
}

export const mock = params => {
    return axios({
        url: '/mock',
        method: 'get',
        params
    })
}

export const upload = data => {
    return axios({
        url: '/upload',
        method: 'post',
        data
    })
}

// 默认全部倒出
// 根绝需要进行  
export default {
    query,
    mock,
    upload
}