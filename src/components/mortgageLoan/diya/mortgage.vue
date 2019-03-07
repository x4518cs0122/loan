<template> 
    <div class="mortgage">
        <v-header title="抵押列表" @goback="goback"></v-header> 
        <detail-list :list="mortgageList" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
    </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list';
// import {getMortgage} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations, mapActions, mapGetters} from 'vuex';
export default {

  created() {
    this.getMortgage();
  },
  methods: {
    goback() {
      this.$router.push({path: '/bussiness'});
    },
    itemHandle(index) {
      let customer = this.mortgageList[index];
      this.$router.push({path: 'mortgage/statusPicker'});
      this.setCustomer(customer);
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
    ...mapActions(['getMortgage'])
  },
  computed:{
    ...mapGetters(['mortgageList'])
  },
  components: {
    detailList,
    vHeader,
  },
};
</script>

<style lang='stylus' scoped>
</style>
