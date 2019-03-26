import { getAnnouncement, mortgageUndo, houseUndo } from '@/api/api';
import * as _ from 'lodash';

const bizStore = {
  state: {
    announces: [],
    todos: [],
    loanTypeLabel: '抵押贷款'
  },
  mutations: {
    SET_ANNOUNCE: (state, announces) => {
      state.announces = announces;
    },
    SET_TODOS: (state, todos) => {
      state.todos = todos;
    },
    SET_LOANTYPELABEL: (state, loanTypeLabel) => {
      state.loanTypeLabel = loanTypeLabel;
    }
  },
  actions: {
    getAnnounces({ commit }) {
      return new Promise((resolve, reject) => {
        /** 获取信息 */
        getAnnouncement().then(res => {
          if (!res.result) {
            reject();
          }
          commit('SET_ANNOUNCE', res.data);
          resolve();
        });
      });
    },
    getTodos({ commit }) {
      const getHouseTodos = houseUndo();
      const getMortgageTodos = mortgageUndo();
      Promise.all([getMortgageTodos, getHouseTodos]).then(res => {
        const Mtodos = _.get(res[0], 'data', []);
        const Htodos = _.get(res[1], 'data', []);
        commit('SET_TODOS', Mtodos.concat(Htodos));
      });
    }
  }
};

export default bizStore;
