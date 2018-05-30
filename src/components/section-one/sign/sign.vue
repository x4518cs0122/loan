<template>
  <div class="sign">
    <sign-list :list="list" title="抵押面签列表" @select='selectItem'></sign-list>
    <router-view></router-view>
  </div>
</template>

<script>
import signList from 'components/sign-list/sign-list'
import {getSignList} from 'api/api'
import {mapMutations} from 'vuex'
 export default {
   data(){
     return{
       list:[]
     }
   },
   components: {
     signList
   },
   created(){
     this._getSignList()
   },
   methods:{
     _getSignList(){
       getSignList().then((res)=>{
        //  console.log(res)
         this.list = res.data
       })
     },
     selectItem(index){  
       let customer = this.list[index]  
       this.setCustomer(customer)
       console.log(customer)
       if(customer.state === "待确定签约状态"){
         this.$router.push({path:`/sign/confirmState`})    
       }else{
         this.$router.push({path:`/sign/${customer.taskId}`})   
       }
           
     },
     ...mapMutations({
       setCustomer:'SET_CUSTOMER'
     })
   }
 }
</script>

<style lang='stylus' scoped>
 
</style>
