import {get, post } from 'common/js/axios'

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
    const url = '/interview'
    return get(url)
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