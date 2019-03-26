<template>
  <div class="page-query">
    <v-header @goback="goback" title="贷款查询" :hideback="true"></v-header>
    <cube-form :model="model" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item
          :field="item"
          v-for="item in fields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-form-item :field="startTime" class="self-form-item">
          <Date-picker :model="model" modelKey="startDate"></Date-picker>
        </cube-form-item>
        <cube-form-item :field="endTime" class="self-form-item">
          <Date-picker :model="model" modelKey="endDate"></Date-picker>
        </cube-form-item>
      </cube-form-group>
    </cube-form>
    <div class="query-btn">
      <cube-button @click="_query">查询</cube-button>
    </div>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import { commonValidations, messageTip } from '@/utils/Const.js';
import { queryState } from '@/api/api';
import {DatePicker} from 'base'

export default {
  data() {
    return {
      commonValidations: commonValidations,
      messageTip: messageTip,
      model: {
        loanType: 1,
        loanNumber: '',
        clientName: '',
        employeeName: '',
        bank: '',
        startDate: '',
        endDate: '',
        page: 0
        // rows:null
      },
      fields: [
        {
          type: 'select',
          modelKey: 'loanType',
          label: '贷款类型',
          props: {
            options: [{ value: 1, text: '抵押贷款' }, { value: 2, text: '二手房贷款' }]
          }
        },
        {
          type: 'input',
          modelKey: 'loanNumber',
          label: '贷款编号',
          props: {
            placeholder: '请输入贷款编号'
          }
        },
        {
          type: 'input',
          modelKey: 'clientName',
          label: '客户姓名',
          props: {
            placeholder: '请输入客户姓名'
          }
        },
        {
          type: 'input',
          modelKey: 'employeeName',
          label: '经办人员',
          props: {
            placeholder: '请输入经办人员'
          }
        },
        {
          type: 'select',
          modelKey: 'bank',
          label: '经办银行',
          props: {
            options: [{ value: 0, text: '哈哈哈银行' }]
          }
        }
      ],
      startTime: {
        modelKey: 'startDate',
        label: '开始时间'
      },
      endTime: {
        modelKey: 'endDate',
        label: '结束时间'
      }
    };
  },
  methods: {
    _query() {
      let _this = this;
      _this.showToastMask();
      this.$store.dispatch('_queryState', this.model).then(() => {
        _this.hideToastMask();
        this.$router.push({ path: '/queryResult' });
      });
    },
    goback() {
      this.$router.push({ path: '/bussiness' });
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
    dateSelectHandler(date, selectedVal, selectedText) {
      const type = `${this.currentType}Txt`;
      this.model[type] = selectedText.join('-');

      this.model[this.currentType] = new Date(date).getTime();
    }
  },
  components: {
    vHeader,
    DatePicker
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.page-query {
  .query-btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .cube-btn {
      background: #F56C6C;
      color: #fff;
      width: 80%;
      height: 40px;
      line-height: 40px;
      padding: 0;
    }
  }
}
</style>


