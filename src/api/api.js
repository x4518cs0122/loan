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
//接单api接口
export function postOrder(checkList) {
    const id = store.getters.userId
    let data = {}
    data.checklist = JSON.stringify(checkList)
    data.employeeId = id
    const url = '/checklist/save'
    console.log(data)
    return post(url, data)
}
//面谈api接口
export function getInterview() {
    const id = store.getters.userId
    const url = `/task/m/view/${id}`
    return get(url)
}

export function postAdvice(advice, taskId) {
    const url = 'view/save'
    let data = {}
    data.advice = JSON.stringify(advice)
    data.taskId = taskId
    data.employeeId = store.getters.userId
    return post(url, data)
}

export function suspendOrder(time, taskId) {
    const id = store.getters.userId
    const url = 'view/suspend'
    let data = {}
    data.time = time
    data.taskId = taskId
    data.employeeId = id
    return post(url, data)
}

//面签api接口
export function getSignList() {
    const id = store.getters.userId
    const url = `/task/m/visa/${id}`
    return get(url)
}

export function postCatalog(catalog, taskId) {
    const id = store.getters.userId
    let data = {}
    data.catalog = JSON.stringify(catalog)
    data.employeeId = id
    data.taskId = taskId
    const url = 'visa/catalog/save'
    return post(url, data)
}
export function postForm(form, taskId) {
    let data = {}
    data.form = JSON.stringify(form)
    data.taskId = taskId
    const url = '/visa/form/save'
    return post(url, data)
}

export function postVisa(data) {
    const url = '/visa/save'
    return post(url, data)
}

//评估下单
export function getEvaluate() {
    const id = store.getters.userId
    const url = `/task/m/order/${id}`
    return get(url)
}

export function postEvaluateOrder(data) {
    const url = '/order/state/save'
    return post(url, data)
}

export function postReports(data) {
    const url = '/order/report/save'
    return post(url, data)
}

//审批
export function getApprove() {
    const id = store.getters.userId
    const url = `/task/m/approve/${id}`
    return get(url)
}

export function isDataPerfect(taskId) {
    const id = store.getters.userId
    const url = '/approve/completeData'
    let data = {
        employeeId: id,
        taskId: taskId
    }
    console.log(data)
    return post(url, data)
}
// 抵押

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