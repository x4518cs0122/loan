<template>
    <div class="erjiedan">
        <v-header :back="currentIndex === 1?'首页':'上一页'" title="二手房接单" @goback="goback" :next="currentIndex === 3? '提交':'下一步'" @submit="next"></v-header>
        <div v-show="currentIndex === 1">
            <rs-list>
                <ul slot="body">
                    <li class="list-header"> 
                        <p>借款人基本信息</p>
                    </li>
                    <li><rs-select selectText="完成时间" model="finishTime" @selected="selected" :isDate="true"></rs-select></li>
                    <li><rs-input @input="rsinput" inputText="姓名" model="borrowerName" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="联系方式" model="borrowerPhone"
                      required 
                      :validation="commonValidations.phoneValidation"
                      :message="messageTip.phoneValidation"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="工作单位" model="borrowerCompany" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="单位电话" model="borrowerCompanyPhone" 
                        required
                        :validation="commonValidations.numberValidation"
                        :message="messageTip.numberMessage"></rs-input>
                    </li>
                    <li><number-input @input="rsinput" inputText="月均收入" model="borrowerSalary"
                        required
                        :validation="commonValidations.numberValidation"
                        :message="messageTip.numberMessage"></number-input></li>
                    <li><rs-input @input="rsinput" inputText="联系地址" model="borrowerAddress" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="户口所在地" model="borrowerResidentCity" required></rs-input></li>
                    <li><rs-select selectText="证件类型" :options="options.idType" model="borrowerCertificateType" @selected="selected"></rs-select></li>
                    <li class="no-border"><rs-input @input="rsinput" inputText="证件号码" model="borrowerCertificateNumber"
                        required
                        :validation="commonValidations.idCardValidation"
                        message="请输入正确的证件号码"></rs-input>
                    </li>
                    <li><rs-select selectText="有无配偶" :options="options.has" @selected="selected" model="hasSpouse"></rs-select></li>
                    <div v-show="obj.hasSpouse === 1">
                        <li class="list-header"> 
                            <p>借款人配偶基本信息</p>
                        </li>
                        <li><rs-input @input="rsinput" inputText="配偶姓名" model="borrowerSpouseName" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="联系方式" model="borrowerSpousePhone"
                            required
                            :validation="commonValidations.phoneValidation"
                            :message="messageTip.phoneMessage"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="工作单位" model="borrowerSpouseCompany" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="单位电话" model="borrowerSpouseCompanyPhone" 
                            required
                            :validation="commonValidations.numberValidation"
                            :message="messageTip.numberMessage"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="户口所在地" model="borrowerSpouseResidentCity" required></rs-input></li>
                        <li><rs-select selectText="证件名称" valueType="14" @selected="selected" model="borrowerSpouseCertificateType"></rs-select></li>
                        <li><rs-input @input="rsinput" inputText="证件号码" model="borrowerSpouseCertificateNumber"
                            required
                            :validation="commonValidations.idCardValidation"
                            message="请输入正确的证件号码"></rs-input>
                        </li>
                    </div>
                </ul>
            </rs-list>
        </div>
        <div v-show="currentIndex === 2">
            <rs-list>
                <ul slot="body">
                    <li class="list-header"> 
                        <p>产权人基本情况</p>
                    </li>
                    <li><rs-input @input="rsinput" inputText="姓名" model="ownerName" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="联系方式" model="ownerPhone"
                        required
                        :validation="commonValidations.phoneValidation"
                        :message="messageTip.phoneMessage"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="身份证号" model="ownerIdCard"
                        required
                        :validation="commonValidations.idCardValidation"
                        message="请输入正确的证件号码"></rs-input></li>
                    <li><rs-select selectText="有无配偶" :options="options.has" @selected="selected" model="hasOwerSpouse"></rs-select></li>
                    <li><rs-select selectText="有无保证人" :options="options.has" @selected="selected" model="hasGuarantor"></rs-select></li>
                    <div v-show="obj.hasOwerSpouse === 1">
                        <li class="list-header"> 
                            <p>产权人配偶信息</p>
                        </li>
                        <li><rs-input @input="rsinput" inputText="配偶姓名" model="ownerSpouseName" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="联系方式" model="ownerSpousePhone"
                            required
                            :validation="commonValidations.phoneValidation"
                            :message="messageTip.phoneMessage"></rs-input></li>
                        <li class="no-border"><rs-input @input="rsinput" inputText="身份证号" model="ownerSpouseIdCard"
                            required
                            :validation="commonValidations.idCardValidation"
                            message="请输入正确的证件号码"></rs-input></li>
                    </div>
                    <div v-show="obj.hasGuarantor === 1">
                        <li class="list-header"> 
                            <p>保证人基本情况</p>
                        </li>
                        <li><rs-input @input="rsinput" inputText="姓名" model="guarantorName" required></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="联系方式" model="guarantorPhone"
                            required
                            :validation="commonValidations.phoneValidation"
                            :message="messageTip.phoneMessage"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="身份证号" model="guarantorIdCard"
                            required
                            :validation="commonValidations.idCardValidation"
                            message="请输入正确的证件号码"></rs-input></li>
                        <li><rs-input @input="rsinput" inputText="工作单位" model="guarantorCompany"></rs-input></li>
                    </div>
                    <li class="list-header"> 
                        <p>房屋基本情况</p>
                    </li>
                    <li><rs-input @input="rsinput" inputText="房屋地址" model="houseAddress" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="房产证号" model="houseCertificateNumber" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="土地证号" model="houseLandCertificateNumber" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="房屋所属区局" model="houseAffiliation" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="建成年份" model="houseBuiltTime" required></rs-input></li>
                    <li><rs-select selectText="房屋类型" valueType="21" model="houseType" @selected="selected"></rs-select></li>                
                    <li><rs-input @input="rsinput" inputText="建筑面积" model="houseArea" required></rs-input></li>
                    <li><rs-select selectText="土地属性" valueType="22" model="houseLandType" @selected="selected"></rs-select></li>                
                </ul>
            </rs-list>
        </div>
        <div v-show="currentIndex === 3">
            <rs-list>
                <ul slot="body">
                    <li class="list-header"> 
                        <p>客户借款基本情况</p>
                    </li>
                    <li><rs-input @input="rsinput" inputText="贷款银行" model="loanBank" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="客户经理姓名" model="manager" required></rs-input>
                    </li>
                    <li><rs-input @input="rsinput" inputText="客户经理号码" model="managerPhone" 
                        required
                        :validation="commonValidations.phoneValidation"
                        :message="messageTip.phoneMessage"></rs-input>
                    </li>
                    <li><rs-input @input="rsinput" inputText="评估公司" model="evaluationCompany" required></rs-input></li>
                    <li><number-input @input="rsinput" inputText="房屋成交价" model="houseTransactionPrice" required></number-input></li>
                    <li class="placeholder"></li>
                    <li><number-input @input="rsinput" inputText="评估值" model="houseEvaluatePrice" required></number-input></li>
                    <li><number-input @input="rsinput" inputText="贷款金额" model="loanAmount" required></number-input></li>
                    <li class="no-border"><rs-input @input="rsinput" inputText="贷款年限" model="loanPeriod" 
                        required
                        :validation="commonValidations.numberValidation"
                        :message="messageTip.numberMessage"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="担保方式" model="guaranteeType" required></rs-input></li>
                    <li><rs-select selectText="还款方式" valueType="23" model="payType" @selected="selected"></rs-select></li>
                    <li><rs-select selectText="贷款类型" valueType="24" model="loanType" @selected="selected"></rs-select></li>
                    <li><number-input @input="rsinput" inputText="首付金额" model="downPayAmount" required></number-input></li>
                    <li><rs-input @input="rsinput" inputText="首付方式" model="downPayType" required></rs-input></li>
                    <li><rs-select selectText="成交是否真实" :options="options.isreal" model="isDealReal" @selected="selected"></rs-select></li>
                    <li><rs-select selectText="客户情况是否真实" :options="options.isreal" model="isClientSituationReal" @selected="selected"></rs-select></li>
                    <li><rs-select selectText="卖方存折办理" valueType="25" model="sellerHandle" @selected="selected"></rs-select></li>
                    <li><rs-input @input="rsinput" inputText="备注" model="remark"></rs-input></li>
                </ul>
            </rs-list>
        </div>
    </div>     
