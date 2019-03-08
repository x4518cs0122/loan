<template>
  <div class="erjiedan">
    <v-header
      :back="currentIndex === 1?'首页':'上一页'"
      title="二手房接单"
      @goback="goback"
      :next="currentIndex === 3? '提交':'下一步'"
      @submit="next"
    ></v-header>
    <div v-show="currentIndex === 1">
      <cube-form :model="obj" :immediate-validate="false" ref="form1">
        <cube-form-group legend="客户基本信息">
          <cube-form-item :field="time" class="self-form-item">
            <Date-picker :model="obj" modelKey="finishTime" :initTxt="initTxt"></Date-picker>
          </cube-form-item>
          <cube-form-item
            :field="item"
            v-for="item in basicInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
        <cube-form-group legend="客户配偶信息" v-if="obj.hasSpouse === 1">
          <cube-form-item
            :field="item"
            v-for="item in spouseInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
      </cube-form>
    </div>
    <div v-show="currentIndex === 2">
      <cube-form :model="obj" :immediate-validate="false" ref="form2">
        <cube-form-group legend="产权人基本信息">
          <cube-form-item
            :field="item"
            v-for="item in ownerInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
        <cube-form-group legend="产权人配偶信息" v-if="obj.hasOwerSpouse === 1">
          <cube-form-item
            :field="item"
            v-for="item in ownerSpouseInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
        <cube-form-group legend="保证人基本情况" v-if="obj.hasGuarantor === 1">
          <cube-form-item
            :field="item"
            v-for="item in guarantorInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
        <cube-form-group legend="房屋基本情况">
          <cube-form-item
            :field="item"
            v-for="item in houseInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
      </cube-form>
    </div>
    <div v-show="currentIndex === 3">
      <cube-form :model="obj" :immediate-validate="false" ref="form3">
        <cube-form-group legend="客户借款基本情况">
          <cube-form-item
            :field="item"
            v-for="item in clientLoanInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
        <cube-form-group legend="其它">
          <cube-form-item
            :field="item"
            v-for="item in restInfo"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import vHeader from 'components/header/header';
