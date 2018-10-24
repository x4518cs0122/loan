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
            let roles = ['bussiness', 'jiedan', 'miantan', 'mianqian', 'pinggu', 'shengpi', 'diya', 'shoufei', 'fangkuan','erJiedan','erMianqian'
                          ,'erPingu','erShuji','erShenpi','erGuohu','erDiya']
            return new Promise((resolve, reject) => {
                login(userInfo).then((res) => {
                    if (!res.success) {
                        reject(res.message)
                    } else {
                        let token = res.data.token
                        commit('SET_TOKEN', token)
                        console.log(token)
                        commit('SET_ROLES', roles)
                        commit('SET_USERID', res.data.id)
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
