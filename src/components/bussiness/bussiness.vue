<template>
  <div class="bussiness" >
        <v-header :title="title" :icon="icon"></v-header> 
        <Scroll ref="scroll" class="scroll">
            <el-collapse v-model="activeNames" @change="handleChange" >
                <el-collapse-item v-for="item in group" :key="item.title" :name="item.id" class="item-wrapper">
                    <template slot="title">
                        <span class="title">{{item.title}}</span>
                    </template>
                    <ul>
                        <li class="item" v-for="x in item.items" :key="x.router" @click="push(x.router)">
                            <div class="fa icon" :class="x.icon" aria-hidden="true">
                                <h2 class="text">{{x.item}}</h2>
                            </div>                  
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </Scroll>
        <tab></tab>
  </div>
</template>
<script>
import Nav from 'components/nav/nav'
import vHeader from 'base/header/header'
import tab from 'components/tab/tab'
import Scroll from 'base/scroll/scroll'
export default {
  data(){
      return{
          group:[{
            title:'抵押贷款',
            id:'1',
            items:[
                {
                    'item': '接单',
                    'icon': 'fa-handshake-o',
                    'router': 'order'
                },
                {
                    'item': '面谈',
                    'icon': 'fa-coffee',
                    'router': 'interview'
                },
                {
                    'item': '面签',
                    'icon': 'fa-files-o',
                    'router': 'sign'
                },
                {
                    'item': '评估下单',
                    'icon': 'fa-calculator',
                    'router': 'evaluate'
                },
                {
                    'item': '审批',
                    'icon': 'fa-pencil',
                    'router': 'approve'
                },
                {
                    'item': '抵押',
                    'icon': 'fa-university',
                    'router': 'mortgage'
                },
                {
                    'item': '放款',
                    'icon': 'fa-money',
                    'router': 'getmoney'
                }
                ], 
                },{
                    title:'二手房贷款',
                    id:'2', 
                    items:[
                        {
                            'item': '接单',
                            'icon': 'fa-handshake-o',
                            'router':'erOrder'
                        },
                        {
                            'item': '面签',
                            'icon': 'fa-files-o',
                            'router':'erSign'
                        },
                        {
                            'item': '评估下单',
                            'icon': 'fa-calculator',
                            'router':'erEvaluate'
                        },
                        {
                            'item': '整件输机',
                            'icon': 'fa-laptop',
                            'router':'erWrite'
                        },
                        {
                            'item': '审批',
                            'icon': 'fa-pencil',
                            'router':'erApprove'
                        },
                        {
                            'item': '过户',
                            'icon': 'fa-building-o',
                            'router':'erGuohu'
                        },
                        {
                            'item': '抵押',
                            'icon': 'fa-university',
                            'router':'erMortgage'
                        },
                        {
                            'item': '收费',
                            'icon': 'fa-newspaper-o',
                            'router':'erCharge'
                        },
                        {
                            'item': '担保',
                            'icon': 'fa-gavel',
                            'router':'erGuarantee'
                        },
                        {
                            'item': '放款',
                            'icon': 'fa-money',
                            'router':'erMoney'
                        }
                    ]
                }
            ],
          show:true,
          icon:'fa-bell-o',
          title:'业务办理',
          activeNames:['1']
      }
  },
  components:{
      Scroll,
      Nav,
      tab,
      vHeader
  },
  methods:{
      handleChange(val){
          this.$refs.scroll.refresh()
          console.log(sessionStorage.getItem("token"))
      },
      push(router) {
        this.$router.push({path:`/${router}`})
      }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .bussiness
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        z-index 100
        overflow hidden   
        .scroll
            position absolute
            top 52px
            bottom 77px
            left 0
            right 0
            overflow hidden
        .item-wrapper
            display inline-block
            width 100% 
            .title
                padding-left 20px
                font-size $font-size-medium-x
                color $color-text-l
            .item
                text-align center
                display inline-block
                width 33%
                height 50px
                margin-bottom 20px
                .icon
                    font-size 25px
                    color #868686
                    .text
                        padding-top 5px
                        color $color-text-l
                        font-size $font-size-medium
</style>


