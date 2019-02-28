<template>
  <div class="page-main">
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel label="主页">
        <Bussiness @changeTab="changeTab"></Bussiness>
      </cube-tab-panel>
      <cube-tab-panel label="待办" class="todo-relative">
        <Todos></Todos>
      </cube-tab-panel>
      <cube-tab-panel label="查询">
        <Query></Query>
      </cube-tab-panel>
      <cube-tab-panel label="我的">
        <personalCenter></personalCenter>
      </cube-tab-panel>
    </cube-tab-panels>
    <cube-tab-bar v-model="selectedLabel" class="tab-bar">
      <cube-tab v-for="(item) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
        <div class="tab-text">{{item.label}}</div>
      </cube-tab>
    </cube-tab-bar>
    <Transition name="slide-left">
      <router-view></router-view>
    </Transition>
  </div>
</template>

<script>
import Bussiness from '../bussiness/bussiness';
import Todos from '../todo/todo';
import Query from '../query';
import personalCenter from '../personalCenter';
import { Transition } from 'base';
export default {
  data() {
    return {
      selectedLabel: '主页',
      tabs: [
        {
          label: '主页',
          icon: 'fa fa-list-ul icon'
        },
        {
          label: '待办',
          icon: 'fa fa-check-circle-o icon'
        },
        {
          label: '查询',
          icon: 'fa fa-search icon'
        },
        {
          label: '我的',
          icon: 'fa fa-user-circle-o icon'
        }
      ]
    };
  },
  components: { Bussiness, Todos, Query, personalCenter, Transition },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeTab(label) {
      this.selectedLabel = label;
    }
  }
};
</script>
<style lang="stylus" scoped>
.page-main {
  .cube-tab-panels {
    position: fixed;
    top: 0;
    bottom: 55px;
    left: 0;
    right: 0;
    overflow-y: auto;

    .todo-relative {
      position: relative;
    }
  }

  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    overflow: hidden;
    background: #fff;

    .cube-tab {
      font-size: 16px;
      color: #000;
      font-weight: 400;

      .tab-text {
        font-size: 14px;
        margin-top: 5px;
      }

      &.cube-tab_active {
        color: #B39343;
      }
    }
  }
}
</style>

