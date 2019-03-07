<template>
    <div class="getmoney">
        <v-header title="抵押收费列表" @goback="goback" back="主页"></v-header> 
        <detail-list :list="chargeList" @itemHandle="itemHandle" state="待确定收费状态"></detail-list>
        <router-view></router-view>
    </div>
</template>

<script>
import {getCharge} from 'api/api';
import vHeader from 'components/header/header';
import detailList from 'base/detail-list/detail-list';
import {mapMutations, mapGetters, mapActions} from 'vuex';
export default {
  created() {
    this.getCharge();
  },
  methods: {
    
    goback() {
      this.$router.push({path:'/bussiness'});
    },
    itemHandle(index) {
      let customer = this.chargeList[index];
      this.setCustomer(customer);
      this.$router.push({path: '/charge/chargeState'});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
    ...mapActions(['getCharge'])
  },
  computed:{
    ...mapGetters(['chargeList'])
  },
  components: {
    detailList,
    vHeader,
  }
};
</script>

<style lang='stylus' scoped>
</style>
