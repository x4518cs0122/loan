<template>
  <div class="jy-mulu">
    <v-header title="资料目录表" @goback="goback" next="保存" @submit="submit"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form1">
      <cube-form-group>
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="obj" modelKey="finish_time" :initTxt="initTxt"></Date-picker>
        </cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-form-item
          :field="item"
          v-for="item in fields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
    </cube-form>
    <catalog :list="muluList" :obj="obj"></catalog>
  </div>
</template>
<script>
import * as _ from 'lodash';
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import numberInput from 'base/rsinput/rsNumberInput';
import rsSelect from 'base/rsselect/rsselect';
import { commonValidations } from '@/utils/Const.js';
import catalog from 'components/mortgageLoan/sign/catalog';
import { transformNumberAndBoolean } from '@/utils/commonFunction.js';
import { postSHCatalog, getSecondOrderInfo } from 'api/api';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { DatePicker } from 'base';
export default {
  data() {
    return {
      options: [],
      muluList: [
        {
          name: '客户情况登陆明细(共1份)',
          checked: 'has_client_information'
        },
        {
          name: '买卖双方身份证(各2份)',
          checked: 'has_both_id_card',
          radio: 'both_id_card_des',
          page: 'both_id_card_page',
          area: 'both_id_card_remark'
        },
        {
          name: '买卖双方户口(各1份)',
          checked: 'has_both_account',
          radio: 'both_account_des',
          checkList: [],
          options: [
            {
              key: 'both_account_home',
              value: '首页'
            },
            {
              key: 'both_account_household',
              value: '户主页'
            },
            {
              key: 'both_account_myself',
              value: '本人页'
            }
          ],
          page: 'both_account_page',
          area: 'both_account_remark'
        },
        {
          name: '婚姻证明(2份)',
          checked: 'has_marriage_proof',
          radio: 'marriage_proof_des',
          options: [
            {
              key: 'marriage_certificate',
              value: '结婚证'
            },
            {
              key: 'divorce_certificate',
              value: '离婚证'
            },
            {
              key: 'divorce_agreement',
              value: '离婚协议'
            }
          ],
          checkList: [],
          page: 'marriage_proof_page',
          area: 'marriage_proof_remark'
        },
        {
          name: '抵押物房产两证(1份)',
          checked: 'has_house_certificate',
          radio: 'house_certificate_des',
          page: 'house_certificate_page',
          area: 'house_certificate_remark'
        },
        {
          name: '首付款收据(1份)',
          checked: 'has_pay_receipt',
          radio: 'pay_receipt_des',
          checkList: [],
          page: 'pay_receipt_page',
          area: 'pay_receipt_remark'
        },
        {
          name: '银行卡复印件(1份)',
          checked: 'has_bank_card',
          radio: 'bank_card_des',
          page: 'bank_card_page',
          area: 'bank_card_remark'
        },
        {
          name: '收入证明(1份)',
          checked: 'has_salary_proof',
          radio: 'salary_proof_des',
          page: 'salary_proof_page',
          area: 'salary_proof_remark'
        },
        {
          name: '银行流水（近6个月）',
          checked: 'has_bank_statement',
          radio: 'bank_statement_des',
          page: 'bank_statement_page',
          area: 'bank_statement_remark'
        }
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
        catalogOther: []
      },
      time: {
        label: '完成时间',
        modelKey: 'finish_time'
      },
      initTxt:'',
      fields: []
    };
  },
  created () {
    this.getOrderInfo()
  },
  computed: {
    ...mapGetters(['customer', 'user'])
  },
  methods: {
    goback() {
      this.$router.push({ path: '/erSign' });
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
        catalog: null
      };
      this.mortgageCatalogOthers.push(others);
    },
    getOrderInfo() {
      if (this.customer) {
        const visaId = _.get(this.$store.getters, 'customer.id', undefined);
        let toast = this.$createToast({
          mask: true,
          time: 0
        });
        toast.show();
        getSecondOrderInfo(visaId).then(res => {
          if (res.result) {
            const checklist = res.data.checklist
            const time = _.get(checklist, 'finishTime', '')
            this.obj = Object.assign(
              this.obj,
              { 
                finish_time: time,
                borrower_name:_.get(checklist, 'borrowerName', ''),
                loan_amount:_.get(checklist, 'loanAmount', ''),
                clerk_name:_.get(this.user, 'name', ''),
                clerk_phone: _.get(this.user, 'phone', '')
              }
            );
            const tmp = new Date(time)
            this.initTxt = `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${tmp.getDate()}`;
            this.initFields()
            toast.hide()
          }
          
        });
      }
    },
    initFields() {
      this.fields = [
        {
          type: 'input',
          modelKey: 'borrower_name',
          label: '贷款人姓名',
          props: {
            placeholder: '请输入贷款人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loan_amount',
          label: '贷款金额',
          props: {
            placeholder: '请输入贷款金额'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'clerk_name',
          label: '接单人姓名',
          props: {
            placeholder: '请输入接单人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'clerk_phone',
          label: '接单人电话',
          props: {
            placeholder: '请输入接单人电话'
          },
          rules: {
            required: true
          }
        }
      ];
    },
    submit() {
      let muluData = transformNumberAndBoolean(this.obj, false);
      muluData.id = this.customer.id;
      let toast = this.$createToast({
        mask: true,
        time: 0
      });
      toast.show();
      postSHCatalog(muluData)
        .then(res => {
          if (res.result) {
            this.getSignList();
            this.goback();
          }
        })
        .finally(() => {
          toast.hide();
        });
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER'
    }),
    ...mapActions(['getSignList'])
  },
  components: {
    vHeader,
    catalog,
    DatePicker
  }
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
