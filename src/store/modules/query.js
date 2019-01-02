import { queryState } from 'api/api'
import * as _ from 'lodash'

const user = {
    state: {
        queryList: [],
        hasmore:false,
        /**保存请求的数据,用于加载更多 */
        data:{},
        /**保存当前query的page数据 */
        queryPage:1,
        checkedOrder: {}
    },
    mutations: {
        SET_REQUESTDATA: (state, data) => {
            state.data = data
        },
        RESET_QUERYLIST: (state) =>{
            state.queryList = []
        },
        SET_PAGE: (state, page) => {
            state.queryPage = page
        },
        SET_HASMORE: (state, hasmore) => {
            state.hasmore = hasmore
        },
        SET_QUERYLIST: (state, list) => {
            state.queryList = state.queryList.concat(list)
        },
        SET_CHECKEDORDER: (state, order) => {
            state.checkedOrder = order
        }
    },
    actions: {
        _queryState({ commit, state }, data) {
            commit('SET_REQUESTDATA', {...data})
            return new Promise((resolve, reject) => {
                commit('SET_PAGE', +data.page)
                queryState(data).then(res => {
                    if (!res.result) {
                        reject('信息跑丢了，请重新提交')
                    } else {
                        /**重新查询,清空保存的数据 */
                        commit('RESET_QUERYLIST')
                        /** 数据保存在vuex中，利于数据回溯 */
                        let queryList = res.data.list
                        commit('SET_QUERYLIST', queryList)
                        
                        /**判断是否还有下一页 */
                        let total = _.get(res.data, 'size', queryList.length)
                        let hasmore = total > +queryList.length
                        commit('SET_HASMORE', hasmore)

                        resolve()
                    }
                })
            })
        },
        _loadmore({commit, state}) {
            let data = {...state.data}
            return new Promise((resolve, reject) =>{
                if(!state.hasmore){
                    reject()
                }
                commit('SET_REQUESTDATA', Object.assign(data, {
                    page: data.page+1
                }))
                queryState(state.data).then(res =>{
                    if(!res.result){
                        reject('加载失败')
                    } else {
                        let queryList = res.data.list
                        commit('SET_QUERYLIST', queryList)
                        /**判断是否还有下一页 */
                        let total = _.get(res.data, 'size', queryList.length)
                        console.log(total,'length === ', state.queryList.length)
                        let hasmore = total > +state.queryList.length
                        commit('SET_HASMORE', hasmore)

                        resolve()
                    }
                })
            })
        }
    }
}

export default user
