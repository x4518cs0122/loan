<template>
  <div class="application">
        <v-header @back="back" title="个人申请表" next="下一步" @submit="next"></v-header>
        <div class="scroll">
                <!-- 个人信息 index = 1 -->   
            <div v-show="currentIndex === 1">
                <form-list :list="userInfo" :obj="obj" @pop="pop" @datePick="datePickerShow" ref="formList"></form-list>
            </div>
                <!-- 配偶信息 index = 2 -->
            <div v-show="currentIndex === 2">
                <form-list :list="partnerInfo" :obj="obj" @pop="pop" @datePick="datePickerShow" ref="formList2"></form-list>  
            </div>
            <!-- 工作单位 index = 3 -->
            <div v-show="currentIndex === 3">
                <form-list :list="jobInfo" :obj="obj" @pop="pop" @datePick="datePickerShow" ref="formList3"></form-list>  
            </div>
            <!-- 贷款信息 index = 4 -->
            <div v-show="currentIndex === 4">
                <form-list :list="loanInfo" :obj="obj" @pop="pop" @datePick="datePickerShow" ref="formList4"></form-list> 
            </div>
            <!-- 紧急联系人信息 index = 5 -->
            <div v-show="currentIndex === 5">
                <form-list :list="emergencyInfo" :obj="obj" @pop="pop" @datePick="datePickerShow" ref="formList5"></form-list>  
            </div>
        </div>
        <popUp :options="options" ref="pop" @choosed="choosed"></popUp>
        <date-picker ref="datePicker" @submit="choosed"></date-picker>
  </div>
