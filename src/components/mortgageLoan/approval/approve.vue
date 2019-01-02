<template>
    <div class="approve">
        <approve-list title="抵押审批列表" :list="list" @select="select"></approve-list>
        <router-view></router-view>
    </div>
</template>

<script>
import approveList from 'components/mortgageLoan/approval/approve-list';
import {getApprove} from 'api/api';
import {mapMutations} from 'vuex';

/**从接口获取状态，根据流程先后顺序判断当前显示的状态 */
const statesInSequence = [
  'catalogState',
  'sendState',
  'approveState',
  'approveComment',
];
export default {
  data() {
    return {
      list: [],
      states: {},
    };
  },
  created() {
    this._getApprove();
  },
  methods: {
    _getApprove() {
      getApprove().then(res => {
        if (res.result) {
          res.data.forEach(item => {
            let states = item.extra;
            let currentKey = statesInSequence.find(key => {
              return !states[key].done;
            });
            item.currentState = states[currentKey].message;
          });
          this.list = res.data;
        }
      });
    },
    select(index) {
      let customer = this.list[index];
      this.setCustomer(customer);
      this.$router.push({path: `/approve/${customer.id}`});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    approveList,
  },
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/approve\/[0-9]+\/[a-zA-Z0-9]+$/.test(from.path);
      isChildrenRouter && this._getApprove();
    },
  },
};
</script>

<style lang='stylus' scoped>
</style>
