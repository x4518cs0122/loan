import { Permission } from '@/utils/Const.js'
import { login } from 'api/api'
import {setCookies} from '@/common/js/utils'
const user = {
    state: {
        token: '',
        user: {},
        roles: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        setUserInfo({ commit }, userInfo) {
            let roles = ['bussiness', 'jiedan', 'miantan', 'mianqian', 'pinggu', 'shengpi', 'diya', 'shoufei', 'fangkuan','erJiedan','erMianqian'
                          ,'erPingu','erShuji','erShenpi','erGuohu','erDiya']
            return new Promise((resolve, reject) => {
                login(userInfo).then((res) => {
                    if (!res.result) {
                        reject(res.message)
                    } else {
                        /** 保存登陆用户信息 */
                        commit('SET_USER', res.data)
                        setCookies(res.data.id)
                        /** 角色类型参照 utils/const.js/Permission */
                        const roles = Permission.EMPLOYEE
                        // const roles = Permission[res.data.role] || Permission.M_MANAGE_2_EMPLOYEE
                        commit('SET_ROLES', roles)
                        resolve()
                    }
                })
            })
        },
        getUserInfo({ commit, state }) {

        }
    }
}

export default user
