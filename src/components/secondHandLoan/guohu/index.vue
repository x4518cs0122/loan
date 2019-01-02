<template>
  <div class="interview">
        <v-header @goback="goback" title="二手房过户列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import {getGuohuList} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations} from 'vuex';

const keys = ['transferState','receiptState'];

export default {
  data() {
    return {
      list: [],
      detail: false,
    };
  },
  created() {
    this._getGuohuList();
  },
  methods: {
    _getGuohuList() {
      getGuohuList().then(res => {
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
        case '待确定回证时间':
          this.$router.push({path: `/erGuohu/huizheng`});
          break;
        case '待确定过户状态':
          this.$router.push({path: `/erGuohu/confirmState`});
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
      let isChildrenRouter = /^\/erGuohu\/.+$/.test(from.path);
      isChildrenRouter && this._getGuohuList();
    },
  },
};
</script>
<style lang="stylus" scoped>
</style>


