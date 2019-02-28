<template>
  <div class="application">
    <v-header @goback="goback" title="个人申请表" :next="nextTxt" @submit="next"></v-header>
    <div class="scroll">
      <!-- 个人信息 index = 1 -->
      <div v-show="currentIndex === 1">
        <cube-form :model="model" :immediate-validate="false" ref="form">
          <cube-form-group>
            <cube-form-item :field="applicationTime" class="self-form-item">
              <Date-picker :model="model" modelKey="applicationTime"></Date-picker>
            </cube-form-item>
          </cube-form-group>
          <!-- <div class="placeholder"></div> -->
          <cube-form-group legend="客户基本信息">
            <cube-form-item
              :field="item"
              v-for="item in fields"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
      <!-- 配偶信息 index = 2 -->
      <div v-show="currentIndex === 2">
        <cube-form :model="model" :immediate-validate="false" ref="form2">
          <cube-form-group>
            <cube-form-item
              :field="item"
              v-for="item in spouseFileds"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
      <!-- 工作单位 index = 3 -->
      <div v-show="currentIndex === 3 && model.proposerJobType === 1">
        <cube-form :model="model" :immediate-validate="false" ref="form3">
          <cube-form-group>
            <cube-form-item
              :field="item"
              v-for="item in sxFileds"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
      <div v-show="currentIndex === 3 && model.proposerJobType === 2">
        <cube-form :model="model" :immediate-validate="false" ref="form4">
          <cube-form-group>
            <cube-form-item
              :field="item"
              v-for="item in zgFileds"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
      <!-- 贷款信息 index = 4 -->
      <div v-show="currentIndex === 4">
        <cube-form :model="model" :immediate-validate="false" ref="form5">
          <cube-form-group>
            <cube-form-item
              :field="item"
              v-for="item in loanFileds"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
      <!-- 紧急联系人信息 index = 5 -->
      <div v-show="currentIndex === 5">
        <!-- <rs-list>
          <ul slot="body">
            <li class="list-header">紧急联系人信息(无法律责任)</li>
            <li>
              <rs-input @input="rsinput" inputText="姓名" model="loanContactName" required></rs-input>
            </li>
            <li>
              <rs-select
                selectText="是您的"
                :options="options.relation"
                model="loanContactRela"
                @selected="selected"
                valuetype="18"
              ></rs-select>
            </li>
            <li>
              <rs-input @input="rsinput" inputText="住宅电话" model="loanContactTele"></rs-input>
            </li>
            <li>
              <rs-input
                @input="rsinput"
                inputText="手机号码"
                model="loanContactPhone"
                required
                :validation="commonValidations.phoneValidation"
                :message="messageTip.phoneMessage"
              ></rs-input>
            </li>
          </ul>
        </rs-list>-->
        <cube-form :model="model" :immediate-validate="false" ref="form6">
          <cube-form-group>
            <cube-form-item
              :field="item"
              v-for="item in contactFileds"
              :key="item.modelKey"
              class="self-form-item"
            ></cube-form-item>
          </cube-form-group>
        </cube-form>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsSelect from 'base/rsselect/rsselect';
