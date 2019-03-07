import {getMortgage} from 'api/api'

const mortgageStore = {
  state: {
    mortgageList:[]
  },
  mutations: {
    SET_MORTGAGELIST: (state, list) => {
      state.mortgageList = list;
    }
  },
  actions: {
    getMortgage({commit}) {
      getMortgage().then(res => {
        if (res.result) {
          let mortgageList = res.data;
          const list = mortgageList.map(item => {
            let currentState = item.extra.mortgageState.done
              ? ''
              : item.extra.mortgageState.message;

            return {
              ...item,
              currentState
            }
          });
          commit('SET_MORTGAGELIST', list)
        }
      });
    },
  }
}
export default mortgageStore