<template>
  <div class="jy-mulu">
    <v-header title="资料目录表" @goback="goback" next="保存" @submit="submit"></v-header>
    <rs-list>
      <ul slot="body">
        <!-- <li class="placeholder"> </li>
                <li><rs-select selectText="完成时间" model="finishTime" @selected="selected" :isDate="true"></rs-select></li>
                <li class="placeholder"></li>
                <li><rs-input @input="rsinput" inputText="贷款人姓名" model="clientName" required></rs-input></li>
                <li><rs-input @input="rsinput" inputText="贷款金额" model="loanAmount" required 
                    :validation="commonValidations.numberValidation" 
                    message="贷款金额为数字"></rs-input>
                </li>
                <li><rs-input @input="rsinput" inputText="接单人姓名" model="clerkName" required></rs-input></li>
                <li><rs-input @input="rsinput" inputText="接单人电话" model="clerkPhone" required 
                    :validation="commonValidations.phoneValidation"
                    :message="messageTip.phoneMessage"></rs-input>
        </li>-->
        <cube-form :model="model" :immediate-validate="false" ref="form">
          <cube-form-group>
            <cube-form-item :field="fieldsTime" class="self-form-item">
              <cube-button @click="showDatePicker">{{ model.finishTimeTxt }}></cube-button>
            </cube-form-item>
          </cube-form-group>
          <div class="placeholder"></div>
          <cube-form-group>
            <cube-form-item
              :field="item"
              v-for="item in fields"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
        <li>
          <catalog :list="formlist" :obj="obj"></catalog>
        </li>
      </ul>
    </rs-list>
  </div>
