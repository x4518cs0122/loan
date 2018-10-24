<template>
  <div class="interview-detail">
      <v-header @goback="goback" @submit="submit" next="提交" title="抵押面谈"></v-header>
      <rs-list>
        <ul slot="body">
            <li class="placeholder"> </li>
            <!-- <li>

            </li> -->
            <li><rs-select selectText="完成时间" model="finish_time" @selected="selected" :isDate="true"></rs-select></li>
            <li class="placeholder"></li>
            <li><rs-input @input="rsinput" inputText="拟申请机构" model="proposed_institution"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="拟对接人" model="proposed_clerk"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="拟上报金额" model="proposed_amount"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="拟签约时间" model="proposed_time"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="费率" model="rate"></rs-input></li>
            <li><rs-select selectText="客户还款方式" :options="options.repayment" model="repayment_type" @selected="selected"></rs-select></li>                  
            <li class="placeholder"></li>
            <li><rs-select selectText="客户用途" model="client_purpose_type" :options="options.purpose_type"></rs-select></li>
            <li><rs-input @input="rsinput" inputText="客户用途" model="client_purpose"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="调查意见" model="survey_opinion"></rs-input></li>
        </ul>
        <div class="suspend" slot="footer">
            <el-button type="danger" plain @click="deleteOrder">废单</el-button>
        </div>
        
      </rs-list>
  </div>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsInput from 'base/rsinput/rsinput'
import rsSelect from 'base/rsselect/rsselect'
import {mapGetters} from 'vuex'
import {postAdvice,suspendOrder} from 'api/api'
export default {
  data(){
      return{
          options:{
              repayment:[{key:0, value:'按月等额本息'},{key:1, value:'按月等额本金'},{key:2, value:'按月付息'}],
              purpose_type:[{key:0, value:'客户自己提供'},{key:1, value:'我公司提供'}]
          },
          loading:false,
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
          }
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  components:{vHeader, rsSelect, rsInput, rsList},
  methods:{
      selected(key, model) {
          this.obj[model] = key
      },
      goback() {      
          this.$router.push({path:`/interview`})
      },
      rsinput(value, model) {
          this.obj[model] = value
      },
      deleteOrder(){
          //调用删除订单api,跳转到面谈列表界面
          this.loading = true
          let date = new Date()
          let time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
          let taskId = this.customer.taskId
        //   console.log(time+'$$'+taskId)
          suspendOrder(time,taskId).then((res)=>{
              if(res.status === 1){
                //   console.log(res)
                  this.loading = false
                  this.goback()
              }
          })        
      },
      submit(){   
          postAdvice(this.obj,this.customer.taskId).then((res) =>{
              if(res.status === 1){
                  this.goback()
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
        .suspend
            margin-top: 20px
            padding 20px
</style>


