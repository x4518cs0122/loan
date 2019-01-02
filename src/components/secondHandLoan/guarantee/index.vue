<template>
  <div class="interview">
        <v-header @goback="goback" title="二手房担保列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <unreported ref="unreported" currentProcess="approve" :obj="reports" @submit="reportSubmit"></unreported>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import {getGuaranteeList, postZhengping} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations} from 'vuex';
import unreported from 'components/mortgageLoan/valuations/unreported';

const keys = ['guaranteeState', 'reportState'];

export default {
  data() {
    return {
      list: [],
      reports: {},
    };
  },
  created() {
    this._getGuaranteeList();
  },
  methods: {
    _getGuaranteeList() {
      getGuaranteeList().then(res => {
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
        case '未确定担保状态':
          this.$router.push({path: `/erGuarantee/process`});
          break;
        case '未出正评':
          const time = new Date(customer.extra.report.time);
          this.reports = Object.assign(
            {...customer.extra.report},
            {
              time: `${time.getFullYear()}-${time.getMonth() +
                1}-${time.getDate()}`,
            }
          );
          this.$refs.unreported.show();
          break;
        default:
          this.goback();
      }
    },
    reportSubmit(id) {
      let reports = Object.assign(
        {...this.reports},
        {
          time: new Date(this.reports.time).getTime(),
          type: '2',
          reportType: '2',
        }
      );
      postZhengping(id, {
        time: reports.time,
        report: JSON.stringify(reports),
      }).then(res => {
        if (res.result) {
          this._getGuaranteeList();
          this.$refs.unreported.hidden();
        }
      });
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    detailList,
    vHeader,
    unreported,
  },
  /**监听的方式，v2.0可参考改成通过vuex中异步action的方式更新数据 */
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/erGuarantee\/.+$/.test(from.path);
      isChildrenRouter && this._getGuaranteeList();
    },
  },
};
</script>
<style lang="stylus" scoped>
</style>


