import axios from 'axios'
import qs from 'qs'
import {getToken, getUserId, setToken} from '@/utils/userPassport.js'

// axios.defaults.baseURL = '/api'

let axiosIns = axios.create({});

axiosIns.defaults.baseURL = 'http://116.62.148.24:8080/loan'


axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.transformRequest = [function (data) {
    //数据序列化
        return qs.stringify(data);
    }
];

axiosIns.interceptors.request.use(function (config) {
    //配置config
    // config.headers.Accept = 'application/json';
    config.headers['token'] = getToken();
    config.headers['userId'] = getUserId();
    return config;
});

axiosIns.interceptors.response.use(function (response) {
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach((method)=> {
    api[method] = (uri, data, config) =>{
        return new Promise((resolve, reject) =>{
            axiosIns[method](uri, data, config).then((response)=> {
                /**登陆后设置token */
                if(response.headers.token){
                    setToken(response.headers.token)
                }
                resolve(response.data);
            }).catch((response)=> {
                alert('something wrong'+response.status);
            })
        })
    }
});

export default api;