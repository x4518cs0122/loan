<template>
    <div class="jy-mulu">
        <v-header title="资料目录表" @back="back" next="保存" @submit="submit"></v-header>
        <formList :list="list" ref="formList" :obj="obj" @pop="pop" @datePick="datePickerShow">
            <div class='collapse-wrapper'>
                <el-collapse accordion>
                    <el-collapse-item class="item" v-for="(item,index) in mortgageCatalogOthers" :key="index">
                        <template slot="title" >
                            <span @click.stop>
                                <el-checkbox v-model="obj[item.checked]" class="color-grey">{{item.content}}</el-checkbox>
                            </span>
                            <i class="header-icon el-icon-info"></i>
                        </template>
                        <div class="detail">
                            <div class="lisence-wrapper">
                                <span class="text">证件名:</span>
                                <input type="text" placeholder="点击输入证件名称" v-model="item.content">
                            </div>
                            <div class="des-wrapper">
                                <span class="text">说明:</span>
                                <input type="text" placeholder="点击输入证件说明" v-model="item.description">
                            </div>
                            <div class="page-wrapper">
                                <span class="text">页码:</span>
                                <input type="text" placeholder="请输入页码" v-model="item.page">
                            </div>
                            <div class="beizhu-wrapper">
                                <span class="text">备注:</span>
                                <textarea :rows="2" class="textarea" placeholder="请输入内容" v-model="item.remark"></textarea>
                            </div>          
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="addMore" @click="addMore">
                <span class="el-icon-circle-plus-outline icon"></span>
            </div>
        </formList>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
        <date-picker ref="datePicker" @submit="choosed"></date-picker>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import {postCatalog} from 'api/api'
