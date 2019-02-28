<template>
  <div class="result">
    <v-header @goback="goback" title="查询结果" back="查询"></v-header>
    <div class="fixed">
      <detail-list
        :list="queryList"
        @itemHandle="itemHandle"
        :state="state"
        @loadmore="loadmore"
        :loading="loading"
        :hasmore="queryHasmore"
      ></detail-list>
    </div>
    <rs-transition name="slide-left">
      <customer-process ref="loanDetail" :loanType="state"></customer-process>
    </rs-transition>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import vHeader from 'components/header/header';
import customerProcess from './customer-process';
import rsTransition from 'base/transition/transition';
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      list: [],
      detail: false,
      loading: false
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: '/bussiness' });
    },
    itemHandle(index) {
      let queryOrder = this.queryList[index];
      this.setcheckedOrder(queryOrder);
      this.$refs.loanDetail.show();
    },
    loadmore() {
      this.loading = true;
      this.$store.dispatch('_loadmore').then(res => {
        this.loading = false;
      });
    },
    ...mapMutations({
      setcheckedOrder: 'SET_CHECKEDORDER'
    })
  },
  computed: {
    ...mapGetters(['queryList', 'queryHasmore']),
    state() {
      if (_.isEmpty(this.queryList)) {
        return;
      }
      const id = this.queryList[0].id || '';
      const isMortgage = _.startsWith(id, '1');
      return isMortgage ? '抵押贷款' : '二手房贷款';
    }
  },
  components: {
    detailList,
    vHeader,
    customerProcess,
    rsTransition
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.result {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .fixed {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    background: $color-background;
  }
}
</style>


