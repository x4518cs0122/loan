import { getSecondSignList} from '@/api/api'

const keys = ['catalogState', 'visaState'];

const erSignStore = {
  state:{
    erSignList:[]
  },
  mutations:{
    SET_SIGNLIST: (state, list) => {
      state.erSignList = list;
    }
  },
  actions: {
    getSignList({commit}) {
      getSecondSignList().then(res => {
        if (res.result) {
          let list = res.data.map(item => {
            let states = item.extra;
            let currentKey = keys.find(key => {
              return !states[key].done;
            });
            return {
              ...item,
              currentState:states[currentKey].message
            }
          });
          commit('SET_SIGNLIST', list)
        }
      });
    },
  }
}

export default erSignStore