<template>
  <div class="interview">
        <v-header @goback="goback" title="二手房收费列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle" state="待确定收费状态" ></detail-list>
        <State v-show="stateShow" @hide="hideState"></State>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list';
import {chargeList} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations} from 'vuex';
import State from './state'

export default {
  data() {
    return {
      list: [],
      detail: false,
      stateShow: false
    };
  },
  created() {
    this._chargeList();
  },
  methods: {
    _chargeList() {
      chargeList().then(res => {
        if (res.result) {
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
      this.stateShow = true
      // this.$router.push({path: `/erCharge/state`});
    },
    hideState() {
      this.stateShow = false
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    detailList,
    vHeader,
    State
  },
  /**监听的方式，v2.0可参考改成通过vuex中异步action的方式更新数据 */
  // watch:{
  //   $route(to, from) {
  //     let isChildrenRouter = /^\/erCharge\/.+$/.test(from.path);
  //     isChildrenRouter && this._chargeList();
  //   },
  // }
};
</script>
<style lang="stylus" scoped>
</style>


