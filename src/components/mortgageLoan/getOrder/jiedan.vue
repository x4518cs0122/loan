<template>
  <transition name="fade">
    <Page name="order" :loading="loading">
      <v-header title="抵押接单" @goback="goback" next="提交" @submit="submit"></v-header>
      <cube-form :model="model" :immediate-validate="false" ref="form">
        <cube-form-group>
          <cube-form-item :field="fieldsTime" class="self-form-item">
            <cube-button @click="showDatePicker" class="date-picker-btn">{{ model.datetime }}></cube-button>
          </cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item
            :field="item"
            v-for="item in fields"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item class="house-item self-form-item">
            <add-house-info :houses="model.houses"></add-house-info>
          </cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item
            :field="item"
            v-for="item in fields2"
            :key="item.modelKey"
            class="self-form-item"
          ></cube-form-item>
        </cube-form-group>
      </cube-form>
    </Page>
  </transition>
</template>
<script>
import vHeader from 'components/header/header';
import estate from 'base/estate/estate';
import { commonValidations } from '@/utils/Const.js';
import { postOrder, getChecklistID, getOptions } from 'api/api';
import { formatAxiosOptions } from '../utils';
import addHouseInfo from './house';
import { Page } from 'base';

export default {
  data() {
    return {
      options: {
        cardType: [{ id: 1, value: '身份证' }]
      },
      loading: false,
      /** 表单内select option数据 */
      workTypeOptions: [],
      loanTypeOptions: [],
      orderFromOptions: [],

      model: {
        checklistId: null,
        datetime: '',
        clientName: '',
        clientPhone: '',
        clientIdType: '',
        clientIdNumber: '',
        clientWorkType: 0,
        clientWorkUnit: '',
        loanVariety: 0,
        loanAmount: '',
        loanPeriod: '',
        checklistSource: 0,
        agentName: '',
        remark: '',
        houses: [{ area: '', enquiryResult: '' }]
      },
      /** form表单内容 */
      fieldsTime: {
        modelKey: 'datetime',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      fields: [],
      fields2: []
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    submit() {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true;
          getChecklistID().then(res => {
            if (!res.result) {
              this.toast = this.$createToast({
                txt: '请求失败，请重新提交',
                type: 'txt'
              });
              this.toast.show();
              this.loading = false;
              return;
            }
            this.model.checklistId = res.data.id;
            this.model.clientIdType = '身份证';

            postOrder(this.model).then(res => {
              this.loading = false;
              this.$router.push({ name: 'bussiness' });
            });
          });
        }
      });
    },
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
      this.model.datetime = selectedText.join('-');
    },
    showToast(txt) {
      const toast = this.$createToast({
        time: 1000,
        txt: txt
      });
      toast.show();
    },
    /** 获取下拉框内数据后初始化Fields字段，进行表单的渲染 */
    initFields() {
      this.fields = [
        {
          type: 'input',
          modelKey: 'clientName',
          label: '客户姓名',
          props: {
            placeholder: '请输入客户姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'clientPhone',
          label: '联系方式',
          props: {
            placeholder: '请输入联系方式'
          },
          rules: {
            required: true,
            pattern: /^1\d{10}$/
          }
        },
        {
          type: 'select',
          modelKey: 'clientIdType',
          label: '证件类型',
          props: {
            options: [{ value: 1, text: '身份证' }]
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'clientIdNumber',
          label: '证件号码',
          props: {
            placeholder: '请输入证件号码'
          },
          rules: {
            required: true,
            pattern: commonValidations.idCardValidation
          }
        },
        {
          type: 'select',
          modelKey: 'clientWorkType',
          label: '工作类型',
          props: {
            options: this.workTypeOptions
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'clientWorkUnit',
          label: '工作单位',
          props: {
            placeholder: '请输入工作单位'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'select',
          modelKey: 'loanVariety',
          label: '借款品种',
          props: {
            options: this.loanTypeOptions
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
            required: true,
            type: 'number'
          }
        },
        {
          type: 'input',
          modelKey: 'loanPeriod',
          label: '贷款期限(月)',
          props: {
            placeholder: '请输入贷款期限'
          },
          rules: {
            required: true,
            type: 'number'
          }
        }
      ];
      this.fields2 = [
        {
          type: 'select',
          modelKey: 'orderFrom',
          label: '单子来源',
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
          }
        },
        {
          type: 'input',
          modelKey: 'remark',
          label: '备注事项',
          props: {
            placeholder: '请填写额外备注'
          }
        }
      ];
    }
  },
  components: {
    vHeader,
    estate,
    addHouseInfo,
    Page
  },
  created() {
    let orderFromP = getOptions(5);
    let workTypeP = getOptions(6);
    let loanTypeP = getOptions(7);
    Promise.all([orderFromP, workTypeP, loanTypeP]).then(
      res => {
        const [orderFromOptions, workTypeOptions, loanTypeOptions] = res;
        this.orderFromOptions = formatAxiosOptions(orderFromOptions.data);
        this.workTypeOptions = formatAxiosOptions(workTypeOptions.data);
        this.loanTypeOptions = formatAxiosOptions(loanTypeOptions.data);
        this.initFields();
      },
      err => {
        this.showToast('请求迷路啦～');
      }
    );
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.page-order {
  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.3s;
  }

  &.fade-enter, &.fade-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .addHouses {
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  .house-item {
    height: auto;
  }

  .placeholder {
    height: 10px;
    line-height: 10px;
    background: $background-list-header;
  }
}
</style>


