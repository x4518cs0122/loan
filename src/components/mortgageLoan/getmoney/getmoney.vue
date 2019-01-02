<template>
    <div class="getmoney">
        <v-header title="抵押放款列表" @goback="goback" back="主页"></v-header> 
        <detail-list :list="list" @itemHandle="itemHandle" state="待确定放款状态"></detail-list>
        <router-view></router-view>
    </div>
</template>

<script>
import {getMoney} from 'api/api';
import vHeader from 'components/header/header';
import detailList from 'base/detail-list/detail-list';
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this._getMoney();
  },
  methods: {
    _getMoney() {
      getMoney().then(res => {
        if (res.result) {
          this.list = res.data;
        }
      });
    },
    goback() {
      this.$router.push({path:'/bussiness'});
    },
    itemHandle(index) {
      let customer = this.list[index];
      this.setCustomer(customer);
      this.$router.push({path: '/getmoney/fangkuan'});
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
      let isChildrenRouter = /^\/getmoney\/.+$/.test(from.path);
      isChildrenRouter && this._getMoney();
    },
  },
};
</script>

<style lang='stylus' scoped>
</style>