</template>

<script type='text/ecmascript-6'>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import numberInput from 'base/rsinput/rsNumberInput';
import rsSelect from 'base/rsselect/rsselect';
import {commonValidations, messageTip} from '@/utils/Const.js';
import {startHouse, postSecondOrder} from '@/api/api';
export default {
  data() {
    return {
      commonValidations: commonValidations,
      messageTip: messageTip,
      currentIndex: 1,
      options: {
        idType: [{id: 1, value: '身份证'}],
        isreal: [{id: 0, value: '否'}, {id: 1, value: '是'}],
        has:[{id:0, value:'无'}, {id:1, value: '有'}]
      },
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
        manager:'',
        managerPhone:'',
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

        /**无效数据，用于判断显示 */
        hasSpouse:0,
        hasOwerSpouse:0,
        hasGuarantor:0
      },
    };
  },
  components: {vHeader, rsList, rsSelect, rsInput, numberInput},
  methods: {
    selected(key, model) {
      if (model === 'finishTime') {
        this.obj[model] = new Date(key).getTime();
        return;
      }
      this.obj[model] = parseInt(key);
    },
    goback() {
      if (this.currentIndex === 1) {
        this.$router.push({path: '/bussiness'});
        return;
      }
      this.currentIndex--;
    },
    next() {
      this.currentIndex === 3 ? this.submit() : this.currentIndex++;
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    async submit() {
      let checklistId;
      startHouse().then(res => {
        const checklistId = res.data.id;
        this.obj.id = checklistId;
        postSecondOrder(checklistId, this.obj).then(res => {
          if (res.result) {
            this.$router.push({path: '/bussiness'});
          }
        });
      });
    },
  },
  created() {},
};
</script>

<style lang='stylus' scoped>
</style>