</template>
<script>
import popUp from 'base/pop-up/pop-up'
import { mapGetters } from 'vuex'
import datePicker from 'base/datePicker/datePicker'
import formList from 'components/form-list/form-list'
import {selectType} from 'common/js/config'
export default {
  data(){
      return{
          currentIndex:1,
          currentItem:{},
          userInfo:[
                {
                    title:"客户信息",
                    items:[{
                        class:'select-wrapper',
                        text:'申请日期',
                        type:selectType.datePick,
                        key:'application_time',
                        value:'选择申请日期',
                        options:['男','女']
                    },{
                        class:'input-wrapper',
                        text:'姓名',
                        value:'proposer_name',
                        placeholder:'点击输入客户姓名'
                    },{
                        class:'select-wrapper',
                        text:'性别',
                        key:'proposer_gender',
                        value:'',
                        options:['男','女']
                    },{
                        class:'select-wrapper',
                        text:'婚姻情况',
                        key:'proposer_marriage_state',
                        value:'',
                        options:['未婚','已婚','离异','丧偶']
                    },{
                        class:'select-wrapper',
                        text:'家庭结构',
                        key:'proposer_family',
                        value:'',
                        options:['有子女都成年','有未成年子女','无子女']
                    },{
                        class:'input-wrapper',
                        text:'联系方式',
                        value:'proposer_phone',
                        placeholder:'点击输入联系方式'
                    },{
                        class:'select-wrapper',
                        text:'户籍类型',
                        key:'proposer_household_type',
                        value:'',
                        options:['本地户籍','非本地户籍']
                    },{
                        class:'input-wrapper',
                        text:'身份证号',
                        value:'proposer_id_card',
                        placeholder:'点击输入二代身份证号码'
                    },{
                        class:'input-wrapper',
                        text:'居住状况',
                        value:'proposer_inhabiting_info',
                        placeholder:'点击输入居住状况'
                    },{
                        class:'input-wrapper',
                        text:'居住地址',
                        value:'proposer_address',
                        placeholder:'点击输入居住地址'
                    },{
                        class:'input-wrapper',
                        text:'居住年限',
                        value:'proposer_local_resident',
                        placeholder:'点击输入居住年限'
                    },{
                        class:'select-wrapper',
                        text:'住房情况',
                        key:'proposer_lodging_info',
                        value:'',
                        options:['本地有房(无贷款)','本地有房(有贷款)','异地有住房(无贷款)','异地有住房(有贷款)','无自有住房']
                    },{
                        class:'select-wrapper',
                        text:'就业性质',
                        key:'proposer_job_type',
                        value:'',
                        options:['授薪','自雇']
                    },{
                        class:'input-wrapper',
                        text:'就业年限',
                        value:'proposer_work_year',
                        placeholder:'现单位工作/企业成立'
                    },{
                        class:'input-wrapper',
                        text:'月收入',
                        value:'proposer_income_month',
                        placeholder:'个人收入/企业销售收入'
                    }]
                }
            ],
          partnerInfo:[
                {
                    title:'配偶信息',
                    items:[{
                        class:'input-wrapper',
                        text:'姓名',
                        value:'proposer_spouse_name',
                        placeholder:'点击输入配偶姓名'
                    },{
                        class:'input-wrapper',
                        text:'联系方式',
                        value:'proposer_spouse_phone',
                        placeholder:'点击输入联系方式'
                    },{
                        class:'select-wrapper',
                        text:'证件类型',
                        value:'proposer_spouse_paper_type',
                        options:['身份证','临时身份证','户口簿','其他']
                    },{
                        class:'select-wrapper',
                        text:'是否共同申请',
                        value:'has_proposer_spouse_together',
                        options:['是','否']
                    }]
                }
          ],
          jobInfo:[
               {
                   title:"工作信息",
                   items:[ {
                        class:'input-wrapper',
                        text:'经营主体',
                        value:'',
                        placeholder:'点击输入经营主体'
                    },{
                        class:'input-wrapper',
                        text:'办公地址',
                        value:'',
                        placeholder:'点击输入办公地址'
                    },{
                        class:'select-wrapper',
                        text:'经营场所',
                        value:'',
                        options:['自有','租赁']
                    },{
                        class:'input-wrapper',
                        text:'营业执照',
                        value:'',
                        placeholder:'点击输入营业执照'
                    },{
                        class:'input-wrapper',
                        text:'贷款卡号',
                        value:'',
                        placeholder:'点击输入贷款卡号'
                    }]
               }
          ],
          loanInfo:[
               {
                   title:'借款信息',
                   items:[ {
                        class:'input-wrapper',
                        text:'申请金额',
                        value:'loan_amount',
                        placeholder:'点击输入申请金额(元)',
                        tips:'元'
                    },{
                        class:'input-wrapper',
                        text:'申请期限',
                        value:'loan_period',
                        placeholder:'点击输入申请期限(年)',
                        tips:'年'
                    },{
                        class:'select-wrapper',
                        text:'申请授信方式',
                        value:'loan_credit_type',
                        options:['抵押经营','抵押消费']
                    },{
                        class:'input-wrapper',
                        text:'借款用途',
                        value:'loan_purpose',
                        placeholder:'点击输入借款用途'
                    },{
                        class:'select-wrapper',
                        text:'还款方式',
                        value:'loan_repayment_type',
                        options:['按月付息到期还本','按月等额还息','按月等额本金']
                    },{
                        class:'input-wrapper',
                        text:'其他',
                        value:'loan_other',
                        placeholder:'自定义备注'
                    }]
               }
          ],
          emergencyInfo:[
              {
                  title:'紧急联系人信息',
                  items:[{
                        class:'input-wrapper',
                        text:'姓名',
                        value:'loan_contact_name',
                        placeholder:'点击输入联系人姓名'
                    },{
                        class:'select-wrapper',
                        text:'是您的',
                        value:'loan_contact_rela',
                        options:['父母','子女','其他']
                    },{
                        class:'input-wrapper',
                        text:'住宅电话',
                        value:'loan_contact_tele',
                        placeholder:'格式：区号—号码'
                    },{
                        class:'input-wrapper',
                        text:'手机号码',
                        value:'loan_contact_phone',
                        placeholder:'点击输入手机号码'
                    }]
              }
          ],
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
          options:[]
      }
  },
  components:{
      popUp,
      formList,
      datePicker
  },
  methods:{
      init(){
          if(!this.customer.id){
              this.$router.push({path:'/interview'})
          }
      },
      back(){
          this.currentIndex>1? this.currentIndex--:this.$router.back()       
      },
      next(){
          if(this.currentIndex === 5){
              this.submit()
          }else{
              this.currentIndex +=1
          }    
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      datePickerShow(){
        this.$refs.datePicker.toggleList()
      },
      choosed(option){   
          switch(this.currentIndex){
              case 1:
                this.$refs.formList1.choosed(option)
                break;
              case 2:
                this.$refs.formList2.choosed(option)
                break;
              case 3:
                this.$refs.formList3.choosed(option)
                break;
              case 4:
                this.$refs.formList4.choosed(option)
                break;
              case 5:
                this.$refs.formList5.choosed(option)
                break;
          }
      },
      submit(){
          console.log('提交成功')
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
@import '~common/stylus/mixin'
.scroll
    position fixed 
    top 52px
    bottom 0
    left 0
    right 0
    background $color-background
    overflow hidden
                    
</style>


