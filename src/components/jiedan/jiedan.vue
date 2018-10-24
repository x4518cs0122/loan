<template>
    <transition name="fade">
        <div class="order">
            <v-header title="抵押接单" @goback="goback" next="提交" @submit="submit"></v-header>
            <rs-list>
                <ul slot="body">
                    <li class="placeholder"> </li>
                    <li><rs-select selectText="完成时间" model="finish_time" @selected="selected" :isDate="true"></rs-select></li>
                    <li class="placeholder"></li>
                    <li><rs-input @input="rsinput" inputText="客户姓名" model="client_name"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="联系方式" model="client_phone"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="证件类型" model="client_id_type"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="证件号码" model="client_id_number"></rs-input></li>
                    <li><rs-select selectText="工作类型" :options="options.jobtype" model="client_work_type" @selected="selected"></rs-select></li>                
                    <li><rs-input @input="rsinput" inputText="工作单位" model="client_work_unit"></rs-input></li>
                    <li><rs-select selectText="借款品种" :options="options.loantype" model="loan_type" @selected="selected"></rs-select></li>                  
                    <li class="no-border"><rs-input @input="rsinput" inputText="贷款金额" model="loan_amount"></rs-input></li>
                    <li class="no-border"><rs-input @input="rsinput" inputText="贷款期限" model="loan_period"></rs-input></li>
                    <li class="placeholder"></li>
                    <li v-for="house in obj.mortgageHouses" :key="house.id">
                        <rs-select selectText="房产信息"  @clicked="houseClick(house)" ></rs-select>
                    </li>
                    <li style="text-align: center" @click="showEstate">
                        <p><i class="fa fa-plus-square-o" aria-hidden="true"></i>添加房产信息</p>
                    </li>
                    <rs-select selectText="单子来源" :options="options.orderFrom" @selected="selected" model="checklist_source"></rs-select>
                    <li><rs-input @input="rsinput" inputText="中介名称" model="agent_name"></rs-input></li>
                    <li><rs-input @input="rsinput" inputText="备注事项" model="remark"></rs-input></li>
                </ul>
            </rs-list>
            <estate ref="estate" @submit="addEstate" :house="house" ></estate>
        </div>
    </transition>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsInput from 'base/rsinput/rsinput'
import rsSelect from 'base/rsselect/rsselect'
import estate from 'base/estate/estate'
import {postOrder} from 'api/api'
export default {
  data(){
      return{
          options:{
              jobtype:[{key:0,value:'授薪'},{key:1,value:'自雇'}],
              loantype:[{key:0,value:'抵押消费'},{key:1,value:'抵押经营'},{key:3,value:'信用'}],
              orderFrom:[{key:0,value:'存量转货'},{key:1,value:'中介介绍'},{key:2,value:'老客户介绍'},{key:3,value:'银行介绍'},
                        {key:4,value:'同行介绍'},{key:5,value:'熟人介绍'},{key:6,value:'广告'},{key:7,value:'微信'}]
          },
          house:{},
          obj:{
                id: null,
                finish_time: '',
                client_name: '',
                client_phone: '',
                client_id_type: '',
                client_id_number: '',
                client_work_type: 0,
                client_work_unit: '',
                loan_type: 0,
                loan_amount: '',
                loan_period: '',
                checklist_source: 0,
                agent_name: '',
                remark: '',
                mortgageHouses: [
                    // {
                    //     id: null,
                    //     area: '',
                    //     enquiry_result: '',
                    //     total_price: '',
                    //     checklist_id: ''
                    // }
                ]
          }
      }
  },
  methods:{
    selected(key, model) {
        this.obj[model] = key
    },
    goback() {      
        this.$router.back()
    },
    rsinput(value, model) {
        this.obj[model] = value
    },
    houseClick(house) {
        this.house = house
        this.$refs.estate.show()
    },
    showEstate(){
        this.house = {}
        this.$refs.estate.show()
    },
    addEstate(estateInfo){
        this.obj.mortgageHouses.push(estateInfo)
    },
    submit(){
        postOrder(this.obj).then((res)=>{
            if(res.status === 1){
                this.$router.back()
            }
            
        })
    }
  },
  components: {
      vHeader,
      rsList,
      rsInput,
      rsSelect,
      estate
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .order
        &.fade-enter-active, &.fade-leave-active 
            transition: all .3s
        &.fade-enter, &.fade-leave-to 
            transform translate3d(100%,0,0)
        
</style>


