<template>
    <div class="er-evaluate">
        <evaluate-list title="二手房评估下单列表" :list="list" @select="select"></evaluate-list>
        <unreported ref="unreported" currentProcess="erValuation" :obj="reports" @submit="reportSubmit"></unreported>
        <router-view></router-view>
    </div>
</template>

<script>
import evaluateList from 'components/mortgageLoan/valuations/evaluate-list';
import {getSecondHandValuation, postReport} from 'api/api';
import {mapMutations} from 'vuex';
import unreported from 'components/mortgageLoan/valuations/unreported';

const keys = ['orderState', 'reportState'];

export default {
  data() {
    return {
      list: [],
      reports: {
        id: null,
        orderId: null,
        reportType: '',
        reportObligee: '',
        reportBorrower: '',
        reportRepose: '',
        reportHouseAge: '',
        reportHouseArea: null,
        reportHouseSingle: null,
        reportHouseTotal: null,
        reportLoanAmount: null,
        reportLoanYear: '',
        reportFirst: '',
        houseId: null,
        time: null,
        type: '',
      },
    };
  },
  created() {
    this._getEvaluate();
  },
  methods: {
    _getEvaluate() {
      getSecondHandValuation().then(res => {
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
    select(index) {
      let customer = this.list[index];
      this.setCustomer(customer);
      if (customer.currentState === '待确定下单状态') {
        this.$router.push({path: '/erEvaluate/placeOrder'});
      } else {
        this.$refs.unreported.show();
      }
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
    reportSubmit(id) {
      let reports = Object.assign(
        {...this.reports},
        {
          time: new Date(this.reports.time).getTime(),
          type: this.reports.reportType,
          orderId: id,
        }
      );
      postReport(id, {
        time: reports.time,
        type: reports.type,
        report: JSON.stringify(reports),
      }).then(res => {
        if (res.result) {
          this._getEvaluate();
          this.$refs.unreported.hidden();
        }
      });
    },
  },
  components: {
    evaluateList,
    unreported,
  },
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/erEvaluate\/.+$/.test(from.path);
      isChildrenRouter && this._getEvaluate();
    },
  },
};
</script>

<style lang='stylus' scoped>
</style>
