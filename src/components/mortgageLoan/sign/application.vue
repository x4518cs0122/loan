<template>
  <div class="application">
        <v-header @goback="goback" title="个人申请表" :next="nextTxt" @submit="next"></v-header>
        <div class="scroll">
            <!-- 个人信息 index = 1 -->   
            <div v-show="currentIndex === 1">
                <rs-list>
                    <ul slot="body">
                        <li><rs-select selectText="申请时间" model="applicationTime" @selected="selected" :isDate="true"></rs-select></li>
                        <li class="list-header">申请人信息</li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="proposerName" required></rs-input></li>
                        <li><rs-select selectText="性别" :options="options.sex" model="proposerGender"  @selected="selected"></rs-select></li>
                        <li><rs-select selectText="婚姻情况" :options="options.marriage" model="proposerMarriageState" @selected="selected" valueType="10"></rs-select></li>
                        <li><rs-select selectText="家庭结构" :options="options.family" model="proposerFamily"  @selected="selected" valueType="11"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="未成年子女个数" required model="proposerFamilyNum" 
                            v-show="obj.proposerFamily === 32" 
                            :validation="commonValidations.numberValidation" 
                            message="请输入数字"></rs-input>
                        </li>
                        <li><rs-input @input="rsinput" inputText="联系方式" 
                            placeholder="请输入手机号码" 
                            model="proposerPhone"
                            :validation="commonValidations.phoneValidation"
                            :message="messageTip.phoneMessage" required></rs-input>
                        </li>
                        <li><rs-input @input="rsinput" placeholder="请输入单位固定电话" 
                            model="proposerWorkTele"
                            :validation="commonValidations.numberValidation" ></rs-input>
                        </li>
                        <li><rs-input @input="rsinput" placeholder="请输入家庭固定电话" 
                            model="proposerHouseTele" 
                            :validation="commonValidations.numberValidation" ></rs-input>
                        </li>
                        <li><rs-select selectText="户籍类型" :options="options.household" model="proposerHouseholdType" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="身份证号" 
                            model="proposerIdCard"
                            :validation="commonValidations.idCardValidation" required></rs-input>
                        </li>
                        <li><rs-input @input="rsinput" inputText="居住状况" model="proposerInhabitingInfo" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="居住地址" model="proposerAddress" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="本地居住年限" model="proposerLocalResident" :validation="commonValidations.numberValidation" required></rs-input></li>
                        <li><rs-select selectText="住房情况" :options="options.houseState" model="proposerLodgingInfo" @selected="selected" valueType="12"></rs-select></li>
                        <li><rs-select selectText="住房是否有贷款" :options="options.houseState" model="proposerLoanState" @selected="selected" valueType="13"></rs-select></li>
                        <li><rs-select selectText="就业性质" :options="options.jobType" model="proposerJobType" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="就业年限" model="proposerWorkYear" :validation="commonValidations.numberValidation" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="月收入" model="proposerIncomeMonth" :validation="commonValidations.numberValidation" required></rs-input></li>
                    </ul>
                </rs-list>               
            </div>
                <!-- 配偶信息 index = 2 -->
            <div v-show="currentIndex === 2">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">配偶信息</li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="proposerSpouseName" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="联系方式" model="proposerSpousePhone" :validation="commonValidations.phoneValidation" :message="messageTip.phoneMessage" required></rs-input></li>
                        <li><rs-select selectText="证件类型" :options="options.creditcard" model="proposerSpousePaperType" @selected="selected" valueType="14" ></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="证件名称" model="proposerSpousePaperId" v-show="obj.proposerSpousePaperType === 3"></rs-input></li>
                        <li><rs-select selectText="是否共同申请" :options="options.shifou" model="hasProposerSpouseTogether" @selected="selected"></rs-select></li>
                    </ul>
                </rs-list>
            </div>
            <!-- 工作单位 index = 3 -->
            <div v-show="currentIndex === 3 && obj.proposerJobType === 1">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">工作单位</li>
                        <li><rs-input @input="rsinput" inputText="工作单位" model="proposerCompany" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="单位地址" model="proposerCompanyAddress" required></rs-input></li>
                        <li><rs-select selectText="单位性质" :options="options.companyType" model="proposerCompanyType" @selected="selected" valueType="15"></rs-select></li>
                        <li><rs-select selectText="职务名称" :options="options.companyType" model="proposerCompanyDuty" @selected="selected" valueType="16"></rs-select></li>
                    </ul>
                </rs-list>
            </div>
            <div v-show="currentIndex === 3 && obj.proposerJobType === 2">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">经营企业</li>
                        <li><rs-input @input="rsinput" inputText="经营主体" model="proposerBusinessLicense" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="办公地址" model="proposerBusinessAddress" required></rs-input></li>
                        <li><rs-select selectText="经营场所" :options="options.companyBelong" model="proposerBusinessPlace" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="营业执照注册号" model="proposerBusiness" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="贷款卡号" model="proposerBusinessCard" required></rs-input></li>
                    </ul>
                </rs-list>
            </div>
            <!-- 贷款信息 index = 4 -->
            <div v-show="currentIndex === 4">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">借款信息</li>
                        <li><rs-input @input="rsinput" inputText="申请金额" model="loanAmount" :validation="commonValidations.numberValidation" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="申请期限" model="loanPeriod" :validation="commonValidations.numberValidation" required></rs-input></li>
                        <li><rs-select selectText="申请授信方式" :options="options.shouxin" model="loanCreditType" @selected="selected"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="借款用途" model="loanPurpose" required></rs-input></li>
                        <li><rs-select selectText="还款方式" :options="options.repayment" model="loanRepaymentType" @selected="selected" valueType="17"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="其他" model="loanOther"></rs-input></li>
                    </ul>
                </rs-list>
            </div>
            <!-- 紧急联系人信息 index = 5 -->
            <div v-show="currentIndex === 5">
                <rs-list>
                    <ul slot="body">
                        <li class="list-header">紧急联系人信息(无法律责任)</li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="loanContactName" required></rs-input></li>
                        <li><rs-select selectText="是您的" :options="options.relation" model="loanContactRela" @selected="selected" valueType="18"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="住宅电话" model="loanContactTele" ></rs-input></li>               
                        <li><rs-input @input="rsinput" inputText="手机号码" model="loanContactPhone" required :validation="commonValidations.phoneValidation" :message="messageTip.phoneMessage"></rs-input></li>
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
import {commonValidations, messageTip} from '@/utils/Const.js'
import {postForm} from 'api/api'
export default {
  data(){
      return{
          commonValidations:commonValidations,
          messageTip:messageTip,
          currentIndex:1,
          nextTxt:'下一步',
          options:{
              sex:[{id:1,value:'男'}, {id:2, value:'女'}],
              household:[{id:1,value:'本地户籍'}, {id:2, value:'非本地户籍'}],
              jobType:[{id:1, value:'自有'},{id:2, value:'租赁'}],              
              shifou:[{id:1,value:'是'},{id:2, value:'否'}],       
              shouxin:[{id:1, value:'抵押经营'},{id:2, value:'抵押消费'}],
              companyBelong:[{id:1, value:'自有'},{id:2, value:'租赁'}],      
          },
          obj:{
            "id": null,
            "applicationTime": null,
            "proposerName": null,
            "proposerGender": null,
            "proposerMarriageState": null,
            "proposerFamily": null,
            "proposerFamilyNum": null,
            "proposerPhone": null,
            "proposerWorkTele": null,
            "proposerHouseTele": null,
            "proposerHouseholdType": null,
            "proposerIdCard": null,
            "proposerInhabitingInfo": null,
            "proposerAddress": null,
            "proposerLocalResident": null,
            "proposerLodgingInfo": null,
            "proposerLoanState": null,
            "proposerJobType": null,
            "proposerWorkYear": null,
            "proposerIncomeMonth": null,
            "proposerSpouseName": null,
            "proposerSpousePhone": null,
            "proposerSpousePaperType": null,
            "proposerSpousePaperId": null,
            "hasProposerSpouseTogether": false,
            "proposerCompany": null,
            "proposerCompanyAddress": null,
            "proposerCompanyType": null,
            "proposerCompanyDuty": null,
            "proposerBusinessLicense": null,
            "proposerBusinessAddress": null,
            "proposerBusiness": null,
            "proposerBusinessCard": null,
            "loanAmount": null,
            "loanPeriod": null,
            "loanCreditType": null,
            "loanPurpose": null,
            "loanRepaymentType": null,
            "loanOther": null,
            "loanContactName": null,
            "loanContactRela": null,
            "loanContactTele": null,
            "loanContactPhone": null
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
      selected(id, model) {
        if(model === 'applicationTime'){
            this.obj[model] = new Date(id).getTime()
            return 
        }
        this.obj[model] = parseInt(id)
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
          this.obj.hasProposerSpouseTogether === 0? false : true
          this.obj.id = this.customer.id
          try{
              this.obj.loanAmount === parseFloat(this.obj.loanAmount)
          }catch(err) {
              console.log('loanAmount类型转换错误：', err)
          }
          postForm(this.obj).then((res)=>{
              if(res.result){
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


