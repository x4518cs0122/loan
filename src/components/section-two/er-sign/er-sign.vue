<template>
  <div class="sign">
    <sign-list :list="list" :title="title" @select="selectItem"></sign-list>
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
       list:[],
       title:'二手房面签列表'
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
         this.list = res.data
       })
     },
     selectItem(index){
       let customer = this.list[index]
       this.setCustomer(customer)
       //接口完善后需要修改判断条件 跳转子路由
       this.$router.push({path:'/erSign/dataGather'})
    //    if(this.list[index].state === '待约定签约时间'){
    //      this.$router.push({path:'/sign/reschedule'})
    //    }else{
    //      this.$router.push({path:'/sign/confirmState'})
    //    }  
     },
     ...mapMutations({
        setCustomer:'SET_CUSTOMER'
     })
   }
 }
</script>

<style lang='stylus' scoped>
 
</style>
