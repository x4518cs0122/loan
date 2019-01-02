import store from '../store' 
const __USER_TOKEN__ = 'loan__user_token'

function notValidate(data) {
    return typeof data == "undefined" || data == null || data == ""
}

export function setToken(token) {
    if(notValidate(token)) {
        return false
    } 
    sessionStorage.setItem(__USER_TOKEN__, token)
    return true
}

export function getToken() {
    return sessionStorage.getItem(__USER_TOKEN__) || ''
}

export function getUserId() {
    return store.getters.user.id || ''
}