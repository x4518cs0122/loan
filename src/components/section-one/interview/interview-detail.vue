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
                  value:''
              }]
            },{
                title:'面谈建议',
                items:[
                    {
                        class:'input-wrapper',
                        text:'拟申请机构',
                        placeholder:'点击输入拟申请机构名称',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'拟对接人',
                        placeholder:'点击输入拟对接人姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'拟上报金额',
                        placeholder:'点击输入拟上报金额',
                        value:''
                    },{
                        class:"select-wrapper",
                        text:'拟签约时间',
                        value:'',
                        type:selectType.datePick
                    },{
                        class:'input-wrapper',
                        text:'费率',
                        placeholder:'点击输入费率',
                        value:''
                    },{
                        class:"select-wrapper",
                        text:'客户还款方式',
                        value:'',
                        options:['按月等额本息','按月等额本金','按月付息']
                    },{
                        class:"select-wrapper",
                        text:'客户用途',
                        value:'',
                        options:['客户自己提供','我公司提供']
                    },{
                        class:"input-wrapper",
                        text:'调查意见',
                        placeholder:'',
                        value:''
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
          console.log(this.customer.taskId)
          let obj={
                "id": null,
          }
        //   let temp = ['proposed_institution','proposed_clerk','proposed_amount',
        //                 'proposed_time','rate','repayment_type','client_purpose_type',
        //                 'survey_opinion']
          let valueList = this.list[1].items
          obj.finish_time = this.list[0].items[1].value
          obj.proposed_institution = valueList[0].value
          obj.proposed_clerk = valueList[1].value
          obj.proposed_amount = valueList[2].value
          obj.proposed_time = valueList[3].value
          obj.repayment_type = 0
          obj.client_purpose_type = 1
          obj.client_purpose = ''
          obj.survey_opinion = valueList[6].value
          postAdvice(obj,this.customer.taskId).then((res) =>{
              if(res.status === 1){
                  this.$router.back()
              }else{
                  this.message = res.message
              }
              console.log(res)
          })
        //   console.log(obj)
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


