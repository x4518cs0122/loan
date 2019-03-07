<template>
  <Page name="bussiness" :loading="false">
    <!-- <div class="search-wrapper"> -->
    <!-- 搜索框：可移入通用组件内 -->
    <!-- <div class="input-wrapper">
          <span class="left-search">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            v-model="query"
            @focus="changeQueryResultVisible(true)"
            @blur="changeQueryResultVisible(false)"
          >
          <div class="query-result" v-show="QueryResultVisible">
            <ul v-for="x in queryResult" :key="x.title" v-if="x.list.length">
              <li class="query-title">{{x.title}}</li>
              <li
                v-for="item in x.list"
                :key="item.meta.title"
                class="query-item"
                @click="push(item.path)"
              >
                {{item.meta.title}}
                <i class="fa fa-fighter-jet icon-fighter" aria-hidden="true"></i>
              </li>
            </ul>
            <p
              class="empty"
              v-if="query && !queryResult[0].list.length && !queryResult[1].list.length"
            >没有符合条件的结果</p>
          </div>
    </div>-->
    <!-- 公告、退出接口-->
    <div class="biz-header">
      <div class="placeholder"></div>
      <div class="location"></div>
      <div class="perform-area">
        <span class="fa icon fa-search" aria-hidden="true"></span>
        <span class="fa icon fa-bell-o" aria-hidden="true">
          <span class="active"></span>
        </span>
      </div>
      <Card :todos="todos" @changeTab="changeTab"></Card>
    </div>
    <div class="biz-content">
      <cube-tab-bar v-model="selectedLabel">
        <cube-tab v-for="(item) in tabs" :label="item.label" :key="item.label">
          <div slot="icon" class="img-wrapper" :style="{background:item.bg}">
            <img :src="item.img" width="30" height="30">
          </div>
        </cube-tab>
      </cube-tab-bar>
      <cube-tab-panels v-model="selectedLabel" class="main-action">
        <cube-tab-panel label="抵押贷款">
          <ul class="item-wrapper">
            <li class="item" v-for="x in list1" :key="x.meta.title" @click="push(x.path)">
              <div class="fa icon" :class="x.meta.icon" aria-hidden="true">
                <h2 class="text">{{x.meta.title}}</h2>
              </div>
            </li>
          </ul>
        </cube-tab-panel>
        <cube-tab-panel label="二手房贷款">
          <ul class="item-wrapper">
            <li class="item" v-for="x in list2" :key="x.meta.title" @click="push(x.path)">
              <div class="fa icon" :class="x.meta.icon" aria-hidden="true">
                <h2 class="text">{{x.meta.title}}</h2>
              </div>
            </li>
          </ul>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
  </Page>
