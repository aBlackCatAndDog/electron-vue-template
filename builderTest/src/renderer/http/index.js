// 将 axios 封装成插件
// example this.$api.接口名（｛请求参数｝）.then（successCallback）.catch（failedCallback）

// 导入所有接口
import apiList from './interface';

const install = Vue => {
    if(install.installed)
        return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 此处挂载在 Vue 原型的 $api 对象上
        $api:{
            get(){
                return apiList;
            }
        }
    })
}

export default install;