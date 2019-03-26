<template>
  <div class="unreported" v-if="showForm">
    <v-header title="出报告" @goback="hidden"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form" @validate="validateHandler">
      <cube-form-group >
        <cube-form-item :field="time" class="self-form-item" v-show="currentProcess === 'approve' || currentProcess === 'erValuation'">
          <Date-picker :model="obj" modelKey="time" :initTxt="obj.timeInitTxt"></Date-picker>
        </cube-form-item>
        <cube-form-item :field="type" class="self-form-item" v-if="currentProcess === 'erValuation'" />
      </cube-form-group>
      <cube-form-group legend="房屋报告内容">
        <cube-form-item
          :field="item"
          v-for="item in fields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
        <cube-form-item class="self-form-item">
          <cube-button class="self-submit-btn" @click="submit">提交</cube-button>
        </cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import vHeader from 'components/header/header';
import rsSelect from 'base/rsselect/rsselect';
import { mapGetters } from 'vuex';
import {DatePicker} from 'base'
import * as _ from 'lodash'
export default {
  props: {
    obj: {
      type: Object,
      default: () => {
        return {};
      }
    },
    currentProcess: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showForm: false,
      time: {
        modelKey: 'time',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      type:{
        type: 'select',
        modelKey: 'reportType',
        label: '报告类型',
        props: {
          options: [{ value: 1, text: '预评' }, { value: 2, text: '正评' }],
        },
        rules: {
          required: true
        }
      },
      fields: [
        {
          type: 'input',
          modelKey: 'reportObligee',
          label: '权利人',
          props: {
            placeholder: '请输入权利人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'reportBorrower',
          label: '借款人',
          props: {
            placeholder: '请输入借款人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'reportRepose',
          label: '坐落',
          props: {
            placeholder: '请输入房屋坐落'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'reportHouseAge',
          label: '房龄(年)',
          props: {
            placeholder: '请输入房龄'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'reportHouseArea',
          label: '面积(平米)',
          props: {
            placeholder: '请输入房产面积'
          },
          rules: {
            required: true,
            type:'number'
          }
        },
        {
          type: 'input',
          modelKey: 'reportHouseSingle',
          label: '单价(元/平米)',
          props: {
            placeholder: '请输入平方米单价'
          },
          rules: {
            required: true,
            type:'number'
          }
        },
        {
          type: 'input',
          modelKey: 'reportHouseTotal',
          label: '总价(元)',
          props: {
            placeholder: '请输入总价'
          },
          rules: {
            required: true,
            type:'number'
          }
        },
        {
          type: 'input',
          modelKey: 'reportLoanAmount',
          label: '贷款金额(元)',
          props: {
            placeholder: '请输入贷款金额'
          },
          rules: {
            required: true,
            type:'number'
          }
        },
        // {
        //   type: 'input',
        //   modelKey: 'reportLoanYear',
        //   label: '年限(年)',
        //   props: {
        //     placeholder: '请输入房屋年限'
        //   },
        //   rules: {
        //     required: true,
        //     type:'number'
        //   }
        // },
        {
          type: 'select',
          modelKey: 'reportFirst',
          label: '首套/两套',
          props: {
            options: [{ value: '1', text: '首套' }, { value: '2', text: '两套' }]
          },
          rules: {
            required: true
          }
        }
      ]
    };
  },
  methods: {
    show() {
      this.showForm = true;
    },
    hidden() {
      this.showForm = false;
    },
    /** 在每次输入时判断是否改变单价和平米，计算总价 */
    validateHandler() {
      const price = this.obj.reportHouseSingle
      const area = this.obj.reportHouseArea
      this.obj.reportHouseTotal = price && area? _.round(_.multiply(price, area),1):''
      
    },
    submit() {
      if (this.currentProcess === 'approve' || this.currentProcess === 'erValuation') {
        this.$emit('submit', this.customer.id);
        return;
      }
      this.hidden();
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

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.unreported {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;

  .botton {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;

    .submit {
      width: 100%;
      margin: 20px 0;
    }
  }
}
</style>
