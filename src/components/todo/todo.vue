<template>
  <div class="todo">
    <v-header title="待办列表" :hideback="true"></v-header>
    <cube-index-list :data="undoList" class="scroll">
      <cube-index-list-group v-for="(group, index) in undoList" :key="index" :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="itemHandle"
        >
          <div class="custom-item">{{item.id}}</div>
          <div class="custom-desc"><span class="name">姓名:{{item.clientName}}</span> <span>状态:{{item.currentState}}</span></div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>

<script type='text/ecmascript-6'>
import vHeader from 'components/header/header';
import tab from 'components/tab/tab';
import detailList from 'base/detail-list/detail-list';
import { mortgageUndo, houseUndo } from '@/api/api';
import { loanStates } from '@/utils/Const';
import * as _ from 'lodash';
import { filterUselessTodos, getState } from "@/utils/commonFunction";
export default {
  data() {
    return {
      loading: true,
      undoList: [],
      data: [
        {
          name: '★Hot City',
          items: [
            {
              name: 'BEIJING',
              value: 1
            },
            {
              name: 'SHANGHAI',
              value: 2
            }
          ]
        },
        {
          name: 'A',
          items: [
            {
              name: 'ANSHAN',
              value: 3
            },
            {
              name: 'ANQING',
              value: 4
            }
          ]
        }
      ]
    };
  },
  methods: {
    _getUndo() {
      Promise.all([mortgageUndo(), houseUndo()]).then(res => {
          const mortList = filterUselessTodos(res[0].data).map(item =>{
            return getState(item, loanStates)
          })
          const houseList = filterUselessTodos(res[1].data).map(item =>{
            return getState(item, loanStates)
          })
          this.undoList = [{
            name:'抵押贷款',
            items:mortList
          },{
            name:'二手房贷款',
            items:houseList
          }]
        this.loading = false;
      });
    },
    itemHandle(customer) {
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
  position relative;
  height:100%;
  overflow: auto;
  .scroll {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    height: auto;
  }
  .cube-index-list {
    .cube-index-list-item {
      padding-left: 20px;
      border-bottom: 1px solid $color-border
      .custom-item {
        margin: 10px 0;
        font-size: 14px;
        color: $color-text-l;
      }
      .custom-desc {
        font-size: 12px;
        margin-bottom:10px
        color:$color-text-ll
        .name {
          margin-right: 15px;
        }
      }
    }
  }
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