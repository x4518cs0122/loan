import {
  getApprove
} from '@/api/api';
import * as _ from 'lodash';


/** 判断状态常量 */
const statesInSequence = [
  'catalogState',
  'sendState',
  'approveState',
  'approveComment',
];

const approveStore = {
  state: {
    approveList: []
  },
  mutations: {
    SET_APPROVELIST: (state, list) => {
      state.approveList = list;
    }
  },
  actions: {
    getApprove({commit}) {
      getApprove().then(res => {
        if (res.result) {
          const list = res.data.map(item => {
            let states = item.extra;
            let currentKey = statesInSequence.find(key => {
              return !states[key].done;
            });
            return {
              ...item,
              currentState:states[currentKey].message
            }
          });
          commit('SET_APPROVELIST', list)
        }
      });
    },
  }
};

export default approveStore;
