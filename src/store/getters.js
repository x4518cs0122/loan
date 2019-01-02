const getters = {
    customer: state => state.app.customer,
    signListUpdate: state => state.app.signListUpdate,
    user: state => state.user.user,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    permission_routers: state => state.permission.routers,
    /**查询组件 */
    queryList: state => state.query.queryList,
    queryHasmore: state => state.query.hasmore,
    queryCheckedorder: state =>state.query.checkedOrder
}

export default getters