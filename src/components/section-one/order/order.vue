<template>
    <transition name="fade">
        <div class="order">
            <v-header @back="back" @submit="submit" next="确定"></v-header>
            <!-- <Scroll class="order-content" :data="estateInfo">
                <div>
                    <div class="section">
                        <div class="date">
                            <span class="text">完成日期</span>
                            <span class="date-picker">选择接单完成时间</span>
                            <span class="fa fa-chevron-right icon" aria-hidden="true"></span>
                        </div>
                        <div class="item">
                            <span class="text">客户姓名</span>
                            <input type="text" v-model="name" placeholder="点击输入客户姓名">
                        </div>
                        <div class="item">
                            <span class="text">联系方式</span>
                            <input type="text" v-model="phone" placeholder="点击输入联系方式">
                        </div>
                        <div class="item">
                            <span class="text">证件类型</span>
                            <input type="text" v-model="cardType" placeholder="点击输入证件类型">
                        </div>
                        <div class="item">
                            <span class="text">证件号码</span>
                            <input type="text" v-model="cardNum" placeholder="点击输入对应证件号码">
                        </div>
                        <div class="item" @click="popUpShow(jobType,'job')">
                            <span class="text">工作类型</span>
                            <span class="choosed" ref="job"></span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div class="item">
                            <span class="text">工作单位</span>
                            <input type="text" v-model="address" placeholder="点击输入工作单位">
                        </div>
                    </div>
                    <div class="section">
                        <div class="item firstItem" @click="popUpShow(jiekuan,'type')">
                            <span class="text">借款品种</span>
                            <span class="choosed" ref="type"></span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div class="item">
                            <span class="text">申请贷款金额</span>
                            <input type="text" v-model="num" placeholder="点击输入申请贷款金额">
                        </div>
                        <div class="item">
                            <span class="text">申请贷款期限</span>
                            <input type="text" v-model="deadline" placeholder="点击输入申请贷款期限">
                        </div>
                    </div>
                    <div class="section">
                        <div class="item firstItem" @click="estateShow">
                            <span class="text">房产信息</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <ul v-show="estateInfo.length">
                            <li class="info-item" v-for="(item,index) in estateInfo" :key="index">
                                <span>{{index+1}}. 总面积:{{item.area}}平方米 / 单价:{{item.price}}(每平米) / 共计:{{item.total}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="section">
                        <div class="item firstItem" @click="popUpShow(from,'from')">
                            <span class="text">单子来源</span>
                            <span class="choosed" ref="from"></span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                    </div> 
                    <div class="addition">
                        <p class="text">备注事项</p>
                        <textarea rows="3" placeholder="请输入注意事项">
                        </textarea>
                    </div>   
                </div>
            </Scroll>  -->
            <form-list :list="list" @pop="pop" @estate='estateShow' ref="formList"></form-list>
            <pop :options="options" ref="pop" @choosed="choosed"></pop>
            <estate ref="estate" @submit="addEstate"></estate>
        </div>
    </transition>
</template>
<script>
import vHeader from 'base/header/header'
import estate from 'base/estate/estate'
import Estate from 'common/js/estate'
import Scroll from 'base/scroll/scroll'
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
import {selectType} from 'common/js/config'
export default {
  data(){
      return{
           list:[
                {
                    title:'借款人信息',
                    items:[{
                        class:'input-wrapper',
                        text:'客户姓名',
                        placeholder:'点击输入客户姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'联系方式',
                        placeholder:'点击输入联系方式',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'证件类型',
                        placeholder:'点击输入证件类型',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'证件号码',
                        placeholder:'点击输入证件号码',
                        value:''
                    },{
                        class:'select-wrapper',
                        type:selectType.option,
                        text:'工作类型',
                        value:'',
                        options:['授薪','自雇']
                    }]
                },{
                    title:'借款信息',
                    items:[{
                        class:'select-wrapper',
                        type:selectType.option,
                        text:'借款品种',
                        value:'',
                        options:['抵押消费','抵押经营','信用']
                    },{
                        class:'input-wrapper',
                        text:'申请金额',
                        placeholder:'点击输入申请金额',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'贷款期限',
                        placeholder:'点击输入贷款期限',
                        value:''
                    }]
                },{
                    title:"房产信息",
                    items:[{
                        class:'select-wrapper',
                        type:selectType.estate,
                        text:'房产信息',
                        value:'',
                    }]
                },{
                    title:"其它",
                    items:[{
                        class:'select-wrapper',
                        type:selectType.option,
                        text:'单子来源',
                        value:'',
                        options:['存量转货','中介介绍','老客户介绍','银行介绍','同行介绍','熟人介绍','广告','微信']
                    },{
                        class:'input-wrapper',
                        text:'备注事项',
                        placeholder:'点击输入备注事项',
                        value:''
                    }]
                }
            ],
          options:[],
          jobType:['授薪','自雇'],
          jiekuan:['借款消费','抵押经营','信用'],
          
      }
  },
  methods:{
      back(){
        this.$router.back()
      },
      estateShow(){
          this.$refs.estate.show()
      },
      addEstate(area,price,total){
          let estate = new Estate({area,price,total})
          this.estateInfo.push(estate)
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          this.$refs.formList.choosed(option)
      },
      submit(){

      }
  },
  components: {
      vHeader,
      estate,
      Scroll,
      pop,
      formList
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .order
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background #fff
        overflow hidden
        &.fade-enter-active, &.fade-leave-active 
            transition: all .3s
        &.fade-enter, &.fade-leave-to 
            transform translate3d(100%,0,0)
        .order-content
            position absolute
            top 52px
            bottom 0
            left 0
            right 0
            overflow hidden
            .section
                margin-bottom 20px
                font-size $font-size-medium
                .date
                    display flex
                    padding 15px 20px
                    border-bottom 1px solid $color-border
                    .text
                        flex 1
                    .date-picker
                        flex 0 0 122px
                        color $color-theme
                    .icon
                        flex 0 0 16px
                        color $color-icon-right
                        font-size $font-size-medium-x
                .item
                    padding 0 20px
                    display flex
                    height 45px
                    line-height 45px
                    align-items center
                    border-bottom 1px solid $color-border
                    &.firstItem
                        border-top 1px solid $color-border
                    .text
                        flex 0 0 90px
                    input
                        flex 1
                        color $color-text-ll
                        outline:none
                    .icon
                        flex 1
                        text-align right
                        color $color-icon-right
                        font-size $font-size-medium-x
                .info-item
                    font-size $font-size-small
                    margin-left 20px
                    padding 5px 0px
                    border-bottom 1px solid $color-border
                    color $color-text-l
            .addition
                padding 0 20px
                margin 10px 0
                .text 
                    font-size $font-size-medium
                textarea
                    width 100%
                    border none 
                    resize none
                    outline none
</style>


