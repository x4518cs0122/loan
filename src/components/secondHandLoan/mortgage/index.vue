<template>
  <div class="interview">
        <v-header @goback="goback" title="二手房抵押列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import {getMortgageList} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations} from 'vuex';

const keys = ['mortgageState', 'takeEvidence', 'returnEvidence'];

export default {
  data() {
    return {
      list: [],
      detail: false,
    };
  },
  created() {
    this._getMortgageList();
  },
  methods: {
    _getMortgageList() {
      getMortgageList().then(res => {
        if (res.result) {
          res.data.forEach(item => {
            let states = item.extra;
            let currentKey = keys.find(key => {
              return !states[key].done;
            });
            item.currentState = states[currentKey].message;
          });
          this.list = res.data;
        }
      });
    },
    goback() {
      this.$router.push({path: '/bussiness'});
    },
    itemHandle(index) {
      let id = this.list[index].id;
      let customer = this.list[index];
      this.setCustomer(customer);
      switch (customer.currentState) {
        case '未确定抵押状态':
          this.$router.push({path: `/erMortgage/mortgageState`});
          break;
        case '未确定取证时间':
          this.$router.push({path: `/erMortgage/getProof`});
          break;
        case '未确定返证时间':
          this.$router.push({path: `/erMortgage/returnTime`});
          break;
        default:
          this.goback();
      }
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    detailList,
    vHeader,
  },
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/erMortgage\/.+$/.test(from.path);
      isChildrenRouter && this._getMortgageList();
    },
  },
};
</script>
<style lang="stylus" scoped>
</style>


