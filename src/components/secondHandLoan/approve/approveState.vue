<template>
    <div class="confirm-state">
        <v-header next="提交" title="确定审批状态" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-select selectText="审批状态" :options="options.state" model="approveState" @selected="selected"></rs-select></li>
                <li><rs-select selectText="上报审批时间" model="approveTime" @selected="selected" :isDate="true"></rs-select></li>
                <div v-show="obj.approveState === 1">
                    <li class="placeholder"> </li>
                    <li><number-input @input="rsinput" inputText="金额" model="amount"
                      required></number-input></li>
                    <li><rs-input @input="rsinput" inputText="年限" model="period"
                      required 
                      :validation="commonValidations.numberValidation"
                      :message="messageTip.numberMessage"></rs-input>
                    </li>
                    <li><rs-input @input="rsinput" inputText="利率" model="rate"
                      required 
                      :validation="commonValidations.numberValidation"
                      :message="messageTip.numberMessage"></rs-input>
                    </li>
                    <li><rs-input @input="rsinput" inputText="放款条件" model="loanCondition" required></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="备注" model="remark"></rs-input></li>
                </div>
                <div v-show="obj.approveState === 0">
                    <li class="placeholder"> </li>
                    <li><rs-select selectText="审批状态" valueType="19" model="failReason" @selected="selected"></rs-select></li>
                    <li><rs-input @input="rsinput" inputText="未通过原因" model="failReasonOther" v-show="obj.failReason === 63"></rs-input></li>
                    <li><rs-select selectText="后续操作" valueType="20" model="laterAction" @selected="selected"></rs-select></li>
                </div>
               
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import numberInput from 'base/rsinput/rsNumberInput';
import rsSelect from 'base/rsselect/rsselect';
import {commonValidations, messageTip} from '@/utils/Const.js'
import {mapGetters} from 'vuex';
import {postApproveState} from 'api/api';
export default {
  data() {
    return {
      commonValidations:commonValidations,
      messageTip:messageTip,
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
        loanId: null,
      },
      options: {
        state: [{id: 0, value: '未通过'}, {id: 1, value: '已通过'}],
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({path: '/erApprove'});
    },
    selected(id, model) {
      if (model === 'approveTime') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    submit() {
      this.obj.loanId = this.customer.id;
      postApproveState(this.customer.id, this.obj).then(res => {
        if (res.result) {
          this.goback();
        }
      });
    },
  },
  computed: {
    ...mapGetters(['customer']),
  },
  components: {
    vHeader,
    rsSelect,
    rsList,
    rsInput,
    numberInput,
  },
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
