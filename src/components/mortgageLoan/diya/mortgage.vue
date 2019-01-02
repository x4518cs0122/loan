<template> 
    <div class="mortgage">
        <v-header title="抵押列表" @goback="goback"></v-header> 
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
    </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list';
import {getMortgage} from 'api/api';
import vHeader from 'components/header/header';
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      list: [],
      detail: false,
    };
  },
  created() {
    this._getMortgage();
  },
  methods: {
    _getMortgage() {
      getMortgage().then(res => {
        if (res.result) {
          let mortgageList = res.data;
          mortgageList.forEach(item => {
            item.currentState = item.extra.mortgageState.done
              ? ''
              : item.extra.mortgageState.message;
          });
          this.list = mortgageList;
        }
      });
    },
    goback() {
      this.$router.push({path: '/bussiness'});
    },
    itemHandle(index) {
      let customer = this.list[index];
      this.$router.push({path: 'mortgage/statusPicker'});
      this.setCustomer(customer);
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    detailList,
    vHeader,
  },
   watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/mortgage\/.+$/.test(from.path);
      isChildrenRouter && this._getMortgage();
    },
  },
};
</script>

<style lang='stylus' scoped>
</style>
