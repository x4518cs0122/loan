<template>
    <div class="jy-mulu">
        <v-header title="确定资料收集情况" @goback="goback" next="提交" @submit="submit"></v-header>
        <cube-form :model="obj" :immediate-validate="false" ref="form1">
          <cube-form-group>
            <cube-form-item :field="time" class="self-form-item">
              <Date-picker :model="obj" modelKey="finishTime" ></Date-picker>
            </cube-form-item>
          </cube-form-group>
        </cube-form>
        <catalog :list="muluList" :obj="obj"></catalog>
    </div>
</template>
<script>
import * as _ from 'lodash';
import vHeader from 'components/header/header';
import {DatePicker} from 'base'
import catalog from 'components/mortgageLoan/sign/catalog';
import {transformNumberAndBoolean} from '@/utils/commonFunction.js';
import {postShujiCatalog, getSHUJICatalog} from 'api/api';
import {mapGetters, mapMutations} from 'vuex';
export default {
  data() {
    return {
      options: [],
      muluList: [
        {
          name: '客户情况登陆明细(共1份)',
          checked: 'hasClientInformation',
          radio: '',
          page: null,
          area: null,
        },
        {
          name: '买卖双方身份证(各2份)',
          checked: 'hasBothIdCard',
          radio: 'bothIdCardDes',
          page: 'bothIdCardPage',
          area: 'bothIdCardRemark',
        },
        {
          name: '买卖双方户口(各1份)',
          checked: 'hasBothAccount',
          radio: 'bothAccountDes',
          checkList: [],
          options: [
            {
              key: 'bothAccountHome',
              value: '首页',
            },
            {
              key: 'bothAccountHousehold',
              value: '户主页',
            },
            {
              key: 'bothAccountMyself',
              value: '本人页',
            },
          ],
          page: 'bothAccountPage',
          area: 'bothAccountRemark',
        },
        {
          name: '婚姻证明(2份)',
          checked: 'hasMarriageProof',
          radio: 'marriageProofDes',
          options: [
            {
              key: 'marriageCertificate',
              value: '结婚证',
            },
            {
              key: 'divorceCertificate',
              value: '离婚证',
            },
            {
              key: 'divorceAgreement',
              value: '离婚协议',
            },
          ],
          checkList: [],
          page: 'marriageProofPage',
          area: 'marriageProofRemark',
        },
        {
          name: '抵押物房产两证(1份)',
          checked: 'hasHouseCertificate',
          radio: 'houseCertificateDes',
          page: 'houseCertificatePage',
          area: 'houseCertificateRemark',
        },
        {
          name: '首付款收据(1份)',
          checked: 'hasPayReceipt',
          radio: 'payReceiptDes',
          checkList: [],
          page: 'payReceiptPage',
          area: 'payReceiptRemark',
        },
        {
          name: '银行卡复印件(1份)',
          checked: 'hasBankCard',
          radio: 'bankCardDes',
          page: 'bankCardPage',
          area: 'bankCardRemark',
        },
        {
          name: '收入证明(1份)',
          checked: 'hasSalaryProof',
          radio: 'salaryProofDes',
          page: 'salaryProofPage',
          area: 'salaryProofRemark',
        },
        {
          name: '银行流水（近6个月）',
          checked: 'hasBankStatement',
          radio: 'bankStatementDes',
          page: 'bankStatementPage',
          area: 'bankStatementRemark',
        },
      ],
      obj: {
        id: null,
        finishTime: null,
        borrowerName: null,
        loanAmount: null,
        clerkName: null,
        clerkPhone: null,
        hasClientInformation: null,
        hasBothIdCard: null,
        bothIdCardDes: null,
        bothIdCardPage: null,
        bothIdCardRemark: null,
        hasBothAccount: null,
        bothAccountHome: null,
        bothAccountHousehold: null,
        bothAccountMyself: null,
        bothAccountDes: null,
        bothAccountPage: null,
        bothAccountRemark: null,
        hasMarriageProof: null,
        marriageCertificate: null,
        divorceCertificate: null,
        divorceAgreement: null,
        marriageProofDes: null,
        marriageProofPage: null,
        marriageProofRemark: null,
        hasHouseCertificate: null,
        houseCertificateDes: null,
        houseCertificatePage: null,
        houseCertificateRemark: null,
        hasPayReceipt: null,
        payReceiptDes: null,
        payReceiptPage: null,
        payReceiptRemark: null,
        hasBankCard: null,
        bankCardDes: null,
        bankCardPage: null,
        bankCardRemark: null,
        hasSalaryProof: null,
        salaryProofDes: null,
        salaryProofPage: null,
        salaryProofRemark: null,
        hasBankStatement: null,
        bankStatementDes: null,
        bankStatementPage: null,
        bankStatementRemark: null,
        inputFinishTime: null,
        catalogOther: [],
      },
      time:{
          label: '整件完成时间',
          modelKey: 'finishTime',
          rules: {
            required: true
          }
        }
    };
  },
  computed: {
    ...mapGetters(['customer']),
  },
  created() {
    this._getSHUJICatalog();
  },
  methods: {
    goback() {
      this.$router.push({path: '/erWrite'});
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
    async _getSHUJICatalog() {
      const id = this.customer.id;
      getSHUJICatalog(id).then(res => {
        const catalogInfo = res.data.catalog;
        let time = new Date(catalogInfo.finishTime);
        this.initTime = `${time.getFullYear()}-${time.getMonth() +
          1}-${time.getDate()}`;
        this.obj = transformNumberAndBoolean(catalogInfo, true)
      });
    },
    submit() {
      let muluData = transformNumberAndBoolean(this.obj, false);
      muluData.id = this.customer.id;

      // console.log(this.obj);
      postShujiCatalog(this.customer.id, JSON.stringify(muluData)).then(res => {
        if (res.result) {
          this.goback();
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
    DatePicker
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
}
</style>
