<template>
  <div class="interview-detail">
      <v-header @back="back" @submit="submit" next="提交" title="抵押面谈"></v-header>
      <form-list :list="list" @pop="pop" ref="formList" botton='botton' @deleteOrder="deleteOrder" @datePick="datePickerShow"></form-list>
      <pop :options="options" ref="pop" @choosed="choosed"></pop>
      <date-picker ref="datePicker" @submit="choosed"></date-picker>
      <router-view></router-view>
  </div>
</template>
<script>
import formList from 'components/form-list/form-list'
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import datePicker from 'base/datePicker/datePicker'
import {selectType} from 'common/js/config'
import {mapGetters} from 'vuex'
import {postAdvice} from 'api/api'
export default {
  data(){
      return{
          options:[],
          obj:{
            "id": null,
            "finish_time": '',
            "proposed_institution": '',
            "proposed_clerk": '',
            "proposed_amount": '',
            "proposed_time": '',
            "rate": '',
            "repayment_type": 0,
            "client_purpose_type": 0,
            "client_purpose": '',
            "survey_opinion": ''
          },
          list:[{
              title:'',
              items:[{
                  class:'normal-wrapper',
                  text:'贷款编号',
                  val:''
              },{
                  class:"select-wrapper",
                  text:'完成时间',
                  type:selectType.datePick,
                  key:'finish_time',
                  value:''
              }]
            },{
                title:'面谈建议',
                items:[
                    {
                        class:'input-wrapper',
                        text:'拟申请机构',
                        placeholder:'点击输入拟申请机构名称',
                        value:'proposed_institution'
                    },{
                        class:'input-wrapper',
                        text:'拟对接人',
                        placeholder:'点击输入拟对接人姓名',
                        value:'proposed_clerk'
                    },{
                        class:'input-wrapper',
                        text:'拟上报金额',
                        placeholder:'点击输入拟上报金额',
                        value:'proposed_amount'
                    },{
                        class:"select-wrapper",
                        text:'拟签约时间',
                        key:'proposed_time',
                        value:'',
                        type:selectType.datePick
                    },{
                        class:'input-wrapper',
                        text:'费率',
                        placeholder:'点击输入费率',
                        value:'rate'
                    },{
                        class:"select-wrapper",
                        text:'客户还款方式',
                        key:'repayment_type',
                        value:'',
                        options:['按月等额本息','按月等额本金','按月付息']
                    },{
                        class:"select-wrapper",
                        text:'客户用途',
                        key:'client_purpose_type',
                        value:'',
                        options:['客户自己提供','我公司提供']
                    },{
                        class:'input-wrapper',
                        text:'',
                        placeholder:'点击输入客户用途',
                        value:'client_purpose'
                    },{
                        class:"input-wrapper",
                        text:'调查意见',
                        placeholder:'',
                        value:'survey_opinion'
                    }
                ]
            }]
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  created(){
      this.botton = true
  },
  components:{
      formList,
      pop,
      vHeader,
      datePicker
  },
  methods:{
      back(){
          this.$router.back()
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          this.$refs.formList.choosed(option)
      },
      deleteOrder(){
          //调用删除订单api,跳转到面谈列表界面
          this.$router.back()
      },
      datePickerShow(){
          this.$refs.datePicker.toggleList()
      },
      submit(){   
          postAdvice(this.obj,this.customer.taskId).then((res) =>{
              if(res.status === 1){
                  this.$router.back()
              }else{
                  this.message = res.message
              }
          })
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .interview-detail
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        overflow hidden
        background #fff
</style>


