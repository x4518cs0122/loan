<template>
    <div class="approve">
        <approve-list title="抵押审批列表" :list="approveList" @select="select"></approve-list>
        <router-view></router-view>
    </div>
</template>

<script>
import approveList from 'components/mortgageLoan/approval/approve-list';
import {getApprove} from 'api/api';
import {mapMutations, mapGetters, mapActions} from 'vuex';

/**从接口获取状态，根据流程先后顺序判断当前显示的状态 */
const statesInSequence = [
  'catalogState',
  'sendState',
  'approveState',
  'approveComment',
];
export default {
  created() {
    this.getApprove();
  },
  methods: {
    select(index) {
      let customer = this.approveList[index];
      this.setCustomer(customer);
      this.$router.push({path: `/approve/${customer.id}`});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
    ...mapActions(['getApprove'])
  },
  components: {
    approveList,
  },
  computed: {
    ...mapGetters(['customer', 'approveList'])
  },
};
</script>

<style lang='stylus' scoped>
</style>
