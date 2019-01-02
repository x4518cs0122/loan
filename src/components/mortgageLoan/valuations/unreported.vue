<template>
    <div class="unreported" v-if="showForm">
        <v-header title="出报告" @goback="hidden"></v-header>
        <rs-list>
            <ul slot="body">
              <li v-show="currentProcess === 'approve' || currentProcess === 'erValuation'"><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
              <li v-show="currentProcess === 'approve' || currentProcess === 'erValuation'"><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true" :initSelection="obj.time"></rs-select></li>
              <li v-if="currentProcess === 'erValuation'"><rs-select selectText="报告类型" model="reportType" @selected="selected" :options="options.type" :initSelection="obj.type"></rs-select></li>
              <li class="list-header">房屋报告内容</li>
              <li><rs-input @input="rsinput" inputText="权利人" model="reportObligee" :value="obj.reportObligee" required></rs-input></li>
              <li><rs-input @input="rsinput" inputText="借款人" model="reportBorrower" :value="obj.reportBorrower" required></rs-input></li>
              <li><rs-input @input="rsinput" inputText="座落" model="reportRepose" :value="obj.reportRepose" required></rs-input></li>
              <li><rs-input @input="rsinput" inputText="房龄" model="reportHouseAge" :value="obj.reportHouseAge" required></rs-input></li>
              <li><number-input @input="rsinput" inputText="面积" model="reportHouseArea" :value="obj.reportHouseArea" ></number-input></li>
              <li><number-input @input="rsinput" inputText="单价" model="reportHouseSingle" :value="obj.reportHouseSingle"></number-input></li>
              <li><number-input @input="rsinput" inputText="总价" model="reportHouseTotal" :value="obj.reportHouseTotal" ></number-input></li>
              <li><number-input @input="rsinput" inputText="贷款金额" model="reportLoanAmount" :value="obj.reportLoanAmount" ></number-input></li>
              <li><rs-input @input="rsinput" inputText="年限" model="reportLoanYear" :value="obj.reportLoanYear" tips="年" required></rs-input></li>
              <li><rs-select selectText="首套/两套" :options="options.onetwo" model="reportFirst" @selected="selected" :initSelection="obj.reportFirst"></rs-select></li>
            </ul>
            <div class="botton" slot="footer">
                <el-button type="danger" class="submit" @click="submit">提交</el-button>
            </div>
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
import {mapGetters} from 'vuex';
export default {
  props: {
    obj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentProcess: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      options: {
        onetwo: [{id: '1', value: '首套'}, {id: '2', value: '两套'}],
        type: [{id: 1, value: '预评'}, {id: 2, value: '正评'}],
      },
      showForm: false,
    };
  },
  methods: {
    show() {
      this.showForm = true;
    },
    hidden() {
      this.showForm = false;
    },
    selected(key, model) {
      if(model === 'time'){
        this.obj[model] = key
        return
      }
      this.obj[model] = parseInt(key);
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    submit() {
      if(this.currentProcess === 'approve' || this.currentProcess === 'erValuation'){
        this.$emit('submit', this.customer.id)
        return
      }
      this.hidden()
    }
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: {
    vHeader,
    rsList,
    rsText,
    rsSelect,
    rsInput,
    numberInput,
  },
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
