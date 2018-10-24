<template>
  <div class="application">
        <v-header @goback="goback" title="个人申请表" :next="nextTxt" @submit="next"></v-header>
        <div class="scroll">
            <!-- 个人信息 index = 1 -->   
            <div v-show="currentIndex === 1">
                <rs-list>
                    <ul slot="body">
                        <li><rs-select selectText="申请时间" model="application_time" @selected="selected" :isDate="true"></rs-select></li>
                        <li class="list-header">申请人信息</li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="proposer_name"></rs-input></li>
                        <li><rs-select selectText="性别" :options="options.sex" model="proposer_gender" @selected="selected"></rs-select></li>
                        <li><rs-select selectText="婚姻情况" :options="options.marriage" model="proposer_marriage_state" @selected="selected"></rs-select></li>
                        <li><rs-select selectText="家庭结构" :options="options.family" model="proposer_family" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="联系方式" model="proposer_phone"></rs-input></li>
                        <li><rs-select selectText="户籍类型" :options="options.household" model="proposer_household_type" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="身份证号" model="proposer_id_card"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="居住状况" model="proposer_inhabiting_info"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="居住地址" model="proposer_address"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="本地居住年限" model="proposer_local_resident"></rs-input></li>
                        <li><rs-select selectText="住房情况" :options="options.houseState" model="proposer_lodging_info" @selected="selected"></rs-select></li>
                        <li><rs-select selectText="就业性质" :options="options.jobType" model="proposer_job_type" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="就业年限" model="proposer_work_year"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="月收入" model="proposer_income_month"></rs-input></li>
                    </ul>
                </rs-list>               
            </div>
                <!-- 配偶信息 index = 2 -->
            <div v-show="currentIndex === 2">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">配偶信息</li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="proposer_spouse_name"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="联系方式" model="proposer_spouse_phone"></rs-input></li>
                        <li><rs-select selectText="证件类型" :options="options.creditcard" model="proposer_spouse_paper_type" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="证件名称" model="proposer_spouse_paper_id" v-show="obj.proposer_spouse_paper_type === 3"></rs-input></li>
                        <li><rs-select selectText="是否共同申请" :options="options.shifou" model="has_proposer_spouse_together" @selected="selected"></rs-select></li>
                    </ul>
                </rs-list>
            </div>
            <!-- 工作单位 index = 3 -->
            <div v-show="currentIndex === 3 && obj.proposer_job_type === 0">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">工作单位</li>
                        <li><rs-input @input="rsinput" inputText="工作单位" model="proposer_company"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="单位地址" model="proposer_company_address"></rs-input></li>
                        <li><rs-select selectText="单位性质" :options="options.companyType" model="proposer_company_type" @selected="selected"></rs-select></li>
                    </ul>
                </rs-list>
            </div>
            <div v-show="currentIndex === 3 && obj.proposer_job_type === 1">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">经营企业</li>
                        <li><rs-input @input="rsinput" inputText="经营主体" model="proposer_business_license"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="办公地址" model="proposer_business_address"></rs-input></li>
                        <li><rs-select selectText="经营场所" :options="options.companyBelong" model="proposer_company_type" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="营业执照注册号" model="proposer_business"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="贷款卡号" model="proposer_business_card"></rs-input></li>
                    </ul>
                </rs-list>
            </div>
            <!-- 贷款信息 index = 4 -->
            <div v-show="currentIndex === 4">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">借款信息</li>
                        <li><rs-input @input="rsinput" inputText="申请金额" model="loan_amount"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="申请期限" model="loan_period"></rs-input></li>
                        <li><rs-select selectText="申请授信方式" :options="options.shouxin" model="loan_credit_type" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="借款用途" model="loan_purpose"></rs-input></li>
                        <li><rs-select selectText="还款方式" :options="options.repayment" model="loan_repayment_type" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="其他" model="loan_other"></rs-input></li>
                    </ul>
                </rs-list>
            </div>
            <!-- 紧急联系人信息 index = 5 -->
            <div v-show="currentIndex === 5">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">紧急联系人信息(无法律责任)</li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="loan_contact_name"></rs-input></li>
                        <li><rs-select selectText="是您的" :options="options.relation" model="loan_contact_rela" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="住宅电话" model="loan_contact_tele"></rs-input></li>               
                        <li><rs-input @input="rsinput" inputText="手机号码" model="loan_contact_phone"></rs-input></li>
                    </ul>
                </rs-list>
            </div>
        </div>
  </div>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsSelect from 'base/rsselect/rsselect'
