<template>
    <div class="jy-mulu">
        <v-header title="资料目录表" @goback="goback" next="提交" @submit="submit"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-select selectText="完成时间" model="finishTime" @selected="selected" :isDate="true" :initSelection="initTime"></rs-select></li>   
                <li><catalog :list="formlist" :obj="obj"></catalog></li>         
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import rsSelect from 'base/rsselect/rsselect';
import catalog from 'components/mortgageLoan/sign/catalog';
import {mapGetters} from 'vuex';
import {transformNumberAndBoolean} from '@/utils/commonFunction.js';
import {getCatalog, getProcess, confirmCatalog} from '@/api/api';
export default {
  data() {
    return {
      jyList: [
        {
          name: '借款人身份证',
          checked: 'hasClientIdCard',
          radio: 'clientIdCardDes',
          page: 'clientIdCardPage',
          area: 'clientIdCardRemark',
        },
        {
          name: '借款人户口',
          checked: 'hasClientAccount',
          radio: 'clientAccountDes',
          options: [
            {
              key: 'clientAccountHome',
              value: '首页',
            },
            {
              key: 'clientAccountHousehold',
              value: '户主页',
            },
            {
              key: 'clientAccountMyself',
              value: '本人页',
            },
          ],
          page: 'clientAccountPage',
          area: 'clientAccountRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶身份证',
          checked: 'hasClientSpouseIdCard',
          radio: 'clientSpouseIdCardDes',
          checkList: [],
          page: 'clientSpouseIdCardPage',
          area: 'clientSpouseIdCardRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶户口',
          checked: 'hasClientSpouseAccount',
          radio: 'clientSpouseAccountDes',
          options: [
            {
              key: 'clientSpouseAccountHome',
              value: '首页',
            },
            {
              key: 'clientSpouseAccountHousehold',
              value: '户主页',
            },
            {
              key: 'clientSpouseAccountMyself',
              value: '本人页',
            },
          ],
          checkList: [],
          page: 'clientSpouseAccountPage',
          area: 'clientSpouseAccountRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '婚姻证明',
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
          class: 'collapse-wrapper',
          name: '抵押物房产两证',
          checked: 'hasHouseMortgage',
          moreInput: [
            {
              model: 'houseMortgage',
              label: '套数',
              placeholder: '请输入抵押房产套数',
            },
          ],
          radio: 'houseMortgageDes',
          checkList: [],
          page: 'houseMortgagePage',
          area: 'houseMortgageRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '资产证明复印件',
          checked: 'hasAssetsCertificate',
          radio: 'assetsCertificateDes',
          options: [
            {
              key: 'assetsHouseCertificate',
              value: '房产证',
            },
            {
              key: 'assetsCarCertificate',
              value: '车产证',
            },
            {
              key: 'assetsOther',
              value: '其他资产',
            },
          ],
          checkList: [],
          moreInput: [
            {
              model: 'assetsHouseNumber',
              label: '房产证数量',
              placeholder: '请输入抵押房产证数量，若没有不填写',
            },
            {
              model: 'assetsCarNumber',
              label: '车辆数量',
              placeholder: '请输入抵押车辆数量，若没有不填写',
            },
            {
              model: 'assetsOtherRemark',
              label: '其他资产数量',
              placeholder: '请输入其他资产名称及数量，用逗号隔开',
            },
          ],
          page: 'assetsCertificatePage',
          area: 'assetsCertificateRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '收入证明',
          checked: 'hasIncomeProof',
          radio: 'incomeProofDes',
          checkList: [],
          page: 'incomeProofPage',
          area: 'incomeProofRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '营业执照（三证合一）',
          checked: 'hasBusinessLicense',
          radio: 'businessLicenseDes',
          checkList: [],
          page: 'businessLicensePage',
          area: 'businessLicenseRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '企业法定代表人身份证',
          checked: 'hasLegalRepresentative',
          radio: 'legalRepresentativeDes',
          checkList: [],
          page: 'legalRepresentativePage',
          area: 'legalRepresentativeRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '公司章程',
          checked: 'hasCompanyStatute',
          radio: 'companyStatuteDes',
          checkList: [],
          page: 'companyStatutePage',
          area: 'companyStatuteRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '经营地租赁合同或产权证明',
          checked: 'hasGrantDeed',
          radio: 'grantDeedDes',
          checkList: [],
          page: 'grantDeedPage',
          area: 'grantDeedRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '贸易合同',
          checked: 'hasTradingContact',
          radio: 'tradingContactDes',
          checkList: [],
          page: 'tradingContactPage',
          area: 'tradingContactRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '用途合同',
          checked: 'hasPurposeContact',
          radio: 'purposeContactDes',
          checkList: [],
          page: 'purposeContactPage',
          area: 'purposeContactRemark',
        },
      ],
      xyList: [
        {
          name: '借款人身份证',
          checked: 'hasClientIdCard',
          radio: 'clientIdCardDes',
          page: 'clientIdCardPage',
          area: 'clientIdCardRemark',
        },
        {
          name: '借款人户口',
          checked: 'hasClientAccount',
          radio: 'clientAccountDes',
          options: [
            {
              key: 'clientAccountHome',
              value: '首页',
            },
            {
              key: 'clientAccountHousehold',
              value: '户主页',
            },
            {
              key: 'clientAccountMyself',
              value: '本人页',
            },
          ],
          page: 'clientAccountPage',
          area: 'clientAccountRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶身份证',
          checked: 'hasClientSpouseIdCard',
          radio: 'clientSpouseIdCardDes',
          checkList: [],
          page: 'clientSpouseIdCardPage',
          area: 'clientSpouseIdCardRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶户口',
          checked: 'hasClientSpouseAccount',
          radio: 'clientSpouseAccountDes',
          options: [
            {
              key: 'clientSpouseAccountHome',
              value: '首页',
            },
            {
              key: 'clientSpouseAccountHousehold',
              value: '户主页',
            },
            {
              key: 'clientSpouseAccountMyself',
              value: '本人页',
            },
          ],
          checkList: [],
          page: 'clientSpouseAccountPage',
          area: 'clientSpouseAccountRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '婚姻证明',
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
          class: 'collapse-wrapper',
          name: '抵押物房产两证',
          checked: 'hasHouseMortgage',
          moreInput: [
            {
              model: 'houseMortgage',
              label: '套数',
              placeholder: '请输入抵押房产套数',
            },
          ],
          radio: 'houseMortgageDes',
          checkList: [],
          page: 'houseMortgagePage',
          area: 'houseMortgageRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '资产证明复印件',
          checked: 'hasAssetsCertificate',
          radio: 'assetsCertificateDes',
          options: [
            {
              key: 'assetsHouseCertificate',
              value: '房产证',
            },
            {
              key: 'assetsCarCertificate',
              value: '车产证',
            },
            {
              key: 'assetsOther',
              value: '其他资产',
            },
          ],
          checkList: [],
          moreInput: [
            {
              model: 'assetsHouseNumber',
              label: '房产证数量',
              placeholder: '请输入抵押房产证数量，若没有不填写',
            },
            {
              model: 'assetsCarNumber',
              label: '车辆数量',
              placeholder: '请输入抵押车辆数量，若没有不填写',
            },
            {
              model: 'assetsOtherRemark',
              label: '其他资产数量',
              placeholder: '请输入其他资产名称及数量，用逗号隔开',
            },
          ],
          page: 'assetsCertificatePage',
          area: 'assetsCertificateRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '收入证明',
          checked: 'hasIncomeProof',
          radio: 'incomeProofDes',
          checkList: [],
          page: 'incomeProofPage',
          area: 'incomeProofRemark',
        },
        {
          class: 'collapse-wrapper',
          name: '用途合同',
          checked: 'hasPurposeContact',
          radio: 'purposeContactDes',
          checkList: [],
          page: 'purposeContactPage',
          area: 'purposeContactRemark',
        },
      ],
      initTime: '',
      obj: {},
    };
  },
  computed: {
    ...mapGetters(['customer']),
    formlist() {
      return this.customer.loanVariety === '抵押经营'
        ? this.jyList
        : this.xyList;
    },
  },
  methods: {
    /**根据rootid获取面签列表id，查询资料目录表信息 */
    async _getCatalog() {
      const rootId = this.customer.rootId;
      let visaId;
      await getProcess(rootId).then(res => {
        const visaInfo = res.data.find(process => {
          return process.name === 'visa';
        });
        visaId = visaInfo.id;
      });

      getCatalog(visaId).then(res => {
        if (res.result) {
          let time = new Date(res.data.catalog.finishTime);
          this.initTime = `${time.getFullYear()}-${time.getMonth() +
            1}-${time.getDate()}`;
          this.obj = transformNumberAndBoolean(res.data.catalog, true);
        }
      });
    },
    goback() {
      this.$router.back();
    },
    selected(key, model) {
      this.obj[model] = new Date(key).getTime();
    },
    submit() {
      let data = {
        approveId: this.customer.id,
        catalog: JSON.stringify(transformNumberAndBoolean(this.obj, false)),
      };

      confirmCatalog(data).then(res => {
        res.result && this.$router.push({path: `/approve/${this.customer.id}`});
      });
    },
  },
  created() {
    this._getCatalog();
  },
  components: {vHeader, rsList, rsText, rsSelect, catalog},
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
    background: $color-background;
}
</style>
