<template>
  <Page name="interview-detail">
    <v-header @goback="goback" @submit="submit" next="提交" title="抵押面谈"></v-header>
    <cube-form :model="model" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item :field="fieldsTime" class="self-form-item">
          <Date-picker :model="model" modelKey="finishTime"></Date-picker>
        </cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-form-item
          :field="item"
          v-for="item in fields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
        <cube-form-item :field="proposedTime" class="self-form-item">
          <Date-picker :model="model" modelKey="proposedTime"></Date-picker>
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
import {DatePicker} from 'base'
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
        proposedInstitution: '',
        proposedClerk: '',
        proposedAmount: '',
        proposedTime: '',
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
  components: { vHeader, DatePicker, Page },
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
    goback() {
      this.$router.push({ path: `/interview` });
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
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'surveyOpinion',
          label: '调查意见',
          props: {
            placeholder: '请输入调查意见'
          },
          rules: {
            required: true
          }
        }
      ];
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
}
</style>


