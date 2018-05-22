import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'
import permission from './modules/permission'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        app,
        user,
        permission
    },
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})