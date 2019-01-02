<template>
    <div class="subbranch">
      <v-header title="确定审批状态" next="提交" @goback="goback" @submit="submit"></v-header>
      <rs-list>
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
      </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import rsInput from 'base/rsinput/rsinput';
import numberInput from 'base/rsinput/rsNumberInput';
import rsSelect from 'base/rsselect/rsselect';
import {commonValidations, messageTip} from '@/utils/Const.js';
import {changeState, skipZhengping} from 'api/api';
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      commonValidations: commonValidations,
      messageTip: messageTip,
      obj: {
        id: null,
        approveState: 2,
        approveTime: null,
        amount: null,
        period: '',
        rate: '',
        loanCondition: '',
        remark: '',
        failReason: null,
        failReasonOther: '',
        laterAction: null,
        loanId: null,
      },
      options: {
        state: [{id: 0, value: '未通过'}, {id: 1, value: '已通过'}],
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({path: `/approve/${this.customer.id}`});
    },
    selected(key, model) {
      if (model === 'approveTime') {
        this.obj[model] = new Date(key).getTime();
        return;
      }
      this.obj[model] = parseInt(key);
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    submit() {
      this.obj.amount = parseFloat(this.obj.amount);
      this.obj.loanId = this.customer.id;
      changeState(this.customer.id, this.obj).then(res => {
        if (res.result) {
          if (this.customer.extra.commentType === '正评') {
            skipZhengping(this.customer.id).then(
              this.$router.push({path: '/approve'})
            );
            return;
          }
          this.goback();
        }
      });
    },
  },
  components: {vHeader, rsList, rsText, rsSelect, rsInput, numberInput},
  computed: {
    ...mapGetters(['customer']),
  },
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
