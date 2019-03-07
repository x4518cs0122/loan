import {getCharge} from 'api/api';

const chargeStore = {
  state: {
    chargeList:[]
  },
  mutations: {
    SET_CHARGELIST: (state, list) => {
      state.chargeList = list;
    }
  },
  actions: {
    getCharge({commit}) {
      getCharge().then(res => {
        if (res.result) {
          commit('SET_CHARGELIST', res.data)
        }
      });
    },
  }
}
export default chargeStore