import datePicker from 'base/datePicker/datePicker'
import {selectType} from 'common/js/config'
import formList from 'components/form-list/form-list'
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          options:[],
          jyList:[
                {
                    class:'collapse-wrapper',
                    name:'借款人身份证',
                    checked:'has_client_id_card',
                    radio:'client_id_card_des',
                    checkList:[],
                    page:'client_id_card_page',
                    area:'client_id_card_remark'
                },{
                    class:'collapse-wrapper',
                    name:'借款人户口',
                    checked:'has_client_account',
                    radio:'client_account_des',
                    options:[{
                            key:'marriage_certificate',
                            value:'client_account_home'
                        },{
                            key:'divorce_certificate',
                            value:'client_account_household'
                        },{
                            key:'divorce_agreement',
                            value:'client_account_myself'
                        }],
                    checkList:[],
                    page:'client_account_page',
                    area:'client_account_remark'
                },{
                    class:'collapse-wrapper',
                    name:'借款人配偶身份证',
                    checked:'has_client_spouse_id_card',
                    radio:'client_spouse_id_card_des',
                    checkList:[],
                    page:'client_spouse_id_card_page',
                    area:'client_spouse_id_card_remark'
                },{
                    class:'collapse-wrapper',
                    name:'借款人配偶户口',
                    checked:'has_client_spouse_account',
                    radio:'client_spouse_account_des',
                    options:[{
                            key:'client_spouse_account_home',
                            value:'首页'
                        },{
                            key:'client_spouse_account_household',
                            value:'户主页'
                        },{
                            key:'client_spouse_account_myself',
                            value:'本人页'
                        }],
                    checkList:[],
                    page:'client_spouse_account_page',
                    area:'client_spouse_account_remark'
                },{
                    class:'collapse-wrapper',
                    name:'婚姻证明',
                    checked:'has_marriage_proof',
                    radio:'marriage_proof_des',
                    options:[{
                            key:'marriage_certificate',
                            value:'结婚证'
                        },{
                            key:'divorce_certificate',
                            value:'离婚证'
                        },{
                            key:'divorce_agreement',
                            value:'离婚协议'
                        }],
                    checkList:[],
                    page:'marriage_proof_page',
                    area:'marriage_proof_remark'
                },{
                    class:'collapse-wrapper',
                    name:'抵押物房产两证',
                    checked:'has_house_mortgage',
                    radio:'house_mortgage_des',
                    checkList:[],
                    page:'house_mortgage_page',
                    area:'house_mortgage_remark'
                },{
                    class:'collapse-wrapper',
                    name:'资产证明复印件',
                    checked:'has_assets_certificate',
                    radio:'assets_certificate_des',
                    options:[{
                            key:'assets_house_certificate',
                            value:'房产证'
                        },{
                            key:'assets_car_certificate',
                            value:'车产证'
                        },{
                            key:'assets_other',
                            value:'其他资产'
                        }],
                    checkList:[],
                    page:'assets_certificate_page',
                    area:'assets_certificate_remark'
                },{
                    class:'collapse-wrapper',
                    name:'收入证明',
                    checked:'has_income_proof',
                    radio:'income_proof_des',
                    checkList:[],
                    page:'income_proof_page',
                    area:'income_proof_remark'
                },{
                  class:'collapse-wrapper',
                  name:'营业执照（三证合一）',
                  checked:'has_business_license',
                  radio:'business_license_des',
                  checkList:[],
                  page:'business_license_page',
                  area:'business_license_remark'
              },{
                  class:'collapse-wrapper',
                  name:'企业法定代表人身份证',
                  checked:'has_legal_representative',
                  radio:'legal_representative_des',
                  checkList:[],
                  page:'legal_representative_page',
                  area:'legal_representative_remark'
              },{
                  class:'collapse-wrapper',
                  name:'公司章程',
                  checked:'has_company_statute',
                  radio:'company_statute_des',
                  checkList:[],
                  page:'company_statute_page',
                  area:'company_statute_remark'
              },{
                  class:'collapse-wrapper',
                  name:'经营地租赁合同或产权证明',
                  checked:'has_grant_deed',
                  radio:'grant_deed_des',
                  checkList:[],
                  page:'grant_deed_page',
                  area:'grant_deed_remark'
              },{
                  class:'collapse-wrapper',
                  name:'贸易合同',
                  checked:'has_trading_contact',
                  radio:'trading_contact_des',
                  checkList:[],
                  page:'trading_contact_page',
                  area:'trading_contact_remark'
              },{
                  class:'collapse-wrapper',
                  name:'用途合同',
                  checked:'has_purpose_contact',
                  radio:'purpose_contact_des',
                  checkList:[],
                  page:'purpose_contact_page',
                  area:'purpose_contact_remark'
              }
          ],
          list:[{
              title:'基本信息',
              items:[
                  {
                      class:"select-wrapper",
                      text:'完成日期',
                      key:'finish_time',
                      value:'',
                      type:selectType.datePick,
                  },{
                      class:"input-wrapper",
                      text:'贷款人姓名',
                      value:'client_name',
                      placeholder:'点击输入贷款人姓名',
                  },{
                      class:"input-wrapper",
                      text:'贷款金额',
                      value:'loan_amount',
                      placeholder:'点击输入贷款金额',
                  },{
                      class:"input-wrapper",
                      text:'接单人姓名',
                      value:'clerk_name',
                      placeholder:'点击输入接单人姓名',
                  },{
                      class:"input-wrapper",
                      text:'接单人电话',
                      value:'',
                      placeholder:'点击输入接单人电话',
                  }
              ]
           },{
              title:'资料明细',
              items:[
                {
                    class:'collapse-wrapper',
                    name:'借款人身份证',
                    checked:'has_client_id_card',
                    radio:'client_id_card_des',
                    checkList:[],
                    page:'client_id_card_page',
                    area:'client_id_card_remark'
                },{
                    class:'collapse-wrapper',
                    name:'借款人户口',
                    checked:'has_client_account',
                    radio:'client_account_des',
                    options:[{
                            key:'client_account_home',
                            value:'首页'
                        },{
                            key:'client_account_household',
                            value:'户主页'
                        },{
                            key:'client_account_myself',
                            value:'本人页'
                        }],
                    checkList:[],
                    page:'client_account_page',
                    area:'client_account_remark'
                },{
                    class:'collapse-wrapper',
                    name:'借款人配偶身份证',
                    checked:'has_client_spouse_id_card',
                    radio:'client_spouse_id_card_des',
                    checkList:[],
                    page:'client_spouse_id_card_page',
                    area:'client_spouse_id_card_remark'
                },{
                    class:'collapse-wrapper',
                    name:'借款人配偶户口',
                    checked:'has_client_spouse_account',
                    radio:'client_spouse_account_des',
                    options:[{
                            key:'client_spouse_account_home',
                            value:'首页'
                        },{
                            key:'client_spouse_account_household',
                            value:'户主页'
                        },{
                            key:'client_spouse_account_myself',
                            value:'本人页'
                        }],
                    checkList:[],
                    page:'client_spouse_account_page',
                    area:'client_spouse_account_remark'
                },{
                    class:'collapse-wrapper',
                    name:'婚姻证明',
                    checked:'has_marriage_proof',
                    radio:'marriage_proof_des',
                    options:[{
                            key:'marriage_certificate',
                            value:'结婚证'
                        },{
                            key:'divorce_certificate',
                            value:'离婚证'
                        },{
                            key:'divorce_agreement',
                            value:'离婚协议'
                        }],
                    checkList:[],
                    page:'marriage_proof_page',
                    area:'marriage_proof_remark'
                },{
                    class:'collapse-wrapper',
                    name:'抵押物房产两证',
                    checked:'has_house_mortgage',
                    radio:'house_mortgage_des',
                    checkList:[],
                    page:'house_mortgage_page',
                    area:'house_mortgage_remark'
                },{
                    class:'collapse-wrapper',
                    name:'资产证明复印件',
                    checked:'has_assets_certificate',
                    radio:'assets_certificate_des',
                    options:[{
                            key:'assets_house_certificate',
                            value:'房产证'
                        },{
                            key:'assets_car_certificate',
                            value:'车产证'
                        },{
                            key:'assets_other',
                            value:'其他资产'
                        }],
                    checkList:[],
                    page:'assets_certificate_page',
                    area:'assets_certificate_remark'
                },{
                    class:'collapse-wrapper',
                    name:'收入证明',
                    checked:'has_income_proof',
                    radio:'income_proof_des',
                    checkList:[],
                    page:'income_proof_page',
                    area:'income_proof_remark'
                },{
                    class:'collapse-wrapper',
                    name:'用途合同',
                    checked:'has_purpose_contact',
                    radio:'purpose_contact_des',
                    checkList:[],
                    page:'purpose_contact_page',
                    area:'purpose_contact_remark'
                }
              ]
           }
          ],
          obj:{
            "id": null,
            "finish_time": null,
            "client_name": null,
            "loan_amount": null,
            "clerk_name": null,
            "clerk_phone": null,
            'has_client_id_card': false,
            "client_id_card_des": 0,
            "client_id_card_page": null,
            "client_id_card_remark": null,
            "has_client_account": false,
            "client_account_home": false,
            "client_account_household": false,
            "client_account_myself": false,
            "client_account_des": 0,
            "client_account_page": null,
            "client_account_remark": null,
            "has_client_spouse_id_card": false,
            "client_spouse_id_card_des": 0,
            "client_spouse_id_card_page": null,
            "client_spouse_id_card_remark": null,
            "has_client_spouse_account": false,
            "client_spouse_account_home": false,
            "client_spouse_account_household": false,
            "client_spouse_account_myself": false,
            "client_spouse_account_des": 0,
            "client_spouse_account_page": null,
            "client_spouse_account_remark": null,
            "has_marriage_proof": false,
            "marriage_certificate": false,
            "divorce_certificate": false,
            "divorce_agreement": false,
            "marriage_proof_des": 0,
            "marriage_proof_page": null,
            "marriage_proof_remark": null,
            "has_house_mortgage": false,
            "house_mortgage": null,
            "house_mortgage_des": 0,
            "house_mortgage_page": null,
            "house_mortgage_remark": null,
            "has_assets_certificate": false,
            "assets_house_certificate": false,
            "assets_house_number": null,
            "assets_other": false,
            "assets_other_remark": null,
            "assets_car_certificate": false,
            "assets_car_number": null,
            "assets_certificate_des": 0,
            "assets_certificate_page": null,
            "assets_certificate_remark": null,
            "has_income_proof": false,
            "income_proof_des": 0,
            "income_proof_page": null,
            "income_proof_remark": null,
            "has_business_license": false,
            "business_license_des": 0,
            "business_license_page": null,
            "business_license_remark": null,
            "has_legal_representative": false,
            "legal_representative_des": 0,
            "legal_representative_page": null,
            "legal_representative_remark": null,
            "has_company_statute": false,
            "company_statute_des": 0,
            "company_statute_page": null,
            "company_statute_remark": null,
            "has_grant_deed": false,
            "grant_deed_des": 0,
            "grant_deed_page": null,
            "grant_deed_remark": null,
            "has_trading_contact": false,
            "trading_contact_des": 0,
            "trading_contact_page": null,
            "trading_contact_remark": null,
            "has_purpose_contact": false,
            "purpose_contact_des": 0,
            "purpose_contact_page": null,
            "purpose_contact_remark": null,
          },
          mortgageCatalogOthers: [],
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  created(){
      this.init()
  },
  methods:{
      back(){
          this.$router.back()
      },
      init(){
          if(this.customer.loan_type === 0){
              return
          }
          this.list[1].items = this.jyList       
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          this.$refs.formList.choosed(option)
      },
      datePickerShow(){
          this.$refs.datePicker.toggleList()
      },
      addMore(){
          let others = {
                "id": null,
                "content": null,
                "description": null,
                "page": null,
                "remark": null,
                "catalog": null
            }
          this.mortgageCatalogOthers.push(others)
      },
      normalized(){
          this.obj.mortgageCatalogOthers = this.mortgageCatalogOthers
      },
      submit(){
          this.normalized()
          postCatalog(this.obj,this.customer.taskId).then((res)=>{
              if(res.status === 1){
                  this.$router.go(-2)
              }
              console.log(res)
          })
      }
  },
  components:{
      vHeader,
      formList,
      pop,
      datePicker
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.jy-mulu
    position absolute 
    top 0
    bottom 0
    left 0
    right 0
    background $color-background
    .item
        .color-grey
            color #000
            padding-left 20px
        .detail
            color #606266
            margin-left 40px
            .page-wrapper,.lisence-wrapper,.des-wrapper
                display flex
                margin-bottom 10px
                .text
                    flex 0 0 60px
                input 
                    flex 1
                    outline none 
                    margin-right 20px
                    line-height 20px
                    border-bottom 1px solid rgba(144,144,144,0.3)
            .beizhu-wrapper
                display flex
                margin-right 20px
                .text
                    flex 0 0 60px
                textarea 
                    flex 1
                    outline none 
                    border 1px solid rgba(144,144,144,0.3)
                    border-radius 5px
                    padding 5px
    .addMore
        width 100%
        text-align:center
        height 50px
        line-height 50px
        .icon
            font-size 20px
</style>
