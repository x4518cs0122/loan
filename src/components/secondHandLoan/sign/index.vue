<template>
  <div class="sign">
      <v-header @goback="goback" title="二手房面签列表" back="主页"></v-header>
      <detail-list :list="list" @itemHandle="itemHandle" ></detail-list>
      <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list';
import vHeader from 'components/header/header';
import {getSecondSignList} from 'api/api';
import {mapMutations} from 'vuex';

const keys = ['catalogState', 'visaState'];

export default {
  data() {
    return {
      list: [],
    };
  },
  components: {detailList, vHeader},
  created() {
    this._getSignList();
    this.loanType = ['待填写资料目录表、个人贷款申请表', '待确定签约状态'];
  },
  methods: {
    _getSignList() {
      getSecondSignList().then(res => {
        if (res.result) {
          res.data.forEach(item => {
            let states = item.extra;
            let currentKey = keys.find(key => {
              return !states[key].done;
            });
            item.currentState = states[currentKey].message;
          });
          this.list = res.data
        }
      });
    },
    itemHandle(index) {
      let customer = this.list[index];
      this.setCustomer(customer);
      if (customer.currentState === '待填写资料目录表') {
        this.$router.push({path: `/erSign/mulu`});
      } else {
        this.$router.push({path: `/erSign/confirmState`});
      }
    },
    goback() {
      this.$router.push({path: '/bussiness'});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    })
  },
  watch:{
    $route(to, from) {
      let isChildrenRouter = /^\/erSign\/.+$/.test(from.path);
      isChildrenRouter && this._getSignList();
    },
  }
};
</script>

<style lang='stylus' scoped>
</style>
