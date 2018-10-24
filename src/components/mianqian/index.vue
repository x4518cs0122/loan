<template>
  <div class="sign">
      <v-header @goback="goback" title="抵押面签列表" back="主页"></v-header>
      <detail-list :list="list" @itemHandle="itemHandle" :loanType="loanType"></detail-list>
      <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import vHeader from 'components/header/header'
import {getSignList} from 'api/api'
import {mapMutations} from 'vuex'
 export default {
   data(){
     return{
       list:[]
     }
   },
   components: {detailList, vHeader},
   created(){
     this._getSignList()
     this.loanType = ['待填写资料目录表、个人贷款申请表', '待确定签约状态']
   },
   methods:{
     _getSignList(){
       getSignList().then((res)=>{
        //  console.log(res)
         this.list = res.data
       })
     },
     itemHandle(index){  
       let customer = this.list[index]  
       this.setCustomer(customer)
       if(customer.state === "待确定签约状态"){
         this.$router.push({path:`/sign/confirmState`})    
       }else{
         this.$router.push({path:`/sign/${customer.taskId}`})   
       }
           
     },
     goback(){
         this.$router.push({path:'/bussiness'})
     },
     ...mapMutations({
       setCustomer:'SET_CUSTOMER'
     })
   }
 }
</script>

<style lang='stylus' scoped>
</style>
