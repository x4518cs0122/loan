<template>
  <Page name="interview-detail">
    <v-header @goback="goback" @submit="submit" next="提交" title="抵押面谈"></v-header>
    <!-- <rs-list>
      <ul slot="body">
        <li class="placeholder"></li>
        <li>
          <rs-select selectText="完成时间" model="finishTime" @selected="selected" :isDate="true"></rs-select>
        </li>
        <li class="placeholder"></li>
        <li>
          <rs-input @input="rsinput" inputText="拟申请机构" model="proposedInstitution" required></rs-input>
        </li>
        <li>
          <rs-input @input="rsinput" inputText="拟对接人" model="proposedClerk" required></rs-input>
        </li>
        <li>
          <rs-input
            @input="rsinput"
            inputText="拟上报金额"
            model="proposedAmount"
            :validation="commonValidations.numberValidation"
            message="请输入数字"
            required
          ></rs-input>
        </li>
        <li>
          <rs-select selectText="拟签约时间" model="proposedTime" @selected="selected" :isDate="true"></rs-select>
        </li>
        <li>
          <rs-input
            @input="rsinput"
            inputText="费率"
            model="rate"
            :validation="commonValidations.numberValidation"
            message="请输入数字"
            required
          ></rs-input>
        </li>
        <li>
          <rs-select selectText="客户还款方式" model="repaymentType" @selected="selected" valuetype="8"></rs-select>
        </li>
        <li class="placeholder"></li>
        <li>
          <rs-select selectText="客户用途" model="clientPurposeType" valuetype="9"></rs-select>
        </li>
        <li>
          <rs-input @input="rsinput" inputText="客户用途" model="clientPurpose" required></rs-input>
        </li>
        <li>
          <rs-input @input="rsinput" inputText="调查意见" model="surveyOpinion"></rs-input>
        </li>
      </ul>
      <div class="suspend" slot="footer">
        <el-button type="danger" plain @click="deleteOrder">废单</el-button>
      </div>
    </rs-list>-->
    <cube-form :model="model" :immediate-validate="false" @validate="validateHandler" ref="form">
      <cube-form-group>
        <cube-form-item :field="fieldsTime" class="self-form-item">
          <cube-button @click="showDatePicker('finishTime')">{{ model.finishTimeTxt }}></cube-button>
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
        <cube-form-item :field="fieldsTime" class="self-form-item">
          <cube-button @click="showDatePicker('proposedTime')">{{ model.proposedTimeTxt }}></cube-button>
        </cube-form-item>
        <cube-form-item
          :field="item"
          v-for="item in fields2"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
    </cube-form>
    <cube-button :inline="true" class="suspend" @click="confirmDelete">废单</cube-button>
  </Page>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import rsSelect from 'base/rsselect/rsselect';
import { commonValidations } from '@/utils/Const.js';
import { mapGetters } from 'vuex';
import { postAdvice, killProcess, getOptions } from 'api/api';
import { Page } from 'base';
import { formatAxiosOptions } from '../utils';
export default {
  data() {
    return {
      commonValidations: commonValidations,
      /**记录当前datepicker的创建者 */
      currentType: '',
      paymentOptions: [],
      usageOptions: [],
      fields: [],
      fields2: [],
      fieldsTime: {
        modelKey: 'finishTime',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      proposedTime: {
        modelKey: 'proposedTime',
        label: '拟签约时间',
        rules: {
          required: true
        }
      },
      /** proposedTimeTxt与finishTimeTxt只控制显示，传参数不需要 */
      model: {
        finishTime: '',
        finishTimeTxt: '',
        proposedInstitution: '',
        proposedClerk: '',
        proposedAmount: '',
        proposedTime: '',
        proposedTimeTxt: '',
        rate: '',
        repaymentType: 0,
        clientPurposeType: 0,
        clientPurpose: '',
        surveyOpinion: ''
      }
    };
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: { vHeader, rsSelect, rsInput, rsList, Page },
  created() {
    let paymentP = getOptions(8);
    let usageP = getOptions(9);
    Promise.all([paymentP, usageP]).then(
      res => {
        const [paymentOptions, usageOptions] = res;
        this.paymentOptions = formatAxiosOptions(paymentOptions.data);
        this.usageOptions = formatAxiosOptions(usageOptions.data);
        this.initFields();
      },
      err => {
        this.showToast('请求迷路啦～');
      }
    );
  },
  methods: {
    selected(id, model) {
      if (model === 'finishTime' || model === 'proposedTime') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    goback() {
      this.$router.push({ path: `/interview` });
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    /** cube 新方法 */
    initFields() {
      this.fields = [
        {
          type: 'input',
          modelKey: 'proposedInstitution',
          label: '拟申请机构',
          props: {
            placeholder: '请输入拟申请机构'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposedClerk',
          label: '拟对接人',
          props: {
            placeholder: '请输入拟对接人'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'proposedAmount',
          label: '拟上报金额',
          props: {
            placeholder: '请输入拟上报金额'
          },
          rules: {
            required: true,
            type: 'number'
          }
        }
      ];
      this.fields2 = [
        {
          type: 'input',
          modelKey: 'rate',
          label: '费率',
          props: {
            placeholder: '请输入费率'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'select',
          modelKey: 'repaymentType',
          label: '客户还款方式',
          props: {
            options: this.paymentOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'clientPurposeType',
          label: '客户用途',
          props: {
            options: this.usageOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'clientPurpose',
          label: '客户用途',
          props: {
            placeholder: '请输入客户用途'
          }
        },
        {
          type: 'input',
          modelKey: 'surveyOpinion',
          label: '调查意见',
          props: {
            placeholder: '请输入调查意见'
          }
        }
      ];
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex);
    },
    showDatePicker(type) {
      this.currentType = type;
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
      const type = `${this.currentType}Txt`;
      this.model[type] = selectedText.join('-');

      this.model[this.currentType] = new Date(date).getTime();
    },
    confirmDelete() {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-important',
        title: '危险操作！',
        content: `删除后该订单将彻底作废`,
        confirmBtn: {
          text: '删除',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.deleteOrder();
        }
      }).show();
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
    deleteOrder() {
      //调用删除订单api,跳转到面谈列表界面
      this.showToastMask();
      let rootId = this.customer.rootId;
      killProcess(rootId).then(res => {
        if (res.result) {
          this.hideToastMask();
          this.goback();
        }
      });
    },
    submit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.showToastMask();
          this.model.viewId = this.customer.id;
          postAdvice(this.model).then(res => {
            if (res.result) {
              this.hideToastMask();
              this.goback();
            } else {
              this.hideToastMask();
              this.$createToast({
                mask: true,
                txt: '数据走丢啦，请重新提交'
              }).show();
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.page-interview-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .suspend {
    margin: 20px;
    padding: 10px 20px;

    &.cube-btn {
      background: #FF4040;
      color: #fff;
      font-size: 14px;
    }
  }

  .placeholder {
    height: 10px;
    line-height: 10px;
    background: $background-list-header;
  }
}
</style>


