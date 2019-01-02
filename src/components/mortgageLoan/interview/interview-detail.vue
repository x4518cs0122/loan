<template>
  <div class="interview-detail">
      <v-header @goback="goback" @submit="submit" next="提交" title="抵押面谈"></v-header>
      <rs-list>
        <ul slot="body">
            <li class="placeholder"> </li>
            <!-- <li>

            </li> -->
            <li><rs-select selectText="完成时间" model="finishTime" @selected="selected" :isDate="true"></rs-select></li>
            <li class="placeholder"></li>
            <li><rs-input @input="rsinput" inputText="拟申请机构" model="proposedInstitution" required></rs-input></li>
            <li><rs-input @input="rsinput" inputText="拟对接人" model="proposedClerk" required></rs-input></li>
            <li><rs-input @input="rsinput" inputText="拟上报金额" 
                model="proposedAmount"
                :validation="commonValidations.numberValidation" 
                message="请输入数字"
                required></rs-input>
            </li>
            <li><rs-select selectText="拟签约时间" model="proposedTime" @selected="selected" :isDate="true"></rs-select></li>
            <li><rs-input @input="rsinput" inputText="费率" model="rate" 
                :validation="commonValidations.numberValidation" 
                message="请输入数字"
                required></rs-input>
            </li>
            <li><rs-select selectText="客户还款方式" model="repaymentType" @selected="selected" valueType="8"></rs-select></li>                  
            <li class="placeholder"></li>
            <li><rs-select selectText="客户用途" model="clientPurposeType" valueType="9"></rs-select></li>
            <li><rs-input @input="rsinput" inputText="客户用途" model="clientPurpose" required></rs-input></li>
            <li><rs-input @input="rsinput" inputText="调查意见" model="surveyOpinion"></rs-input></li>
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
import {commonValidations} from '@/utils/Const.js'
import {mapGetters} from 'vuex'
import {postAdvice,killProcess} from 'api/api'
export default {
  data(){
      return{
          commonValidations: commonValidations,
          loading:false,
          obj:{
            "finishTime": '',
            "proposedInstitution": '',
            "proposedClerk": '',
            "proposedAmount": '',
            "proposedTime": '',
            "rate": '',
            "repaymentType": 0,
            "clientPurposeType": 0,
            "clientPurpose": '',
            "surveyOpinion": ''
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
      selected(id, model) {
        if(model === 'finishTime' || model === 'proposedTime'){
            this.obj[model] = new Date(id).getTime()
            return 
        }
        this.obj[model] = parseInt(id)
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
          let rootId = this.customer.rootId
          killProcess(rootId).then((res)=>{
              if(res.result){
                  this.loading = false
                  this.goback()
              }
          })        
      },
      submit(){   
          this.obj.viewId = this.customer.id
          postAdvice(this.obj).then((res) =>{
              this.goback()
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


