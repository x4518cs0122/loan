<template>
  <div class="interview">
        <v-header @goback="goback" title="二手房放款列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle" state="等待放款"></detail-list>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import {getMoneyList} from 'api/api';
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
    this._getMoneyList();
  },
  methods: {
    _getMoneyList() {
      getMoneyList().then(res => {
        if (res.result) {
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
      this.$router.push({path: `/erGetmoney/state`});
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
      let isChildrenRouter = /^\/erGetmoney\/.+$/.test(from.path);
      isChildrenRouter && this._getMoneyList();
    },
  }
};
</script>
<style lang="stylus" scoped>
</style>


