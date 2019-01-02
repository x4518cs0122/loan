<template>
  <div class="sign-detail">
    <v-header @goback="goback" title="贷款查询" :hideback="true"></v-header>
    <rs-list >
      <ul slot="body">
        <li class="list-header">
          <p>限定筛选条件</p> 
        </li>
        <li><rs-select selectText="贷款类型" :options="options.loanType" model="loanType" @selected="selected" initSelection="1"></rs-select></li>  
        <li><number-input @input="rsinput" inputText="贷款编号" model="loanNumber" required ></number-input></li>
        <li><rs-input @input="rsinput" inputText="客户姓名" model="clientName" required ></rs-input>
        </li>
        <li><rs-input @input="rsinput" inputText="经办人员" model="employeeName" required ></rs-input>
        </li>
        <li><rs-select selectText="经办银行" :options="options.bank" model="bank" @selected="selected"></rs-select></li> 
        <li class="list-header">
          <p>筛选接单时间</p> 
        </li>
        <li><rs-select selectText="起始日期" model="startDate" @selected="selected" :isDate="true"></rs-select></li>  
        <li><rs-select selectText="结束日期" model="endDate" @selected="selected" :isDate="true"></rs-select></li>  
      </ul>
      <div class="botton" slot="footer">
          <el-button type="danger" class="submit" @click="_query">查询</el-button>
          <tab></tab>
      </div>
    </rs-list>
    <rs-transition name="slide-left">
      <router-view></router-view>  
    </rs-transition>   
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import numberInput from 'base/rsinput/rsNumberInput';
import rsSelect from 'base/rsselect/rsselect';
import rsTransition from 'base/transition/transition'
import {commonValidations, messageTip} from '@/utils/Const.js';
import {queryState} from '@/api/api';
import tab from 'components/tab/tab';

export default {
  data() {
    return {
      commonValidations: commonValidations,
      messageTip: messageTip,
      obj: {
        loanType: 1,
        // loanNumber: null,
        // clientName: null,
        // employeeName: null,
        // bank: null,
        // startDate: null,
        // endDate: null,
        page:0,
        // rows:null
      },
      options: {
        loanType: [{id: 1, value: '抵押贷款'},{id:2, value: '二手房贷款'}],
        bank: [{id: 0, value: '哈哈哈银行'}],
      },
    };
  },
  methods: {
    _query() {
      let _this = this
      this.$store.dispatch('_queryState', this.obj).then(() =>{
        this.$router.push({path: '/query/result'});
      })
    },
    rsinput(value, model) {
      this.obj[model] = value;
    },
    selected(id, model) {
      if (/^(start|end)Date$/.test(model)) {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    goback() {
      this.$router.push({path: '/bussiness'});
    },
  },
  components: {
    vHeader,
    rsSelect,
    rsList,
    rsInput,
    numberInput,
    tab,
    rsTransition
  },
};
</script>
<style lang="stylus" scoped>
.botton {
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  .submit {
    width: 100%;
    margin: 20px 0;
  }
}
</style>


