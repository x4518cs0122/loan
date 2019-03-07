<template>
  <div class="subbranch">
    <v-header title="确定审批状态" next="提交" @goback="goback" @submit="submit"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item :field="state" class="self-form-item"></cube-form-item>
      </cube-form-group>
    </cube-form>
    <cube-form
      :model="obj"
      :immediate-validate="false"
      ref="passForm"
      v-show="obj.approveState === 1"
    >
      <cube-form-group legend="报告内容">
        <cube-form-item :field="passTime" class="self-form-item">
          <Date-picker :model="obj" modelKey="approveTime"></Date-picker>
        </cube-form-item>
        <cube-form-item
          :field="item"
          v-for="item in pass"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
    </cube-form>
    <cube-form
      :model="obj"
      :immediate-validate="false"
      ref="notPassForm"
      v-show="obj.approveState === 0"
    >
      <cube-form-group legend="报告内容">
        <cube-form-item :field="passTime" class="self-form-item">
          <Date-picker :model="obj" modelKey="approveTime"></Date-picker>
        </cube-form-item>
        <cube-form-item
          :field="item"
          v-for="item in notpass"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
    </cube-form>
    <!-- <rs-list>
        <ul slot="body">
          <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
          <li><rs-select selectText="环节状态" model="approveState" @selected="selected" :options="options.state"></rs-select></li>
          <div v-show="obj.approveState === 1" key="pass">
            <li><rs-select selectText="审批通过日期" model="approveTime" @selected="selected" :isDate="true"></rs-select></li>
            <li class="list-header">报告内容</li>
            <li><number-input @input="rsinput" inputText="金额" model="amount" :validation="commonValidations.numberValidation" required></number-input></li>
            <li><rs-input @input="rsinput" inputText="年限" model="period" :validation="commonValidations.numberValidation" required></rs-input></li>
            <li><rs-input @input="rsinput" inputText="利率" model="rate" :validation="commonValidations.numberValidation" required></rs-input></li>
            <li><rs-select selectText="放款条件" model="loanCondition" valueType="2" @selected="selected"></rs-select></li>
            <li><rs-input @input="rsinput" inputText="备注" model="remark"></rs-input></li>
          </div>
          <div v-show="obj.approveState === 0" key="notpass">
            <li><rs-select selectText="未通过时间" model="approveTime" @selected="selected" :isDate="true"></rs-select></li>
            <li><rs-select selectText="未通过原因" valueType="19" model="failReason" @selected="selected"></rs-select></li>
            <li v-show="obj.failReason === 63"><rs-input @input="rsinput" inputText="未通过原因" model="failReasonOther"></rs-input></li>
            <li><rs-select selectText="后续操作" valueType="20" model="laterAction" @selected="selected"></rs-select></li>
          </div>
        </ul>
    </rs-list>-->
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsSelect from 'base/rsselect/rsselect';
import { commonValidations, messageTip } from '@/utils/Const.js';
import { changeState, skipZhengping, getOptions } from 'api/api';
import { mapGetters, mapActions } from 'vuex';
import { formatAxiosOptions } from '../utils';
import { DatePicker } from 'base';
export default {
  data() {
    return {
      obj: {
        id: null,
        approveState: null,
        approveTime: null,
        amount: null,
        period: '',
        rate: '',
        loanCondition: '',
        remark: '',
        failReason: null,
        failReasonOther: '',
        laterAction: null,
        loanId: null
      },
      state: {
        type: 'select',
        modelKey: 'approveState',
        label: '环节状态',
        props: {
          options: [{ value: 0, text: '未通过' }, { value: 1, text: '已通过' }]
        },
        rules: {
          required: true
        }
      },
      passTime: {
        modelKey: 'approveTime',
        label: '审批通过日期',
        rules: {
          required: true
        }
      },
      pass: [],
      notpass: [],
      loanConditionOptions: [],
      laterActionOptions: [],
      failReasonOptions: []
    };
  },
  created() {
    this.getOption();
  },
  methods: {
    goback() {
      this.$router.push({ path: `/approve/${this.customer.id}` });
    },
    getOption() {
      const loanCondition = getOptions(2);
      const failReason = getOptions(19);
      const laterAction = getOptions(20);
      Promise.all([loanCondition, failReason, laterAction]).then(res => {
        const [a, b, c] = res;
        this.loanConditionOptions = formatAxiosOptions(a.data);
        this.failReasonOptions = formatAxiosOptions(b.data);
        this.laterActionOptions = formatAxiosOptions(c.data);
        this.initFields();
      });
    },
    initFields() {
      this.pass = [
        {
          type: 'input',
          modelKey: 'amount',
          label: '金额',
          props: {
            placeholder: '请输入金额'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'period',
          label: '年限',
          props: {
            placeholder: '请输入年限'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'rate',
          label: '利率',
          props: {
            placeholder: '请输入利率'
          },
          rules: {
            required: true,
            type: 'number'
          }
        },
        {
          type: 'select',
          modelKey: 'loanCondition',
          label: '放款条件',
          props: {
            options: this.loanConditionOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'remark',
          label: '备注',
          props: {
            placeholder: '请输入备注'
          }
        }
      ];
      this.notpass = [
        {
          type: 'select',
          modelKey: 'failReason',
          label: '未通过原因',
          props: {
            options: this.failReasonOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'failReasonOther',
          label: '未通过原因',
          props: {
            placeholder: '如有,可备注未通过原因'
          }
        },
        {
          type: 'select',
          modelKey: 'laterAction',
          label: '后续操作',
          props: {
            options: this.laterActionOptions
          },
          rules: {
            required: true
          }
        }
      ];
    },
    toastShow() {
      if (!this.toast) {
        this.toast = this.$createToast({
          mask: true,
          time: 0
        });
      }
      this.toast.show();
    },
    toastHide() {
      this.toast.hide();
    },
    submit() {
      let subForm = this.$refs.notPassForm;
      this.$refs.form.validate(success => {
        if (success) {
          // this.obj.amount = parseFloat(this.obj.amount);
          
          if (this.obj.approveState === 1) {
            subForm = this.$refs.passForm;
          }
          /** 校验子表单状态 */
          subForm.validate(subSuccess => {
            if (subSuccess) {
              this.obj.loanId = this.customer.id;
              this.toastShow();
              changeState(this.customer.id, this.obj).then(
                res => {
                  if (res.result) {
                    if (this.customer.extra.commentType === '正评') {
                      skipZhengping(this.customer.id).then(res => {
                        this.toastHide();
                        this.getApprove();
                        this.$router.push({ path: '/approve' });
                      });
                      return;
                    }
                    this.goback();
                  } else {
                    this.toastHide();
                    this.$createToast({
                      mask: true,
                      txt: '服务器故障'
                    }).show();
                  }
                },
                err => {
                  this.toastHide();
                }
              );
            }
          });
        } else {
          this.toastHide();
        }
      });
    },
    ...mapActions(['getApprove'])
  },
  components: { vHeader, DatePicker },
  computed: {
    ...mapGetters(['customer'])
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.subbranch {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
}
</style>
