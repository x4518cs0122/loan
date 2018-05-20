import * as types from './mutation-types'

const mutations = {
    [types.SET_USERNAME](state, userName) {
        state.userName = userName
    },
    [types.SET_CUSTOMER](state, customer) {
        state.customer = customer
    },
    [types.SET_TOKEN](state, token) {
        state.token = token
    }
}
export default mutations