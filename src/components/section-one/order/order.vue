<template>
    <transition name="fade">
        <div class="order">
            <v-header @back="back" @submit="submit" title="抵押接单" next="提交"></v-header>
            <form-list :list="list" :obj="obj" @pop="pop" @estate='estateShow' @datePick="datePickerShow" ref="formList"></form-list>
            <pop :options="options" ref="pop" @choosed="choosed"></pop>
            <estate ref="estate"  @submit="addEstate"></estate>
            <date-picker ref="datePicker" @submit="choosed"></date-picker>
        </div>
    </transition>
</template>
<script>
import vHeader from 'base/header/header'
import estate from 'base/estate/estate'
import {postOrder} from 'api/api'
import Scroll from 'base/scroll/scroll'
import pop from 'base/pop-up/pop-up'
import datePicker from 'base/datePicker/datePicker'
import formList from 'components/form-list/form-list'
import {selectType} from 'common/js/config'
export default {
  data(){
      return{
           list:[
                {
                    title:'',
                    items:[{
                        class:'select-wrapper',
                        type:selectType.datePick,
                        text:'完成日期',
                        key:'finish_time',
                        value:'',
                    }]
                },
                {
                    title:'借款人信息',
                    items:[{
                        class:'input-wrapper',
                        text:'客户姓名',
                        placeholder:'点击输入客户姓名',
                        value:'client_name'
                    },{
                        class:'input-wrapper',
                        text:'联系方式',
                        placeholder:'点击输入联系方式',
                        value:'client_phone'
                    },{
                        class:'input-wrapper',
                        text:'证件类型',
                        placeholder:'点击输入证件类型',
                        value:'client_id_type'
                    },{
                        class:'input-wrapper',
                        text:'证件号码',
                        placeholder:'点击输入证件号码',
                        value:'client_id_number'
                    },{
                        class:'select-wrapper',
                        text:'工作类型',
                        key:'client_work_type',
                        value:'',
                        options:['授薪','自雇']
                    },{
                        class:'input-wrapper',
                        text:'工作单位',
                        placeholder:'点击输入工作单位',
                        value:'client_work_unit'
                    }]
                },{
                    title:'借款信息',
                    items:[{
                        class:'select-wrapper',
                        text:'借款品种',
                        key:'loan_type',
                        value:'',
                        options:['抵押消费','抵押经营','信用']
                    },{
                        class:'input-wrapper',
                        text:'申请金额',
                        placeholder:'点击输入申请金额',
                        value:'loan_amount'
                    },{
                        class:'input-wrapper',
                        text:'贷款期限',
                        placeholder:'点击输入贷款期限',
                        value:'loan_period'
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
                        key:'checklist_source',
                        value:'',
                        options:['存量转货','中介介绍','老客户介绍','银行介绍','同行介绍','熟人介绍','广告','微信']
                    },{
                        class:'input-wrapper',
                        text:'备注事项',
                        placeholder:'点击输入备注事项',
                        value:'remark'
                    }]
                }
            ],
          options:[],
          estateInfo:[],
          obj:{
                id: null,
                finish_time: '',
                client_name: '',
                client_phone: '',
                client_id_type: '',
                client_id_number: '',
                client_work_type: 0,
                client_work_unit: '',
                loan_type: 0,
                loan_amount: '',
                loan_period: '',
                checklist_source: 0,
                agent_name: '',
                remark: '',
                mortgageHouses: [
                    // {
                    //     id: null,
                    //     area: '',
                    //     enquiry_result: '',
                    //     total_price: '',
                    //     checklist_id: ''
                    // }
                ]
          }
      }
  },
  methods:{
      back(){
        this.$router.back()
      },
      estateShow(){
          this.$refs.estate.show()
      },
      addEstate(estateInfo){
        //   let estate = new Estate({area,price,total})
          this.obj.mortgageHouses.push(estateInfo)
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      datePickerShow(){
        this.$refs.datePicker.toggleList()
      },
      choosed(option){
          this.$refs.formList.choosed(option)      
      },
      submit(){
          console.log(this.obj)
          postOrder(this.obj).then((res)=>{
              console.log(res)
          })
      }
  },
  components: {
      vHeader,
      estate,
      Scroll,
      pop,
      formList,
      datePicker
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


