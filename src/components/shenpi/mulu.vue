<template>
    <div class="jy-mulu">
        <v-header title="资料目录表" @goback="goback" next="提交" @submit="submit"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
                <li><rs-select selectText="完成时间" model="finish_time" @selected="selected" :isDate="true"></rs-select></li>   
                <li><catalog :list="formlist" :obj="obj"></catalog></li>         
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsSelect from 'base/rsselect/rsselect'
import catalog from 'components/mianqian/catalog'
import {mapGetters} from 'vuex'
import {getCatalog} from '@/api/api'
export default {
  data(){
      return{
          jyList:[
                {
                    name:'借款人身份证',
                    checked:'has_client_id_card',
                    radio:'client_id_card_des',
                    page:'client_id_card_page',
                    area:'client_id_card_remark'
                },{
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
          xyList:[{
                    name:'借款人身份证',
                    checked:'has_client_id_card',
                    radio:'client_id_card_des',
                    page:'client_id_card_page',
                    area:'client_id_card_remark'
                },{
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
          ],
          obj:{
          }
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ]),
      formlist() {
          return this.customer.loan_type === 0 ? this.xyList:this.jyList
      },
      _getCatalog() {
          getCatalog(this.customer.catalogId).then((res) =>{
              this.obj = res.data
          })
      }
  },
  methods:{
      goback(){
          this.$router.back()
      },
      selected(key, model) {
          this.obj[model] = key
      },
  },
  mounted(){
    
  },
  components:{vHeader, rsList, rsText, rsSelect, catalog}
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
    
</style>
