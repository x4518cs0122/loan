import axios from 'axios'
import qs from 'qs'
import { getToken } from './utils'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://47.93.43.106:8090'

axios.interceptors.request.use(function(config) {
    config.headers['token'] = getToken();
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function userLogin(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}