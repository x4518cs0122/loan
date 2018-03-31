import * as types from './mutation-types'

const mutations = {
    [types.SET_USERNAME](state, userName) {
        state.userName = userName
    }
}
export default mutations