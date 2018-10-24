<template>
    <div class="subbranch">
      <v-header title="确定审批状态" next="提交" @goback="goback" @submit="submit"></v-header>
      <rs-list>
        <ul slot="body">
          <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
          <li><rs-select selectText="环节状态" model="approve_state" @selected="selected" :options="options.state"></rs-select></li>
          <div v-show="obj.approve_state === 0">
            <li><rs-select selectText="审批通过日期" model="approve_time" @selected="selected" :isDate="true"></rs-select></li>
            <li class="list-header">报告内容</li>
            <li><rs-input @input="rsinput" inputText="金额" model="amount"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="年限" model="period"></rs-input></li>
            <li><rs-input @input="rsinput" inputText="利率" model="rate"></rs-input></li>
            <li><rs-select selectText="放款条件" :options="options.loan_condition" @selected="getCondition"></rs-select></li>
            <li><rs-input @input="rsinput" inputText="备注" model="remark"></rs-input></li>
          </div>
          <div v-show="obj.approve_state === 1">
            <li><rs-select selectText="未通过时间" model="approve_time" @selected="selected" :isDate="true"></rs-select></li>
            <li><rs-select selectText="未通过原因" :options="options.fail_reason" model="fail_reason" @selected="selected"></rs-select></li>
            <li><rs-select selectText="后续操作" :options="options.later_action" model="later_action" @selected="selected"></rs-select></li>
          </div>
        </ul>
      </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsInput from 'base/rsinput/rsinput'
import rsSelect from 'base/rsselect/rsselect'
import {changeState} from 'api/api'
import { mapGetters } from 'vuex';
export default {
  data(){
    return{
      obj:{
        amount: '',
        approve_state: null,
        approve_time: '',
        fail_reason: 0,
        fail_reason_other: '',
        id: '',
        later_action: null,
        loan_condition: {
          content: '',
          id: '',
          need_guarantee: true
        },
        loan_id: '',
        period: '',
        rate: '',
        remark: ''
      },
      options:{
        state:[{key:0, value:'未通过'}, {key:1, value:'已通过'}],
        loan_condition:[{key:0, value:'见抵押收件单放款'}, {key:1, value:'见他项权证放款'}, {key:2, value:'见担保函放款'}],
        fail_reason:[{key:0, value:'银行拒贷'}, {key:1, value:'补充资料'}, {key:2, value:'其他'}],
        later_action:[{key:0, value:'继续上报'}, {key:1, value:'换行'}, {key:2, value:'废单'}]
      }
    }
  },
  methods:{
    goback(){
      this.$router.push({path:`/approve/${this.customer.taskId}`})
    },
    selected(key, model){
      this.obj[model] = key
    },
    rsinput(value, model) {
      this.obj[model] = value
    },
    getCondition(key) {
      this.obj.loan_condition.content = this.options.loan_condition[key].value
    },
    submit(){
      console.log(this.obj)
      changeState(this.obj, this.customer.taskId).then((res) =>{
        console.log(res)
      })
      // this.goback()
    }
  },
  components:{vHeader, rsList, rsText, rsSelect, rsInput},
  computed:{
    ...mapGetters([
      'customer'
    ])
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.subbranch
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background $color-background
</style>
