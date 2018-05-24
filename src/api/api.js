import {get, post, userLogin } from 'common/js/axios'
import store from '../store'

//通知api
export function getNotice() {
    const url = "/notice"
    return get(url)
}
//tab选项：待办
export function getTodo() {
    const url = "/todos"
    return get(url)
}

//面谈api接口
export function getInterview() {
    const id = store.getters.userId
    const url = `/task/m/view/${id}`
    console.log(url)
    return get(url)
}

export function postAdvice(advice, taskId) {
    const url = 'view/save'
    let data = {}
    data.advice = JSON.stringify(advice)
    data.taskId = taskId
    data.employeeId = store.getters.userId
    console.log(data)
    return post(url, data)
}
//面签api接口
export function getSignList() {
    const url = '/signList'
    return get(url)
}

export function getSignDetail() {
    const url = '/signDetail'
    return get(url)
}

export function getEvaluate() {
    const url = '/getEvaluate'
    return get(url)
}

export function getApprove() {
    const url = '/getApprove'
    return get(url)
}

export function getMortgage() {
    const url = '/getMortgage'
    return get(url)
}

export function getMoney() {
    const url = '/getMoney'
    return get(url)
}

export function getGuohu() {
    const url = '/getGuohu'
    return get(url)
}

export function login(data) {
    const url = '/login'
    return userLogin(url, data)
}