import { commonValidations } from '@/utils/Const.js';
import { startHouse, postSecondOrder, getOptions, getSecondOrderInfo, updateSecondOrderInfo } from '@/api/api';
import { formatAxiosOptions } from '@/components/mortgageLoan/utils';
import { DatePicker } from 'base';
import * as _ from 'lodash';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      currentIndex: 1,
      obj: {
        id: null,
        finishTime: null,
        borrowerName: '',
        borrowerPhone: '',
        borrowerCompany: '',
        borrowerCompanyPhone: '',
        borrowerSalary: null,
        borrowerAddress: '',
        borrowerResidentCity: '',
        borrowerCertificateType: '',
        borrowerCertificateNumber: '',
        borrowerSpouseName: '',
        borrowerSpousePhone: '',
        borrowerSpouseCompany: '',
        borrowerSpouseCompanyPhone: '',
        borrowerSpouseResidentCity: '',
        borrowerSpouseCertificateType: '',
        borrowerSpouseCertificateNumber: '',
        ownerName: '',
        ownerPhone: '',
        ownerSpouseName: '',
        ownerSpousePhone: '',
        ownerIdCard: '',
        ownerSpouseIdCard: '',
        guarantorName: '',
        guarantorPhone: '',
        guarantorIdCard: '',
        guarantorCompany: '',
        houseAddress: '',
        houseCertificateNumber: '',
        houseLandCertificateNumber: '',
        houseAffiliation: '',
        houseBuiltTime: '',
        houseType: '',
        houseArea: '',
        houseLandType: '',
        loanBank: '',
        manager: '',
        managerPhone: '',
        evaluationCompany: '',
        houseTransactionPrice: null,
        houseEvaluatePrice: null,
        loanAmount: null,
        loanPeriod: '',
        guaranteeType: '',
        payType: '',
        loanType: '',
        downPayAmount: null,
        downPayType: '',
        isDealReal: '',
        isClientSituationReal: '',
        sellerHandle: '',
        remark: '',
        source: '',
        agentName: '',
        otherRemark: '',

        /**无效数据，用于判断显示 */
        hasSpouse: null,
        hasOwerSpouse: null,
        hasGuarantor: null
      },
      time: {
        modelKey: 'finishTime',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      isSign: false,
      initTxt: '',
      basicInfo: [],
      spouseInfo: [],
      guarantorInfo: [],
      houseInfo: [],
      clientLoanInfo: [],
      ownerInfo: [],
      ownerSpouseInfo: [],
      restInfo: [],
      /** 下拉框内容 */
      cardNameOptions: [],
      houseLandOptions: [],
      houseTypeOptions: [],
      payTypeOptions: [],
      loanTypeOptions: [],
      sellerHandleOptions: [],
      orderFromOptions: []
    };
  },
  components: { vHeader, DatePicker },
  created() {
    this.getOption();
    this.checkSignState()
  },
  methods: {
    goback() {
      if (this.currentIndex === 1) {
        this.$router.push({ path: '/bussiness' });
        return;
      }
      this.currentIndex--;
    },
    next() {
      this.$refs[`form${this.currentIndex}`].validate(success => {
        if (success) {
          /** 面签时，更新表单 */
          this.currentIndex === 3 ? (this.isSign ? this.updateOrderForm() : this.submit()) : this.currentIndex++;
        }
      });
    },
    checkSignState() {
      this.isSign = this.$route.meta.sign;
      if (this.isSign) {
        const visaId = _.get(this.$store.getters, 'customer.id', undefined);
        getSecondOrderInfo(visaId).then(res => {
          if (res.result) {
            this.obj = Object.assign(
              this.obj,
              { ...res.data.checklist },
              {
                hasSpouse: _.get(this.obj, 'borrowerSpouseName', undefined) ? 1 : 0,
                hasOwerSpouse: _.get(this.obj, 'ownerSpouseName', undefined) ? 1 : 0,
                hasGuarantor: _.get(this.obj, 'guarantorName', undefined) ? 1 : 0
              }
            );
            const finishTime = _.get(this.obj, 'finishTime');
            const time = new Date(finishTime);
            this.initTxt = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
          }
        });
      }
    },
    updateOrderForm() {
      let toast = this.$createToast({
        mask: true,
        time: 0
      });
      toast.show();
      updateSecondOrderInfo(this.obj.id, this.obj)
        .then(res => {
          if (res.result) {
            /** 面签编辑后，跳转至确认面签状态 */
            this.$router.push({ path: '/erSign/confirmState' });
          }
          toast.hide();
        })
        .catch(() => {
          toast.hide();
          this.$createToast({
            txt: '网络异常',
            mask: true
          });
        });
    },
    getOption() {
      const orderFrom = getOptions(5);
      const cardName = getOptions(14);
      const houseType = getOptions(21);
      const houseLand = getOptions(22);
      const payType = getOptions(23);
      const loanType = getOptions(24);
      const sellerHandle = getOptions(25);
      Promise.all([orderFrom, cardName, houseType, houseLand, payType, loanType, sellerHandle]).then(res => {
        const [rf, card, house, hl, py, lt, sh] = res;
        this.orderFromOptions = formatAxiosOptions(rf.data);
        this.cardNameOptions = formatAxiosOptions(card.data);
        this.houseTypeOptions = formatAxiosOptions(house.data);
        this.houseLandOptions = formatAxiosOptions(hl.data);
        this.payTypeOptions = formatAxiosOptions(py.data);
        this.loanTypeOptions = formatAxiosOptions(lt.data);
        this.sellerHandleOptions = formatAxiosOptions(sh.data);
        this.initFields();
      });
    },
    /** 初始化表单内容 */
    initFields() {
      this.basicInfo = [
        {
          type: 'input',
          modelKey: 'borrowerName',
          label: '姓名',
          props: {
            placeholder: '请输入客户姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerPhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: true,
            type: 'tel'
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerCompany',
          label: '工作单位',
          props: {
            placeholder: '请输入工作单位'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerCompanyPhone',
          label: '单位电话',
          props: {
            placeholder: '请输入单位电话'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerSalary',
          label: '月均收入(元)',
          props: {
            placeholder: '请输入月均收入'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerAddress',
          label: '联系地址',
          props: {
            placeholder: '请输入联系地址'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerResidentCity',
          label: '户口所在地',
          props: {
            placeholder: '请输入户口所在地'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'borrowerCertificateType',
          label: '证件类型',
          props: {
            options: [{ value: '1', text: '身份证' }]
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerCertificateNumber',
          label: '证件号码',
          props: {
            placeholder: '请输入证件号码'
          },
          rules: {
            required: false,
            pattern: commonValidations.idCardValidation
          }
        },
        {
          type: 'select',
          modelKey: 'hasSpouse',
          label: '有无配偶',
          props: {
            options: [{ value: 0, text: '无' }, { value: 1, text: '有' }]
          },
          rules: {
            required: true
          }
        }
      ];
      this.spouseInfo = [
        {
          type: 'input',
          modelKey: 'borrowerSpouseName',
          label: '配偶姓名',
          props: {
            placeholder: '请输入配偶姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerSpousePhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: true,
            type: 'tel'
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerSpouseCompany',
          label: '工作单位',
          props: {
            placeholder: '请输入工作单位'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerSpouseCompanyPhone',
          label: '单位电话',
          props: {
            placeholder: '请输入单位电话'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerSpouseResidentCity',
          label: '户口所在地',
          props: {
            placeholder: '请输入户口所在地'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'borrowerSpouseCertificateType',
          label: '证件名称',
          props: {
            options: this.cardNameOptions
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'borrowerSpouseCertificateNumber',
          label: '证件号码',
          props: {
            placeholder: '请输入证件号码'
          },
          rules: {
            required: false,
            pattern: commonValidations.idCardValidation
          }
        }
      ];
      this.ownerInfo = [
        {
          type: 'input',
          modelKey: 'ownerName',
          label: '姓名',
          props: {
            placeholder: '请输入产权人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'ownerPhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: true,
            type: 'tel'
          }
        },
        {
          type: 'input',
          modelKey: 'ownerIdCard',
          label: '身份证号',
          props: {
            placeholder: '请输入身份证号'
          },
          rules: {
            required: false,
            pattern: commonValidations.idCardValidation
          }
        },
        {
          type: 'select',
          modelKey: 'hasOwerSpouse',
          label: '有无配偶',
          props: {
            options: [{ value: 0, text: '无' }, { value: 1, text: '有' }]
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'hasGuarantor',
          label: '有无保证人',
          props: {
            options: [{ value: 0, text: '无' }, { value: 1, text: '有' }]
          },
          rules: {
            required: false
          }
        }
      ];
      this.ownerSpouseInfo = [
        {
          type: 'input',
          modelKey: 'ownerSpouseName',
          label: '姓名',
          props: {
            placeholder: '请输入产权人姓名'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'ownerSpousePhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: false,
            type: 'tel'
          }
        },
        {
          type: 'input',
          modelKey: 'ownerSpouseIdCard',
          label: '身份证号',
          props: {
            placeholder: '请输入身份证号'
          },
          rules: {
            required: false,
            pattern: commonValidations.idCardValidation
          }
        }
      ];
      this.guarantorInfo = [
        {
          type: 'input',
          modelKey: 'guarantorName',
          label: '姓名',
          props: {
            placeholder: '请输入客户姓名'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'guarantorPhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: false,
            type: 'tel'
          }
        },
        {
          type: 'input',
          modelKey: 'guarantorIdCard',
          label: '身份证号',
          props: {
            placeholder: '请输入身份证号'
          },
          rules: {
            required: false,
            pattern: commonValidations.idCardValidation
          }
        },
        {
          type: 'input',
          modelKey: 'guarantorCompany',
          label: '工作单位',
          props: {
            placeholder: '请输入工作单位'
          },
          rules: {
            required: false
          }
        }
      ];
      this.houseInfo = [
        {
          type: 'input',
          modelKey: 'houseAddress',
          label: '房屋地址',
          props: {
            placeholder: '请输入房屋地址'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'houseCertificateNumber',
          label: '房产证号',
          props: {
            placeholder: '请输入房产证号'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'houseAffiliation',
          label: '房屋所属区局',
          props: {
            placeholder: '请输入房屋所属区局'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'houseBuiltTime',
          label: '建成年份',
          props: {
            placeholder: '请输入建成年份'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'houseType',
          label: '房屋类型',
          props: {
            options: this.houseTypeOptions
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'houseArea',
          label: '建筑面积',
          props: {
            placeholder: '请输入建筑面积'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'houseLandType',
          label: '土地属性',
          props: {
            options: this.houseLandOptions
          },
          rules: {
            required: false
          }
        }
      ];
      this.clientLoanInfo = [
        {
          type: 'input',
          modelKey: 'loanBank',
          label: '贷款银行',
          props: {
            placeholder: '请输入贷款银行'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'manager',
          label: '客户经理姓名',
          props: {
            placeholder: '请输入客户经理姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'managerPhone',
          label: '客户经理号码',
          props: {
            placeholder: '请输入客户经理号码'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'evaluationCompany',
          label: '评估公司',
          props: {
            placeholder: '请输入评估公司'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'houseTransactionPrice',
          label: '房屋成交价(万元)',
          props: {
            placeholder: '请输入房屋成交价:万元'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'houseEvaluatePrice',
          label: '评估值(万元)',
          props: {
            placeholder: '请输入评估值'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loanAmount',
          label: '贷款金额(万元)',
          props: {
            placeholder: '请输入贷款金额'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'loanPeriod',
          label: '贷款年限(年)',
          props: {
            placeholder: '请输入贷款年限'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'guaranteeType',
          label: '担保方式',
          props: {
            placeholder: '请输入担保方式'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'payType',
          label: '还款方式',
          props: {
            options: this.payTypeOptions
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'loanType',
          label: '贷款类型',
          props: {
            options: this.loanTypeOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'downPayAmount',
          label: '首付金额(万元)',
          props: {
            placeholder: '请输入首付金额'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'downPayType',
          label: '首付款交付方式',
          props: {
            placeholder: '请输入首付款交付方式'
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'isDealReal',
          label: '成交是否真实',
          props: {
            options: [{ value: '0', text: '否' }, { value: '1', text: '是' }]
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'isClientSituationReal',
          label: '情况是否属实',
          props: {
            options: [{ value: '0', text: '否' }, { value: '1', text: '是' }]
          },
          rules: {
            required: false
          }
        },
        {
          type: 'select',
          modelKey: 'sellerHandle',
          label: '卖方存折办理',
          props: {
            options: this.sellerHandleOptions
          },
          rules: {
            required: false
          }
        },
        {
          type: 'input',
          modelKey: 'remark',
          label: '备注',
          props: {
            placeholder: '请输入备注'
          },
          rules: {
            required: false
          }
        }
      ];
      this.restInfo = [
        {
          type: 'select',
          modelKey: 'source',
          label: '单子来源渠道',
          props: {
            options: this.orderFromOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'agentName',
          label: '中介名称',
          props: {
            placeholder: '请输入中介名称'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'otherRemark',
          label: '其他备注事项',
          props: {
            placeholder: '请输入其他备注事项'
          },
          rules: {
            required: true
          }
        }
      ];
    },
    async submit() {
      let checklistId;
      let toast = this.$createToast({
        mask: true,
        time: 0
      });
      toast.show();
      startHouse()
        .then(res => {
          const checklistId = res.data.id;
          this.obj.id = checklistId;
          postSecondOrder(checklistId, this.obj).then(res => {
            if (res.result) {
              this.$router.push({ path: '/bussiness' });
            }
          });
        })
        .finally(() => {
          toast.hide();
        });
    },
    ...mapActions(['getSignList'])
  }
};
</script>

<style lang='stylus' scoped>
.erjiedan {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>