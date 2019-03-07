import {
  getEvaluate
} from '@/api/api';
import * as _ from 'lodash';

const evaStore = {
  state: {
    evaluateList: []
  },
  mutations: {
    SET_EVALUATELIST: (state, list) => {
      state.evaluateList = list;
    }
  },
  actions: {
    _getEvaluate({commit}) {
      getEvaluate().then(res => {
        if (res.result) {
          let evaluationList = res.data;
          const list = evaluationList.map(item => {
            const reportState = item.extra.reportState;
            const orderState = item.extra.orderState;
            return {
              ...item,
              currentState: orderState.done ?
                reportState.done ?
                '' :
                reportState.message :
                orderState.message
            }
          });
          commit('SET_EVALUATELIST', list)
        }
      });
    },
  }
};

export default evaStore;
