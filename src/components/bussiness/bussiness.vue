<template>
  <div class="bussiness">
        <div class="content">
          <div class="search-wrapper">
            <!-- 搜索框：可移入通用组件内 -->
            <div class="input-wrapper">
              <span class="left-search">
                <i class="fa fa-search" aria-hidden="true"></i>
              </span>
              <input type="text" placeholder="日晟行" v-model="query" 
                  @focus="changeQueryResultVisible(true)"
                  @blur="changeQueryResultVisible(false)">
              <div class="query-result" v-show="QueryResultVisible">
                <ul v-for="x in queryResult" :key="x.title" v-if="x.list.length">
                  <li class="query-title">{{x.title}}</li>
                  <li v-for="item in x.list" :key="item.meta.title" class="query-item" @click="push(item.path)">
                    {{item.meta.title}}
                    <i class="fa fa-fighter-jet icon-fighter" aria-hidden="true"></i>
                  </li>
                </ul>
                <p class="empty" v-if="query && !queryResult[0].list.length && !queryResult[1].list.length">没有符合条件的结果</p>
              </div>
            </div>
            <!-- 公告、退出接口-->
            <span class="news">
              <span class="fa icon fa-bell-o" aria-hidden="true" @click="_getAnnounce">
                  <span class="active"></span>
              </span>
              <i class="fa fa-sign-out" aria-hidden="true" @click="logout"></i>
            </span>
          </div>
          <div class="placeholder"></div>
          <div class="linear-background"></div>
          <div class="main-action">
            <p class="action-tab">抵押贷款</p>
            <ul class="item-wrapper">
              <li class="item" v-for="x in list1" :key="x.meta.title" @click="push(x.path)">
                  <div class="fa icon" :class="x.meta.icon" aria-hidden="true">
                      <h2 class="text">{{x.meta.title}}</h2>
                  </div>                  
              </li>
            </ul>
          </div>
          <div class="main-action">
            <p class="action-tab">二手房贷款</p>
            <ul class="item-wrapper">
              <li class="item" v-for="x in list2" :key="x.meta.title" @click="push(x.path)">
                  <div class="fa icon" :class="x.meta.icon" aria-hidden="true">
                      <h2 class="text">{{x.meta.title}}</h2>
                  </div>                  
              </li>
            </ul>
          </div>
        </div>
        
        <tab></tab>
  </div>
</template>
<script>
import vHeader from './header';
import tab from 'components/tab/tab';
import Scroll from 'base/scroll/scroll';
import {mapGetters} from 'vuex';
import {logout, getAnnouncement} from 'api/api'
export default {
  data() {
    return {
      list1:[],
      list2:[],
      QueryResultVisible: false,
      queryResult:[{
          title:'抵押贷款',
          list:[]
        },{
          title:'二手房贷款',
          list:[]
        }],
      query: ''
    };
  },
  components: {
    Scroll,
    tab,
    vHeader,
  },
  created() {
    this.normalizeRouters();
  },
  methods: {   
    push(router) {
      this.$router.push({path: `${router}`});
    },
    normalizeRouters(route) {
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
      this.QueryResultVisible = show
    },
    resetQueryResult() {
      this.queryResult = [{
          title:'抵押贷款',
          list:[]
        },{
          title:'二手房贷款',
          list:[]
        }]
    },
    logout() {
      logout().then(() =>{
        this.$router.push({path: '/login'})
      })
    },
    _getAnnounce() {
      getAnnouncement().then(res =>{
        console.log(res.data)
      })
    }
  },
  computed: {
    ...mapGetters(['permission_routers']),
  },
  watch: {
    query(newValue) {
      if(newValue === ''){
        this.resetQueryResult()
        return
      }
      let temp1 = this.list1.filter(item => {
        return item.meta.title.indexOf(newValue) > -1
      })
      let temp2 = this.list2.filter(item => {
        return item.meta.title.indexOf(newValue) > -1
      })
      // if(temp1.length || temp2.length) {
        this.queryResult = [{
          title:'抵押贷款',
          list:temp1
        },{
          title:'二手房贷款',
          list:temp2
        }]
      // }else {
      //   this.resetQueryResult()
      // }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.bussiness {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  overflow auto
  background: $pure-white;
    .content {
      position: relative;
      margin-bottom: 80px;
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
          flex-shrink:1;
          flex-grow: 1;
          display: flex;
          border: 1px solid $pure-white;
          border-radius: 10px;
          line-height: 22px;
          height: 22px;
          padding:1px 20px 1px 5px;
          margin-left: 10px;
          .left-search {
            color: $pure-white;
          }
          input {
            flex-shrink:1;
            flex-grow: 1;
            color: $pure-white;
            padding-left: 10px;
            background: #ADD8E6;
            outline: none;
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
            box-shadow: 1px 2px #ededed
            .query-title {
              font-size: $font-size-medium;
            }
            .query-item {
              font-size: $font-size-small;
              padding: 5px 15px;
              // border-bottom: 1px solid #ededed

              .icon-fighter {
                float: right;  
                // padding-right: 5px;
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
        
        .news {
          width: 80px;
          text-align: right;
          padding-right: 10px;
          font-size: $font-size-medium-x;
          .icon{
            position relative; 
            margin-right: 15px;
            color: $pure-white;
            .active {
                position absolute
                top 0
                right 0
                margin 2px
                display inline-block
                height 6px
                width 6px
                background $bello-active
                border-radius 50%
            }
          }         
        }
      }
      .placeholder {
        width: 100%;
        height: 40px;
        background: #ADD8E6;
      }
      .linear-background {
        width: 100%;
        height: 50px;
        background: -webkit-linear-gradient(#ADD8E6, $pure-white); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#ADD8E6, $pure-white); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#ADD8E6, $pure-white); /* Firefox 3.6 - 15 */
        background: linear-gradient(#ADD8E6, $pure-white);
      }
      .main-action {
        .action-tab {
          // text-align: center;
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
            .text {
              font-size: $font-size-small;
              margin-top: 10px; 
              color: #000; 
            }
            /** 图标颜色设置 */
            // .fa-handshake-o {
            //   color: #B0171F
            // } 
            // .fa-coffee {
            //   color: #00C78C
            // }
            // .fa-files-o {
            //   color: #E3CF57
            // }
            // .fa-calculator {
            //   color: #03A89E
            // }
            // .fa-pencil {
            //   color: #CD6600
            // }
            // .fa-university {
            //   color: #03A89E
            // }
            // .fa-diamond {
            //   color: #8A2BE2
            // }
            // .fa-money {

            // }
          }  
        }
      }
      
    }

}

// .bussiness {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     z-index: 100;
//     overflow auto
//     background: $pure-white;

//     .scroll {
//         position: absolute;
//         top: 50px;
//         bottom: 77px;
//         left: 0;
//         right: 0;
//         overflow: auto;

//         .item-wrapper {
//             display: inline-block;
//             width: 100%;

//             .title {
//                 padding-left: 20px;
//                 font-size: $font-size-medium-x;
//                 color: $color-text-l;
//             }

//             .item {
//                 text-align: center;
//                 display: inline-block;
//                 width: 33%;
//                 height: 50px;
//                 margin-bottom: 20px;

//                 .icon {
//                     font-size: 25px;
//                     color: #868686;

//                     .text {
//                         padding-top: 5px;
//                         color: $color-text-l;
//                         font-size: $font-size-medium;
//                     }
//                 }
//             }
//         }
//     }
// }
</style>


