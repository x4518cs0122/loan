import Cookies from 'js-cookie'
import {USER_KEY} from '@/utils/Const.js'

export function getCookies() {
    const userId = Cookies.get(USER_KEY)
    return userId
}

export function setCookies(userId) {
    Cookies.set(USER_KEY, userId)
}