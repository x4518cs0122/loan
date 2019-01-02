<template>
  <div class="sign">
      <v-header @goback="goback" title="抵押面签列表" back="主页"></v-header>
      <detail-list :list="list" @itemHandle="itemHandle" :state="state"></detail-list>
      <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list';
import vHeader from 'components/header/header';
import {getSignList} from 'api/api';
import {mapMutations} from 'vuex';

const LOAN_TYPE = [
  '待填写资料目录表',
  '待填写个人贷款申请表',
  '待确定签约状态',
];

export default {
  data() {
    return {
      list: [],
      state: '',
    };
  },
  components: {detailList, vHeader},
  mounted() {
    this._getSignList();
  },
  methods: {
    _getSignList() {
      getSignList().then(res => {
        let dataList = res.data;
        dataList.forEach(customer => {
          /**获取用户当前状态 */
          const catalogState = customer.extra.catalogState;
          const formState = customer.extra.formState;
          const visaState = customer.extra.visaState;
          if (!catalogState.done) {
            customer.currentState = catalogState.message;
            return;
          } else if (!formState.done) {
            customer.currentState = formState.message;
            return;
          } else {
            customer.currentState = visaState.message;
            return;
          }
        });
        this.list = dataList;
      });
    },

    itemHandle(index) {
      let customer = this.list[index];
      const type = LOAN_TYPE.indexOf(customer.currentState);
      this.setCustomer(customer);
      switch (type) {
        case 0:
          this.$router.push({path: `/sign/${customer.id}`});
          break;
        case 1:
          this.$router.push({path: `/sign/${customer.id}`});
          break;
        case 2:
          this.$router.push({path: `/sign/confirmState`});
          break;
      }
    },
    goback() {
      this.$router.push({path: '/bussiness'});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  /** 存在bug，待修复：只监听是否来自子路由，进入表单时也会触发 */
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/sign\/.+$/.test(from.path)
      isChildrenRouter && this._getSignList()
    },
  },
};
</script>

<style lang='stylus' scoped>
</style>