import rsInput from 'base/rsinput/rsinput';
import { mapGetters } from 'vuex';
import { commonValidations, messageTip } from '@/utils/Const.js';
import { postForm, getOptions } from 'api/api';
import { DatePicker } from 'base';
import { formatAxiosOptions } from '../utils';
import { options } from './Constance';
export default {
  data() {
    return {
      commonValidations: commonValidations,
      messageTip: messageTip,
      currentIndex: 1,
      nextTxt: '下一步',
      model: {
        id: null,
        applicationTime: null,
        applicationTimeTxt: '',
        proposerName: null,
        proposerGender: null,
        proposerMarriageState: null,
        proposerFamily: null,
        proposerFamilyNum: null,
        proposerPhone: null,
        proposerWorkTele: null,
        proposerHouseTele: null,
        proposerHouseholdType: null,
        proposerIdCard: null,
        proposerInhabitingInfo: null,
        proposerAddress: null,
        proposerLocalResident: null,
        proposerLodgingInfo: null,
        proposerLoanState: null,
        proposerJobType: null,
        proposerWorkYear: null,
        proposerIncomeMonth: null,
        proposerSpouseName: null,
        proposerSpousePhone: null,
        proposerSpousePaperType: null,
        proposerSpousePaperId: null,
        hasProposerSpouseTogether: false,
        proposerCompany: null,
        proposerCompanyAddress: null,
        proposerCompanyType: null,
        proposerCompanyDuty: null,
        proposerBusinessLicense: null,
        proposerBusinessAddress: null,
        proposerBusiness: null,
        proposerBusinessCard: null,
        loanAmount: null,
        loanPeriod: null,
        loanCreditType: null,
        loanPurpose: null,
        loanRepaymentType: null,
        loanOther: null,
        loanContactName: null,
        loanContactRela: null,
        loanContactTele: null,
        loanContactPhone: null
      },
      /** fields */
      fields: [],
      spouseFileds: [],
      sxFileds: [],
      zgFileds: [],
      loanFileds: [],
      contactFileds: [],
      applicationTime: {
        modelKey: 'applicationTime',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      /** options */
      marriageOptions: [],
      familyOptions: [],
      LodgingInfoOptions: [],
      LoanStateOptions: [],
      SpousePaperIdOptions: [],
      CompanyTypeOptions: [],
      CompanyDutyOptions: [],
      loanRepaymentTypeOptions: [],
      loanContactRelaOptions: []
    };
  },
  components: {
    rsSelect,
    rsList,
    rsInput,
    vHeader,
    DatePicker
  },
  created() {
    this.getOptions();
  },
  methods: {
    init() {
      if (!this.customer.id) {
        this.$router.push({ path: '/interview' });
      }
    },
    goback() {
      this.currentIndex > 1 ? this.currentIndex-- : this.$router.push({ path: `/sign/${this.customer.taskId}` });
    },
    selected(id, model) {
      if (model === 'applicationTime') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    next() {
      switch (this.currentIndex) {
        case 1:
          this.$refs.form.validate(success => {
            if (success) {
              this.currentIndex += 1;
            }
          });
          break;
        case 2:
          this.$refs.form2.validate(success => {
            if (success) {
              this.currentIndex += 1;
            }
          });
          break;
        case 3:
          if (this.model.proposerJobType === 1) {
            this.$refs.form3.validate(success => {
              if (success) {
                this.currentIndex += 1;
              }
            });
          } else {
            this.$refs.form4.validate(success => {
              if (success) {
                this.currentIndex += 1;
              }
            });
          }
          break;
        case 4:
          this.$refs.form5.validate(success => {
            if (success) {
              this.currentIndex += 1;
            }
          });
          break;
        case 5:
          this.$refs.form6.validate(success => {
            this.submit();
          });
          break;
        default:
          console.log('出问题啦');
      }
    },
    /** 接口请求的loading状态 */
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
      this.model.hasProposerSpouseTogether === 0 ? false : true;
      this.model.id = this.customer.id;
      this.showToastMask();
      console.log(this.model);
      postForm(this.model).then(
        res => {
          if (res.result) {
            this.$router.push({ path: `/sign` });
          } else {
            this.$createToast({
              mask: true,
              txt: '服务器错误'
            }).show();
          }
          this.hideToastMask();
        },
        err => {
          this.$createToast({
            mask: true,
            txt: '网络异常，请重新提交'
          }).show();
        }
      );
    },
    /** cube 新方法 */
    getOptions() {
      let primiseArr = [];
      let i = 8;
      for (let i = 10; i < 19; i++) {
        primiseArr.push(getOptions(i));
      }
      Promise.all(primiseArr).then(
        res => {
          const [
            marriageOptions,
            familyOptions,
            LodgingInfoOptions,
            LoanStateOptions,
            SpousePaperIdOptions,
            proposerCompanyType,
            proposerCompanyDuty,
            loanRepaymentType,
            loanContactRela
          ] = res;
          this.marriageOptions = formatAxiosOptions(marriageOptions.data);
          this.familyOptions = formatAxiosOptions(familyOptions.data);
          this.LodgingInfoOptions = formatAxiosOptions(LodgingInfoOptions.data);
          this.LoanStateOptions = formatAxiosOptions(LoanStateOptions.data);
          this.SpousePaperIdOptions = formatAxiosOptions(SpousePaperIdOptions.data);
          this.CompanyTypeOptions = formatAxiosOptions(proposerCompanyType.data);
          this.CompanyDutyOptions = formatAxiosOptions(proposerCompanyDuty.data);
          this.loanRepaymentTypeOptions = formatAxiosOptions(loanRepaymentType.data);
          this.loanContactRelaOptions = formatAxiosOptions(loanContactRela.data);
          this.initFields();
        },
        err => {
          this.showToast('请求迷路啦～');
        }
      );
    },
    initFields() {
      this.fields = [
        {
          type: 'input',
          modelKey: 'proposerName',
          label: '姓名',
          props: {
            placeholder: '请输入姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerGender',
          label: '性别',
          props: {
            options: options.sex
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerMarriageState',
          label: '婚姻状况',
          props: {
            options: this.marriageOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerFamily',
          label: '家庭结构',
          props: {
            options: this.familyOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerFamilyNum',
          label: '未成年子女个数',
          props: {
            placeholder: '如有,则输入未成年子女个数'
          },
          rules: {
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'proposerPhone',
          label: '联系方式',
          props: {
            placeholder: '请输入手机号码'
          },
          rules: {
            required: true,
            pattern: commonValidations.phoneValidation
          }
        },
        {
          type: 'input',
          modelKey: 'proposerWorkTele',
          label: '单位固定电话',
          props: {
            placeholder: '请输入单位固定电话'
          }
        },
        {
          type: 'input',
          modelKey: 'proposerHouseTele',
          label: '家庭固定电话',
          props: {
            placeholder: '请输入家庭固定电话'
          }
        },
        {
          type: 'select',
          modelKey: 'proposerHouseholdType',
          label: '户籍类型',
          props: {
            options: options.household
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerIdCard',
          label: '身份证号',
          props: {
            placeholder: '请输入身份证号'
          },
          rules: {
            required: true,
            pattern: commonValidations.idCardValidation
          }
        },
        {
          type: 'input',
          modelKey: 'proposerInhabitingInfo',
          label: '居住状况',
          props: {
            placeholder: '请填写居住状况'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerAddress',
          label: '居住地址',
          props: {
            placeholder: '请输入居住地址'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerLocalResident',
          label: '本地居住年限',
          props: {
            placeholder: '请输入本地居住年限'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'select',
          modelKey: 'proposerLodgingInfo',
          label: '住房情况',
          props: {
            options: this.LodgingInfoOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerLoanState',
          label: '住房是否有贷款',
          props: {
            options: this.LoanStateOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerJobType',
          label: '就业性质',
          props: {
            options: options.jobType
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerWorkYear',
          label: '就业年限',
          props: {
            placeholder: '请输入就业年限'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'proposerIncomeMonth',
          label: '月收入',
          props: {
            placeholder: '请输入月收入'
          },
          rules: {
            required: true,
            type: 'number'
          }
        }
      ];
      this.spouseFileds = [
        {
          type: 'input',
          modelKey: 'proposerSpouseName',
          label: '姓名',
          props: {
            placeholder: '请输入姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerSpousePhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: true,
            pattern: commonValidations.phoneValidation
          }
        },
        {
          type: 'select',
          modelKey: 'proposerSpousePaperType',
          label: '证件类型',
          props: {
            options: this.SpousePaperIdOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerSpousePaperId',
          label: '证件名称',
          props: {
            placeholder: '如选择其他，请填写证件全名'
          }
        },
        {
          type: 'select',
          modelKey: 'hasProposerSpouseTogether',
          label: '是否共同申请',
          props: {
            options: options.shifou
          },
          rules: {
            required: true
          }
        }
      ];
      this.sxFileds = [
        {
          type: 'input',
          modelKey: 'proposerCompany',
          label: '工作单位',
          props: {
            placeholder: '请输入工作单位'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerCompanyAddress',
          label: '单位地址',
          props: {
            placeholder: '请输入单位地址'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerCompanyType',
          label: '单位性质',
          props: {
            options: this.CompanyTypeOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerCompanyDuty',
          label: '职务名称',
          props: {
            options: this.CompanyDutyOptions
          },
          rules: {
            required: true
          }
        }
      ];
      this.zgFileds = [
        {
          type: 'input',
          modelKey: 'proposerBusinessLicense',
          label: '经营主体',
          props: {
            placeholder: '请输入经营主体'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerBusinessAddress',
          label: '办公地址',
          props: {
            placeholder: '请输入办公地址'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'proposerBusinessPlace',
          label: '经营场所',
          props: {
            options: options.companyBelong
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerBusiness',
          label: '营业执照注册号',
          props: {
            placeholder: '请输入营业执照注册号'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposerBusinessCard',
          label: '贷款卡号',
          props: {
            placeholder: '请输入贷款卡号'
          },
          rules: {
            required: true
          }
        }
      ];
      this.loanFileds = [
        {
          type: 'input',
          modelKey: 'loanAmount',
          label: '申请金额',
          props: {
            placeholder: '请输入申请金额'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'loanPeriod',
          label: '申请期限',
          props: {
            placeholder: '请输入申请期限'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'select',
          modelKey: 'loanCreditType',
          label: '申请授信方式',
          props: {
            options: options.shouxin
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loanPurpose',
          label: '借款用途',
          props: {
            placeholder: '请输入借款用途'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'loanRepaymentType',
          label: '还款方式',
          props: {
            options: this.loanRepaymentTypeOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loanOther',
          label: '其他',
          props: {
            placeholder: '可填写备注'
          }
        }
      ];
      this.contactFileds = [
        {
          type: 'input',
          modelKey: 'loanContactName',
          label: '姓名',
          props: {
            placeholder: '请输入姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'loanContactRela',
          label: '是您的',
          props: {
            options: this.loanContactRelaOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loanContactTele',
          label: '住宅电话',
          props: {
            placeholder: '请输入住宅电话'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loanContactPhone',
          label: '手机号码',
          props: {
            placeholder: '请输入手机号码'
          },
          rules: {
            required: true,
            pattern: commonValidations.phoneValidation
          }
        }
      ];
    }
  },
  computed: {
    ...mapGetters(['customer'])
  },
  watch: {
    currentIndex(newIndex) {
      if (newIndex === 5) {
        this.nextTxt = '保存';
      } else {
        this.nextTxt = '下一页';
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.application {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
  overflow: auto;

  .placeholder {
    height: 10px;
    line-height: 10px;
    background: $background-list-header;
  }
}
</style>


