<template>
  <div class="interview">
        <v-header @goback="goback" title="二手房审批列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import {getApproveList} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations} from 'vuex';

const keys = ['sendState', 'approveState'];

export default {
  data() {
    return {
      list: [],
      detail: false
    };
  },
  created() {
    this._getApproveList();
  },
  methods: {
    _getApproveList() {
      getApproveList().then(res => {
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
      switch(customer.currentState){
          case '未报审':
            this.$router.push({path: `/erApprove/baoshen`});
            break;
          case '未确定抵押状态': 
            this.$router.push({path: `/erApprove/approveState`});
            break;
          default:
            this.goback()
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
  /**监听的方式，v2.0可参考改成通过vuex中异步action的方式更新数据 */
  watch:{
    $route(to, from) {
      let isChildrenRouter = /^\/erApprove\/.+$/.test(from.path);
      isChildrenRouter && this._getApproveList();
    },
  }
};
</script>
<style lang="stylus" scoped>
</style>


