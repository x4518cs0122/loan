<template>
  <div class="todo">
    <v-header title="待办列表" :hideback="true"></v-header>
    <div class="scroll">
      <detail-list :list="undoList" @itemHandle="itemHandle"></detail-list>
    </div>
    <div class="loading" v-if="loading">
      <i class="fa fa-spinner fa-pulse icon fa-3x"></i>
      <p>加载中</p>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import vHeader from 'components/header/header';
import tab from 'components/tab/tab';
import detailList from 'base/detail-list/detail-list';
import { mortgageUndo, houseUndo } from '@/api/api';
import { loanStates } from '@/utils/Const';
import * as _ from 'lodash';
export default {
  data() {
    return {
      loading: true,
      undoList: []
    };
  },
  methods: {
    _getUndo() {
      Promise.all([mortgageUndo(), houseUndo()]).then(res => {
        let list = res.map(item => {
          return item.data.filter(item => {
            return item.state !== 'finish' && item.state !== 'close';
          });
        });
        this.undoList = list[0].concat(list[1]);
        this.loading = false;
      });
    },
    itemHandle(index) {
      let customer = this.undoList[index];
      let prefix = _.startsWith(customer.id, '2') ? 'er' : '';
      this.$router.push({ name: `${prefix}${customer.state}` });
    }
  },
  created() {
    this._getUndo();
  },
  components: { vHeader, tab, detailList }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.todo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  text-align: center;
  line-height: 20px;
  transform: translate3d(-50%, -50%, 0);
  color: $color-grey;

  .icon {
    margin-bottom: 10px;
  }
}
</style>