</template>
<script>
import * as _ from 'lodash';
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import catalog from './catalog';
import { postCatalog } from 'api/api';
import { commonValidations } from '@/utils/Const.js';
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      jyList: [
        {
          name: '借款人身份证',
          checked: 'hasClientIdCard',
          radio: 'clientIdCardDes',
          page: 'clientIdCardPage',
          area: 'clientIdCardRemark'
        },
        {
          name: '借款人户口',
          checked: 'hasClientAccount',
          radio: 'clientAccountDes',
          options: [
            {
              key: 'clientAccountHome',
              value: '首页'
            },
            {
              key: 'clientAccountHousehold',
              value: '户主页'
            },
            {
              key: 'clientAccountMyself',
              value: '本人页'
            }
          ],
          page: 'clientAccountPage',
          area: 'clientAccountRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶身份证',
          checked: 'hasClientSpouseIdCard',
          radio: 'clientSpouseIdCardDes',
          checkList: [],
          page: 'clientSpouseIdCardPage',
          area: 'clientSpouseIdCardRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶户口',
          checked: 'hasClientSpouseAccount',
          radio: 'clientSpouseAccountDes',
          options: [
            {
              key: 'clientSpouseAccountHome',
              value: '首页'
            },
            {
              key: 'clientSpouseAccountHousehold',
              value: '户主页'
            },
            {
              key: 'clientSpouseAccountMyself',
              value: '本人页'
            }
          ],
          checkList: [],
          page: 'clientSpouseAccountPage',
          area: 'clientSpouseAccountRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '婚姻证明',
          checked: 'hasMarriageProof',
          radio: 'marriageProofDes',
          options: [
            {
              key: 'marriageCertificate',
              value: '结婚证'
            },
            {
              key: 'divorceCertificate',
              value: '离婚证'
            },
            {
              key: 'divorceAgreement',
              value: '离婚协议'
            }
          ],
          checkList: [],
          page: 'marriageProofPage',
          area: 'marriageProofRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '抵押物房产两证',
          checked: 'hasHouseMortgage',
          moreInput: [
            {
              model: 'houseMortgage',
              label: '套数',
              placeholder: '请输入抵押房产套数'
            }
          ],
          radio: 'houseMortgageDes',
          checkList: [],
          page: 'houseMortgagePage',
          area: 'houseMortgageRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '资产证明复印件',
          checked: 'hasAssetsCertificate',
          radio: 'assetsCertificateDes',
          options: [
            {
              key: 'assetsHouseCertificate',
              value: '房产证'
            },
            {
              key: 'assetsCarCertificate',
              value: '车产证'
            },
            {
              key: 'assetsOther',
              value: '其他资产'
            }
          ],
          checkList: [],
          moreInput: [
            {
              model: 'assetsHouseNumber',
              label: '房产证数量',
              placeholder: '请输入抵押房产证数量，若没有不填写'
            },
            {
              model: 'assetsCarNumber',
              label: '车辆数量',
              placeholder: '请输入抵押车辆数量，若没有不填写'
            },
            {
              model: 'assetsOtherRemark',
              label: '其他资产数量',
              placeholder: '请输入其他资产名称及数量，用逗号隔开'
            }
          ],
          page: 'assetsCertificatePage',
          area: 'assetsCertificateRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '收入证明',
          checked: 'hasIncomeProof',
          radio: 'incomeProofDes',
          checkList: [],
          page: 'incomeProofPage',
          area: 'incomeProofRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '营业执照（三证合一）',
          checked: 'hasBusinessLicense',
          radio: 'businessLicenseDes',
          checkList: [],
          page: 'businessLicensePage',
          area: 'businessLicenseRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '企业法定代表人身份证',
          checked: 'hasLegalRepresentative',
          radio: 'legalRepresentativeDes',
          checkList: [],
          page: 'legalRepresentativePage',
          area: 'legalRepresentativeRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '公司章程',
          checked: 'hasCompanyStatute',
          radio: 'companyStatuteDes',
          checkList: [],
          page: 'companyStatutePage',
          area: 'companyStatuteRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '经营地租赁合同或产权证明',
          checked: 'hasGrantDeed',
          radio: 'grantDeedDes',
          checkList: [],
          page: 'grantDeedPage',
          area: 'grantDeedRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '贸易合同',
          checked: 'hasTradingContact',
          radio: 'tradingContactDes',
          checkList: [],
          page: 'tradingContactPage',
          area: 'tradingContactRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '用途合同',
          checked: 'hasPurposeContact',
          radio: 'purposeContactDes',
          checkList: [],
          page: 'purposeContactPage',
          area: 'purposeContactRemark'
        }
      ],
      xyList: [
        {
          name: '借款人身份证',
          checked: 'hasClientIdCard',
          radio: 'clientIdCardDes',
          page: 'clientIdCardPage',
          area: 'clientIdCardRemark'
        },
        {
          name: '借款人户口',
          checked: 'hasClientAccount',
          radio: 'clientAccountDes',
          options: [
            {
              key: 'clientAccountHome',
              value: '首页'
            },
            {
              key: 'clientAccountHousehold',
              value: '户主页'
            },
            {
              key: 'clientAccountMyself',
              value: '本人页'
            }
          ],
          page: 'clientAccountPage',
          area: 'clientAccountRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶身份证',
          checked: 'hasClientSpouseIdCard',
          radio: 'clientSpouseIdCardDes',
          checkList: [],
          page: 'clientSpouseIdCardPage',
          area: 'clientSpouseIdCardRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '借款人配偶户口',
          checked: 'hasClientSpouseAccount',
          radio: 'clientSpouseAccountDes',
          options: [
            {
              key: 'clientSpouseAccountHome',
              value: '首页'
            },
            {
              key: 'clientSpouseAccountHousehold',
              value: '户主页'
            },
            {
              key: 'clientSpouseAccountMyself',
              value: '本人页'
            }
          ],
          checkList: [],
          page: 'clientSpouseAccountPage',
          area: 'clientSpouseAccountRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '婚姻证明',
          checked: 'hasMarriageProof',
          radio: 'marriageProofDes',
          options: [
            {
              key: 'marriageCertificate',
              value: '结婚证'
            },
            {
              key: 'divorceCertificate',
              value: '离婚证'
            },
            {
              key: 'divorceAgreement',
              value: '离婚协议'
            }
          ],
          checkList: [],
          page: 'marriageProofPage',
          area: 'marriageProofRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '抵押物房产两证',
          checked: 'hasHouseMortgage',
          moreInput: [
            {
              model: 'houseMortgage',
              label: '套数',
              placeholder: '请输入抵押房产套数'
            }
          ],
          radio: 'houseMortgageDes',
          checkList: [],
          page: 'houseMortgagePage',
          area: 'houseMortgageRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '资产证明复印件',
          checked: 'hasAssetsCertificate',
          radio: 'assetsCertificateDes',
          options: [
            {
              key: 'assetsHouseCertificate',
              value: '房产证'
            },
            {
              key: 'assetsCarCertificate',
              value: '车产证'
            },
            {
              key: 'assetsOther',
              value: '其他资产'
            }
          ],
          checkList: [],
          moreInput: [
            {
              model: 'assetsHouseNumber',
              label: '房产证数量',
              placeholder: '请输入抵押房产证数量，若没有不填写'
            },
            {
              model: 'assetsCarNumber',
              label: '车辆数量',
              placeholder: '请输入抵押车辆数量，若没有不填写'
            },
            {
              model: 'assetsOtherRemark',
              label: '其他资产数量',
              placeholder: '请输入其他资产名称及数量，用逗号隔开'
            }
          ],
          page: 'assetsCertificatePage',
          area: 'assetsCertificateRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '收入证明',
          checked: 'hasIncomeProof',
          radio: 'incomeProofDes',
          checkList: [],
          page: 'incomeProofPage',
          area: 'incomeProofRemark'
        },
        {
          class: 'collapse-wrapper',
          name: '用途合同',
          checked: 'hasPurposeContact',
          radio: 'purposeContactDes',
          checkList: [],
          page: 'purposeContactPage',
          area: 'purposeContactRemark'
        }
      ],
      obj: {
        id: 0,
        hasClientIdCard: 0,
        clientIdCardDes: 0,
        clientIdCardPage: '',
        clientIdCardRemark: '',
        hasClientAccount: 0,
        clientAccountHome: 0,
        clientAccountHousehold: 0,
        clientAccountMyself: 0,
        clientAccountDes: 0,
        clientAccountPage: '',
        clientAccountRemark: '',
        hasClientSpouseIdCard: 0,
        clientSpouseIdCardDes: 0,
        clientSpouseIdCardPage: '',
        clientSpouseIdCardRemark: '',
        hasClientSpouseAccount: 0,
        clientSpouseAccountHome: 0,
        clientSpouseAccountHousehold: 0,
        clientSpouseAccountMyself: 0,
        clientSpouseAccountDes: 0,
        clientSpouseAccountPage: '',
        clientSpouseAccountRemark: '',
        hasMarriageProof: 0,
        marriageCertificate: 0,
        divorceCertificate: 0,
        divorceAgreement: 0,
        marriageProofDes: '',
        marriageProofPage: '',
        marriageProofRemark: '',
        hasHouseMortgage: 0,
        houseMortgage: '',
        houseMortgageDes: 0,
        houseMortgagePage: '',
        houseMortgageRemark: '',
        hasAssetsCertificate: 0,
        assetsHouseCertificate: 0,
        assetsHouseNumber: '',
        assetsOther: 0,
        assetsOtherRemark: '',
        assetsCarCertificate: 0,
        assetsCarNumber: '',
        assetsCertificateDes: 0,
        assetsCertificatePage: '',
        assetsCertificateRemark: '',
        hasIncomeProof: 0,
        incomeProofDes: 0,
        incomeProofPage: '',
        incomeProofRemark: '',
        hasBusinessLicense: 0,
        businessLicenseDes: 0,
        businessLicensePage: '',
        businessLicenseRemark: '',
        hasLegalRepresentative: 0,
        legalRepresentativeDes: 0,
        legalRepresentativePage: '',
        legalRepresentativeRemark: '',
        hasCompanyStatute: 0,
        companyStatuteDes: 0,
        companyStatutePage: '',
        companyStatuteRemark: '',
        hasGrantDeed: 0,
        grantDeedDes: 0,
        grantDeedPage: '',
        grantDeedRemark: '',
        hasTradingContact: 0,
        tradingContactDes: 0,
        tradingContactPage: '',
        tradingContactRemark: '',
        hasPurposeContact: 0,
        purposeContactDes: 0,
        purposeContactPage: '',
        purposeContactRemark: '',
        catalogOther: []
      },
      /** 完成时间 */
      fieldsTime: {
        modelKey: 'finishTime',
        label: '完成日期',
        rules: {
          required: true
        }
      },
      model: {
        finishTime: 0,
        finishTimeTxt: '',
        clientName: '',
        loanAmount: '',
        clerkName: '',
        clerkPhone: ''
      },

      fields: [
        {
          type: 'input',
          modelKey: 'clientName',
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
          modelKey: 'loanAmount',
          label: '贷款金额',
          props: {
            placeholder: '请输入贷款金额'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'clerkName',
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
          modelKey: 'clerkPhone',
          label: '接单人电话',
          props: {
            placeholder: '请输入接单人电话'
          },
          rules: {
            required: true,
            pattern: commonValidations.phoneValidation
          }
        }
      ],
      commonValidations: commonValidations
    };
  },
  computed: {
    ...mapGetters(['customer', 'signListUpdate']),
    formlist() {
      return this.customer.loanVariety === '抵押消费' ? this.xyList : this.jyList;
    }
  },
  methods: {
    goback() {
      this.$router.push({ path: '/sign' });
    },
    selected(id, model) {
      if (model === 'finishTime') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parInt(id);
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    addMore() {
      let others = {
        id: null,
        content: null,
        description: null,
        page: null,
        remark: null,
        catalog: null
      };
      this.mortgageCatalogOthers.push(others);
    },
    normalize() {
      let checkObj = { ...this.obj };
      Object.keys(checkObj).forEach(item => {
        let value = checkObj[item].toString();
        if (value === 'true') {
          checkObj[item] = 1;
        } else if (value === 'false') {
          checkObj[item] = 0;
        }
      });
      return checkObj;
    },
    showToastMask() {
      if (!this.toast) {
        this.toast = this.$createToast({
          mask: true,
          time: 0
        });
      }
      this.toast.show();
    },
    hideToastMask() {
      this.toast && this.toast.hide();
    },
    submit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          let muluData = this.normalize();
          muluData.id = this.customer.id;
          this.showToastMask();
          postCatalog(muluData).then(res => {
            if (res.result) {
              /**手动解决当前用户状态的hack写法，慎用 */
              let newCustomer = _.cloneDeep(this.customer);
              newCustomer.extra.catalogState.done = true;
              this.setCustomer(newCustomer);
              this.hideToastMask();
              this.$router.push({ path: `/sign/${this.customer.id}` });
            } else {
              this.hideToastMask()
              this.$createToast({
                mask: true,
                txt: '参数走丢了，请重新提交'
              }).show();
            }
          });
        }
      });
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER'
    }),
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择时间',
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.dateSelectHandler
        });
      }

      this.datePicker.show();
    },
    dateSelectHandler(date, selectedVal, selectedText) {
      this.model.finishTimeTxt = selectedText.join('-');
      this.model.finishTime = new Date(date).getTime();
    }
  },
  components: {
    vHeader,
    catalog,
    rsList
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

  .item {
    .color-grey {
      color: #000;
      padding-left: 20px;
    }

    .detail {
      color: #606266;
      margin-left: 40px;

      .page-wrapper, .lisence-wrapper, .des-wrapper {
        display: flex;
        margin-bottom: 10px;

        .text {
          flex: 0 0 60px;
        }

        input {
          flex: 1;
          outline: none;
          margin-right: 20px;
          line-height: 20px;
          border-bottom: 1px solid rgba(144, 144, 144, 0.3);
        }
      }

      .beizhu-wrapper {
        display: flex;
        margin-right: 20px;

        .text {
          flex: 0 0 60px;
        }

        textarea {
          flex: 1;
          outline: none;
          border: 1px solid rgba(144, 144, 144, 0.3);
          border-radius: 5px;
          padding: 5px;
        }
      }
    }
  }

  .addMore {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;

    .icon {
      font-size: 20px;
    }
  }

  .placeholder {
    height: 10px;
    line-height: 10px;
    background: $background-list-header;
  }
}
</style>
