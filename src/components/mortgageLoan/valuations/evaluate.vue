<template>
    <div class="evaluate">
        <evaluate-list title="抵押评估下单列表" :list="list" @select="select"></evaluate-list>
        <router-view></router-view>
    </div>
</template>

<script>
import evaluateList from 'components/mortgageLoan/valuations/evaluate-list';
import {getEvaluate} from 'api/api';
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this._getEvaluate();
  },
  methods: {
    _getEvaluate() {
      getEvaluate().then(res => {
        if (res.result) {
          let evaluationList = res.data;
          const reportState = evaluationList.forEach(item => {
            const reportState = item.extra.reportState;
            const orderState = item.extra.orderState;
            item.currentState = orderState.done
              ? reportState.done
                ? ''
                : reportState.message
              : orderState.message;
          });
          this.list = evaluationList;
        }
      });
    },
    select(index) {
      let customer = this.list[index];
      this.setCustomer(customer);
      if (this.list[index].currentState === '待确定下单状态') {
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
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/evaluate\/.+$/.test(from.path);
      isChildrenRouter && this._getEvaluate();
    },
  },
};
</script>

<style lang='stylus' scoped>
</style>
