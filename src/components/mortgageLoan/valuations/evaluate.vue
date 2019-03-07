<template>
    <div class="evaluate">
        <evaluate-list title="抵押评估下单列表" :list="evaluateList" @select="select"></evaluate-list>
        <router-view></router-view>
    </div>
</template>

<script>
import evaluateList from 'components/mortgageLoan/valuations/evaluate-list';
import {getEvaluate} from 'api/api';
import {mapMutations, mapActions, mapGetters} from 'vuex';
export default {
  created() {
    this._getEvaluate();
  },
  methods: {
    ...mapActions(['_getEvaluate']),
    select(index) {
      let customer = this.evaluateList[index];
      this.setCustomer(customer);
      if (customer.currentState === '待确定下单状态') {
        this.$router.push({path: '/evaluate/placeOrder'});
      } else {
        this.$router.push({path: '/evaluate/reports'});
      }
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    evaluateList,
  },
  computed:{
    ...mapGetters([
      'evaluateList'
    ])
  }
};
</script>

<style lang='stylus' scoped>
</style>
