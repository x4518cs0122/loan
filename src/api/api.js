import axios from 'common/js/axios'
import store from '../store'

//通知api
export function getNotice() {
    const url = "/notice"
    return axios.get(url)
}
//tab选项：待办
export function getTodo() {
    const url = "/todos"
    return axios.get(url)
}
//接单api接口
export function postOrder(checkList) {
    const id = store.getters.userId
    let data = {}
    data.checklist = JSON.stringify(checkList)
    data.employeeId = id
    const url = '/checklist/save'
    return axios.post(url, data)
}
//面谈api接口
export function getInterview() {
    const id = store.getters.userId
    const url = `/task/m/view/${id}`
    return axios.get(url)
}

export function postAdvice(advice, taskId) {
    const url = 'view/save'
    let data = {}
    data.advice = JSON.stringify(advice)
    data.taskId = taskId
    data.employeeId = store.getters.userId
    return axios.post(url, data)
}

export function suspendOrder(time, taskId) {
    const id = store.getters.userId
    const url = 'view/suspend'
    let data = {}
    data.time = time
    data.taskId = taskId
    data.employeeId = id
    return axios.post(url, data)
}

//面签api接口
export function getSignList() {
    const id = store.getters.userId
    const url = `/task/m/visa/${id}`
    return axios.get(url)
}

export function postCatalog(catalog, taskId) {
    const id = store.getters.userId
    let data = {}
    data.catalog = JSON.stringify(catalog)
    data.employeeId = id
    data.taskId = taskId
    const url = 'visa/catalog/save'
    return axios.post(url, data)
}
export function postForm(form, taskId) {
    let data = {}
    data.form = JSON.stringify(form)
    data.taskId = taskId
    const url = '/visa/form/save'
    return axios.post(url, data)
}

export function postVisa(data) {
    const url = '/visa/save'
    return axios.post(url, data)
}

export function getCatalog(catalogId) {
    const url = `/visa/catalog/${catalogId}`
    return axios.get(url)
}

//评估下单
export function getEvaluate() {
    const id = store.getters.userId
    const url = `/task/m/order/${id}`
    return axios.get(url)
}

export function postEvaluateOrder(data) {
    const url = '/order/state/save'
    return axios.post(url, data)
}

export function postReports(data) {
    const url = '/order/report/save'
    return axios.post(url, data)
}

//审批
export function getApprove() {
    const id = store.getters.userId
    const url = `/task/m/approve/${id}`
    return axios.get(url)
}

export function isDataPerfect(taskId) {
    const id = store.getters.userId
    const url = '/approve/completeData'
    let data = {
        employeeId: id,
        taskId: taskId
    }
    return axios.post(url, data)
}

export function approveSubmit(time, taskId) {
    const url = '/approve/submit'
    let data = {
        time: time,
        taskId: taskId
    }
    return axios.post(url, data)
}

export function baoshen(time, taskId) {
    let data = {
        time: time,
        taskId: taskId
    }
    const url = '/approve/complete'
    return axios.post(url, data)
}

export function changeState(obj, taskId) {
    const url = '/approve/save'
    let data = {
        approve: JSON.stringify(obj),
        taskId: taskId
    }
    return axios.post(url, data)
}
// 抵押

export function getMortgage() {
    const url = '/getMortgage'
    return axios.get(url)
}

export function getMoney() {
    const url = '/getMoney'
    return axios.get(url)
}

export function getGuohu() {
    const url = '/getGuohu'
    return axios.get(url)
}

export function login(data) {
    const url = `/auth/login?name=${data.name}&password=${data.password}`
    return axios.get(url)
}