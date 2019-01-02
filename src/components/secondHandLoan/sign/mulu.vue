<template>
    <div class="jy-mulu">
        <v-header title="资料目录表" @goback="goback" next="保存" @submit="submit"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-select selectText="完成时间" model="finish_time" @selected="selected" :isDate="true"></rs-select></li>
                <li class="placeholder"></li>
                <li><rs-input @input="rsinput" inputText="贷款人姓名" model="borrower_name" required></rs-input></li>
                <li><number-input @input="rsinput" inputText="贷款金额" model="loan_amount" required></number-input></li>
                <li><rs-input @input="rsinput" inputText="接单人姓名" model="clerk_name" required></rs-input></li>
                <li><rs-input @input="rsinput" inputText="接单人电话" model="clerk_phone" 
                  required 
                  :validation="commonValidations.phoneValidation"
                  :message="messageTip.phoneValidation"></rs-input>
                </li>   
                <li><catalog :list="muluList" :obj="obj"></catalog></li>         
            </ul>
        </rs-list>
    </div>
</template>
<script>
import * as _ from 'lodash';
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import numberInput from 'base/rsinput/rsNumberInput';
import rsSelect from 'base/rsselect/rsselect';
import {commonValidations, messageTip} from '@/utils/Const.js';
import catalog from 'components/mortgageLoan/sign/catalog';
import {transformNumberAndBoolean} from '@/utils/commonFunction.js';
import {postSHCatalog} from 'api/api';
import {mapGetters, mapMutations} from 'vuex';
export default {
  data() {
    return {
      commonValidations: commonValidations,
      messageTip: messageTip,
      options: [],
      muluList: [
        {
          name: '客户情况登陆明细(共1份)',
          checked: 'has_client_information',
        },
        {
          name: '买卖双方身份证(各2份)',
          checked: 'has_both_id_card',
          radio: 'both_id_card_des',
          page: 'both_id_card_page',
          area: 'both_id_card_remark',
        },
        {
          name: '买卖双方户口(各1份)',
          checked: 'has_both_account',
          radio: 'both_account_des',
          checkList: [],
          options: [
            {
              key: 'both_account_home',
              value: '首页',
            },
            {
              key: 'both_account_household',
              value: '户主页',
            },
            {
              key: 'both_account_myself',
              value: '本人页',
            },
          ],
          page: 'both_account_page',
          area: 'both_account_remark',
        },
        {
          name: '婚姻证明(2份)',
          checked: 'has_marriage_proof',
          radio: 'marriage_proof_des',
          options: [
            {
              key: 'marriage_certificate',
              value: '结婚证',
            },
            {
              key: 'divorce_certificate',
              value: '离婚证',
            },
            {
              key: 'divorce_agreement',
              value: '离婚协议',
            },
          ],
          checkList: [],
          page: 'marriage_proof_page',
          area: 'marriage_proof_remark',
        },
        {
          name: '抵押物房产两证(1份)',
          checked: 'has_house_certificate',
          radio: 'house_certificate_des',
          page: 'house_certificate_page',
          area: 'house_certificate_remark',
        },
        {
          name: '首付款收据(1份)',
          checked: 'has_pay_receipt',
          radio: 'pay_receipt_des',
          checkList: [],
          page: 'pay_receipt_page',
          area: 'pay_receipt_remark',
        },
        {
          name: '银行卡复印件(1份)',
          checked: 'has_bank_card',
          radio: 'bank_card_des',
          page: 'bank_card_page',
          area: 'bank_card_remark',
        },
        {
          name: '收入证明(1份)',
          checked: 'has_salary_proof',
          radio: 'salary_proof_des',
          page: 'salary_proof_page',
          area: 'salary_proof_remark',
        },
        {
          name: '银行流水（近6个月）',
          checked: 'has_bank_statement',
          radio: 'bank_statement_des',
          page: 'bank_statement_page',
          area: 'bank_statement_remark',
        },
      ],
      obj: {
        id: null,
        finish_time: null,
        borrower_name: '',
        loan_amount: null,
        clerk_name: '',
        clerk_phone: '',
        has_client_information: '',
        has_both_id_card: '',
        both_id_card_des: '',
        both_id_card_page: '',
        both_id_card_remark: '',
        has_both_account: '',
        both_account_home: '',
        both_account_household: '',
        both_account_myself: '',
        both_account_des: '',
        both_account_page: '',
        both_account_remark: '',
        has_marriage_proof: '',
        marriage_certificate: '',
        divorce_certificate: '',
        divorce_agreement: '',
        marriage_proof_des: '',
        marriage_proof_page: '',
        marriage_proof_remark: '',
        has_house_certificate: '',
        house_certificate_des: '',
        house_certificate_page: '',
        house_certificate_remark: '',
        has_pay_receipt: '',
        pay_receipt_des: '',
        pay_receipt_page: '',
        pay_receipt_remark: '',
        has_bank_card: '',
        bank_card_des: '',
        bank_card_page: '',
        bank_card_remark: '',
        has_salary_proof: '',
        salary_proof_des: '',
        salary_proof_page: '',
        salary_proof_remark: '',
        has_bank_statement: '',
        bank_statement_des: '',
        bank_statement_page: '',
        bank_statement_remark: '',
        input_finish_time: null,
        catalogOther: [],
      },
    };
  },
  computed: {
    ...mapGetters(['customer']),
  },
  methods: {
    goback() {
      this.$router.push({path: '/erSign'});
    },
    selected(id, model) {
      if (model === 'finish_time') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parInt(id);
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    /**添加其他文件 */
    addMore() {
      let others = {
        id: null,
        content: null,
        description: null,
        page: null,
        remark: null,
        /**面前列表的id */
        catalog: null,
      };
      this.mortgageCatalogOthers.push(others);
    },
    submit() {
      let muluData = transformNumberAndBoolean(this.obj, false);
      muluData.id = this.customer.id;

      postSHCatalog(muluData).then(res => {
        if (res.result) {
          this.goback()
        }
      });
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  components: {
    vHeader,
    catalog,
    rsList,
    rsSelect,
    rsInput,
    numberInput,
  },
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.jy-mulu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;

  .addMore {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;

    .icon {
      font-size: 20px;
    }
  }
}
</style>
