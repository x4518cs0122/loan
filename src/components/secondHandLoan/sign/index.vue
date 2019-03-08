<template>
  <div class="sign">
      <v-header @goback="goback" title="二手房面签列表" back="主页"></v-header>
      <detail-list :list="erSignList" @itemHandle="itemHandle" ></detail-list>
      <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list';
import vHeader from 'components/header/header';
import {getSecondSignList} from 'api/api';
import {mapMutations, mapActions, mapGetters} from 'vuex';

const keys = ['catalogState', 'visaState'];

export default {

  components: {detailList, vHeader},
  created() {
    this.getSignList();
    // this.loanType = ['待填写资料目录表、个人贷款申请表', '待确定签约状态'];
  },
  methods: {
    itemHandle(index) {
      let customer = this.erSignList[index];
      this.setCustomer(customer);
      if (customer.currentState === '待填写资料目录表') {
        this.$router.push({path: `/erSign/mulu`});
      } else {
        this.$router.push({path: `/erSign/confirmOrder`});
      }
    },
    goback() {
      this.$router.push({path: '/bussiness'});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
    ...mapActions(['getSignList'])
  },
  computed:{
    ...mapGetters(['erSignList'])
  }
};
</script>

<style lang='stylus' scoped>
</style>
