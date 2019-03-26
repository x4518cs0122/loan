<template>
  <div class="confirm-state">
    <v-header next="提交" title="确定审批状态" @submit="submit" @goback="goback"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item :field="pass" class="self-form-item"></cube-form-item>
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="obj" modelKey="approveTime"></Date-picker>
        </cube-form-item>
      </cube-form-group>
      <cube-form-group legend="审批通过基础信息" v-if="obj.approveState === 1">
        <cube-form-item
          :field="item"
          v-for="item in passFields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
      <cube-form-group legend="不通过原因" v-if="obj.approveState === 0">
        <cube-form-item
          :field="item"
          v-for="item in notPassFields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import { commonValidations, messageTip } from '@/utils/Const.js';
import { mapGetters } from 'vuex';
import { postApproveState, getOptions } from 'api/api';
import { DatePicker } from 'base';
import { formatAxiosOptions } from '@/components/mortgageLoan/utils';
export default {
  data() {
    return {
      obj: {
        id: null,
        approveState: '',
        approveTime: '',
        amount: null,
        period: '',
        rate: '',
        loanCondition: '',
        remark: '',
        failReason: '',
        failReasonOther: '',
        laterAction: '',
        loanId: null
      },
      time: {
        label: '上报审批时间',
        modelKey: 'approveTime',
        rules: {
          required: true
        }
      },
      pass: {
        type: 'select',
        modelKey: 'approveState',
        label: '审批状态',
        props: {
          options: [{ value: 0, text: '未通过' }, { value: 1, text: '通过' }]
        },
        rules: {
          required: false
        }
      },
      passFields: [],
      notPassFields: [],

      /** options */
      loanConditionOptions: [],
      failReasonOptions: [],
      laterActionOptions: []
    };
  },
  created() {
    this.getOption();
  },
  methods: {
    goback() {
      this.$router.push({ path: '/erApprove' });
    },
    getOption() {
      Promise.all([getOptions(2), getOptions(19), getOptions(20)]).then(res => {
        this.loanConditionOptions = formatAxiosOptions(res[0].data);
        this.failReasonOptions = formatAxiosOptions(res[1].data);
        this.laterActionOptions = formatAxiosOptions(res[2].data);
        this.initFields();
      });
    },
    initFields() {
      this.passFields = [
        {
          type: 'input',
          modelKey: 'amount',
          label: '金额(元)',
          props: {
            placeholder: '请输入金额'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'period',
          label: '年限(年)',
          props: {
            placeholder: '请输入年限'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'rate',
          label: '基准利率(%)',
          props: {
            placeholder: '请输入利率'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'floatPercent',
          label: '利率浮动(%)',
          props: {
            placeholder: '请填写利率浮动范围'
          },
          rules: {
            required: true
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
      this.notPassFields = [
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
          label: '未通过原因备注',
          props: {
            placeholder: '备注未通过原因'
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
    submit() {
      this.obj.loanId = this.customer.id;
      this.$refs.form.validate(success => {
        if (success) {
          let toast = this.$createToast({
            mask: true,
            time: 0
          });
          toast.show();
          postApproveState(this.customer.id, this.obj).then(
            res => {
              if (res.result) {
                this.goback();
              }
              toast.hide();
            },
            err => {
              toast.hide();
              this.$createToast({
                mask: true,
                txt: err,
                type: 'txt'
              }).show();
            }
          );
        }
      });
    }
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: {
    vHeader,
    DatePicker
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.confirm-state {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