</template>
<script>
import vHeader from './header';
import tab from 'components/tab/tab';
import Scroll from 'base/scroll/scroll';
import { Page } from 'base';
import Card from './announceCard.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { logout, getAnnouncement } from 'api/api';
export default {
  data() {
    return {
      list1: [],
      list2: [],
      QueryResultVisible: false,
      queryResult: [
        {
          title: '抵押贷款',
          list: []
        },
        {
          title: '二手房贷款',
          list: []
        }
      ],
      query: '',
      /** new feature */
      selectedLabel: '抵押贷款',
      tabs: [
        {
          label: '抵押贷款',
          icon: 'cubeic-like',
          bg: '#A9CEFF',
          img: '../../../static/images/mortgage.png'
        },
        {
          label: '二手房贷款',
          icon: 'cubeic-star',
          bg: '#FFDDDD',
          img: '../../../static/images/erHouse.png'
        }
      ]
    };
  },
  components: {
    Scroll,
    tab,
    vHeader,
    Page,
    Card
  },
  created() {
    this.normalizeRouters();
    this.getAnnounces();
    this.getTodos();
  },
  methods: {
    push(router) {
      this.$router.push({ path: `${router}` });
    },
    normalizeRouters() {
      let routers = this.permission_routers;
      let list1 = [];
      let list2 = [];
      routers.forEach(route => {
        if (!route.hidden) {
          if (route.name.substr(0, 2) != 'er') {
            list1.push(route);
          } else {
            list2.push(route);
          }
        }
      });
      this.list1 = list1;
      this.list2 = list2;
    },
    changeQueryResultVisible(show) {
      this.QueryResultVisible = show;
    },
    resetQueryResult() {
      this.queryResult = [
        {
          title: '抵押贷款',
          list: []
        },
        {
          title: '二手房贷款',
          list: []
        }
      ];
    },
    logout() {
      logout().then(() => {
        this.$router.push({ path: '/login' });
      });
    },
    /** new methods */
    changeTab() {
      this.$emit('changeTab', '待办');
    },
    ...mapActions(['getAnnounces', 'getTodos'])
  },
  computed: {
    ...mapGetters(['permission_routers', 'announces', 'todos'])
  },
  watch: {
    query(newValue) {
      if (newValue === '') {
        this.resetQueryResult();
        return;
      }
      let temp1 = this.list1.filter(item => {
        return item.meta.title.indexOf(newValue) > -1;
      });
      let temp2 = this.list2.filter(item => {
        return item.meta.title.indexOf(newValue) > -1;
      });
      // if(temp1.length || temp2.length) {
      this.queryResult = [
        {
          title: '抵押贷款',
          list: temp1
        },
        {
          title: '二手房贷款',
          list: temp2
        }
      ];
      // }else {
      //   this.resetQueryResult()
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.page-bussiness {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $pure-white;

  /* * 头部区域 */
  .biz-header {
    position: relative;
    flex-basis:230px;
    flex-shrink:0;
    flex-grow:0;

    .placeholder {
      width: 100%;
      height: 150px;
      background: url('../../../static/images/background.png') no-repeat;
      background-size: 100% 150px;
      // background-position:0 30px;
    }

    .perform-area {
      position: absolute;
      top: 10px;
      right: 0;
      width: 80px;
      text-align: right;
      font-size: $font-size-medium-x;

      .icon {
        position: relative;
        color: $pure-white;
        margin-right: 10px;

        .active {
          position: absolute;
          top: 0;
          right: 0;
          margin: 2px;
          display: inline-block;
          height: 6px;
          width: 6px;
          background: $bello-active;
          border-radius: 50%;
        }
      }
    }
  }

  .biz-content {
    flex-shrink: 1;
    flex-grow: 1;
  }

  .search-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    display: flex;
    padding: 5px 0;
    align-items: center;

    .input-wrapper {
      position: relative;
      flex-shrink: 1;
      flex-grow: 1;
      display: flex;
      border: 1px solid $pure-white;
      border-radius: 10px;
      line-height: 22px;
      height: 22px;
      padding: 1px 20px 1px 5px;
      margin-left: 10px;

      .left-search {
        color: $pure-white;
      }

      input {
        flex-shrink: 1;
        flex-grow: 1;
        color: $pure-white;
        padding-left: 10px;
        background: rgb(207, 18, 43);
        outline: none;
        opacity: 0;
        font-size: $font-size-small;
      }

      .query-result {
        position: absolute;
        top: 20px;
        left: 0;
        width: 100%;
        min-height: 20px;
        z-index: 101;
        padding: 5px;
        box-sizing: border-box;
        background: $pure-white;
        box-shadow: 1px 2px #ededed;

        .query-title {
          font-size: $font-size-medium;
        }

        .query-item {
          font-size: $font-size-small;
          padding: 5px 15px;

          .icon-fighter {
            float: right;
            color: #8A2BE2;
          }
        }

        .empty {
          font-size: $font-size-small;
          color: #222;
          padding-left: 20px;
        }
      }
    }
  }

  .cube-tab-bar {
    .img-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
      border-radius: 25px;
    }

    .cube-tab {
      font-size: 14px;
      color: $color-text-ll;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .cube-tab_active {
      color: $base-golden;
    }
  }

  .main-action {
    margin-top: 20px;

    .action-tab {
      font-size: 14px;
      padding-left: 30px;
      margin-top: 20px;
    }

    .item-wrapper {
      margin-top: 20px;
      display: inline-block;
      width: 100%;

      .item {
        display: inline-block;
        width: 25%;
        height: 70px;
        text-align: center;
        font-size: 20px;
        color: $base-golden;

        .text {
          font-size: $font-size-small;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>


