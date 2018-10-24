<template>
  <div class="interview-detail">
      <v-header title="抵押审批" @goback="goback"></v-header>
      <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
                <li><rs-text label="客户姓名" :value="customer.name"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.phone"></rs-text></li>
                <li><rs-text label="借款品种" :value="loanType[customer.loanType]"></rs-text></li>
                <li class="placeholder"></li>
                <li><rs-select selectText="资料目录表" @clicked="mulushow"></rs-select></li>
                <li><rs-select selectText="报审" @clicked="baoshen"></rs-select></li>
                <li><rs-select selectText="确定审批状态" @clicked="state"></rs-select></li>
                <li><rs-select selectText="出正评" @clicked="zhengping"></rs-select></li>
            </ul>
      </rs-list>
      <router-view></router-view>
  </div>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsSelect from 'base/rsselect/rsselect'
import {mapGetters} from 'vuex'
import {isDataPerfect} from 'api/api'
export default {
  data(){
      return{
          
      }
  },
  components: {vHeader, rsList, rsText, rsSelect},
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  created(){
    //   this.getInfo()
    this.loanType = ['抵押消费','抵押经营']
  },
  methods:{
      goback(){
          this.$router.push({path:'/approve'})
      },
      getInfo(){
          isDataPerfect(this.customer.taskId).then((res)=>{
              console.log(res)
          })
      },
      mulushow() {
          this.$router.push({path:`/approve/${this.customer.taskId}/mulu`})
      },
      baoshen(){
        this.$router.push({path:`/approve/${this.customer.taskId}/baoshen`})
      },
      state(){
        this.$router.push({path:`/approve/${this.customer.taskId}/state`})
      },
      zhengping(){
        this.$router.push({path:`/approve/${this.customer.taskId}/zhengping`})
      }

  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .interview-detail
        position fixed
        top 0
        bottom 0
        left 0
        right 0

</style>


