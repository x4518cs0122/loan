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
  queryCheckedorder: state => state.query.checkedOrder,
  /** 首页 */
  todos: state => state.bizStore.todos,
  selectedLabel: state => state.bizStore.selectedLabel,
  evaluateList:state => state.evaStore.evaluateList,
  approveList:state => state.approveStore.approveList,
  mortgageList:state =>state.mortgageStore.mortgageList,
  chargeList:state =>state.chargeStore.chargeList,

  /** 二手房部分getters */
  erSignList: state =>state.erSignStore.erSignList
};

export default getters;
