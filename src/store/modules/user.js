import { getToken, setToken } from 'common/js/utils'
import { login } from 'api/api'
const user = {
    state: {
        token: getToken(),
        roles: [],
        userId: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        }
    },
    actions: {
        setUserInfo({ commit }, userInfo) {
            let roles = ['bussiness', 'jiedan', 'miantan', 'mianqian', 'pinggu', 'shengpi', 'diya', 'shoufei', 'fangkuan']
            return new Promise((resolve, reject) => {
                login(userInfo).then((res) => {
                    if (!res.data.status === 200) {
                        reject(res.data.message)
                    } else {
                        let token = res.headers.token
                            // console.log(res.data)
                            // let token = res.data.token
                        commit('SET_TOKEN', token)
                        commit('SET_ROLES', roles)
                        console.log(token)
                        commit('SET_USERID', res.data.data.id)
                        setToken(token)
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