import rsInput from 'base/rsinput/rsinput'
import { mapGetters } from 'vuex'
import {postForm} from 'api/api'
export default {
  data(){
      return{
          currentIndex:1,
          nextTxt:'下一步',
          options:{
              sex:[{key:0,value:'男'}, {key:1, value:'女'}],
              marriage:[{key:0,value:'未婚'}, {key:1, value:'已婚'},{key:2,value:'离异'}, {key:3, value:'丧偶'}],
              family:[{key:0,value:'有子女都成年'}, {key:1, value:'有未成年子女'},{key:2,value:'无子女'}],
              household:[{key:0,value:'本地户籍'}, {key:1, value:'非本地户籍'}],
              houseState:[{key:0,value:'本地有房(无贷款)'}, {key:1, value:'本地有房(有贷款)'},{key:2,value:'异地有住房(无贷款)'}, {key:3, value:'异地有住房(有贷款)'},{key:4, value:'无自有住房'}],
              jobType:[{key:0, value:'自有'},{key:1, value:'租赁'}],
              creditcard:[{key:0,value:'身份证'}, {key:1, value:'临时身份证'},{key:2,value:'户口簿'},{key:3, value:'其他'}],
              shifou:[{key:0,value:'是'},{key:1, value:'否'}],
              companyType:[{key:0, value:'事业/机关'},{key:1, value:'国有'},{key:2, value:'私营'},{key:3, value:'股份'}],
              shouxin:[{key:0, value:'抵押经营'},{key:1, value:'抵押消费'}],
              companyBelong:[{key:0, value:'自有'},{key:1, value:'租赁'}],
              repayment:[{key:0, value:'按月付息到期还本'},{key:1, value:'按月等额还息'},{key:2, value:'按月等额本金'}],
              relation:[{key:0, value:'父母'},{key:1, value:'子女'},{key:2, value:'其他'}]
          },
          obj:{
            "id": null,
            "application_time": null,
            "proposer_name": null,
            "proposer_gender": 0,
            "proposer_marriage_state": 0,
            "proposer_family": 0,
            "proposer_family_num": 0,
            "proposer_phone": null,
            "proposer_work_tele": null,
            "proposer_house_tele": null,
            "proposer_household_type": 0,
            "proposer_id_card": null,
            "proposer_inhabiting_info": null,
            "proposer_address": null,
            "proposer_local_resident": null,
            "proposer_lodging_info": 0,
            "proposer_loan_state": 0,
            "proposer_job_type": 0,
            "proposer_work_year": null,
            "proposer_income_month": null,
            "proposer_spouse_name": null,
            "proposer_spouse_phone": null,
            "proposer_spouse_paper_type": 0,
            "proposer_spouse_paper_id": null,
            "has_proposer_spouse_together": false,
            "proposer_company": null,
            "proposer_company_address": null,
            "proposer_company_type": 0,
            "proposer_company_duty": 0,
            "proposer_business_license": null,
            "proposer_business_address": null,
            "proposer_business": null,
            "proposer_business_card": null,
            "loan_amount": null,
            "loan_period": null,
            "loan_credit_type": 0,
            "loan_purpose": null,
            "loan_repayment_type": 0,
            "loan_other": null,
            "loan_contact_name": null,
            "loan_contact_rela": 0,
            "loan_contact_tele": null,
            "loan_contact_phone": null
            },
      }
  },
  components:{
      rsSelect,
      rsList,
      rsInput,
      vHeader
  },
  methods:{
      init(){
          if(!this.customer.id){
              this.$router.push({path:'/interview'})
          }
      },
      goback(){
          this.currentIndex>1? this.currentIndex--:this.$router.push({path:`/sign/${this.customer.taskId}`})       
      },
      selected(key, model) {
          this.obj[model] = key
      },
      rsinput(value, model) {
          this.obj[model] = value
      },
      next(){
          if(this.currentIndex === 5){
              this.submit()
            // console.log(this.obj)
          }else{
              this.currentIndex +=1
          }    
      },
      submit(){
          this.obj.has_proposer_spouse_together === 0? false : true
          let taskId = this.customer.taskId
          postForm(this.obj,taskId).then((res)=>{
              if(res.status === 1){
                  this.$router.push({path:`/sign`})
              }
          })
      },
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  watch: {
    currentIndex(newIndex){
        if(newIndex === 5){
            this.nextTxt = '保存'
        }else{
            this.nextTxt = '下一页'
        }
    } 
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.application
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    background $color-background
    overflow auto
                    
</style>


