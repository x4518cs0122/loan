<template>
  <div class="sign">
    <sign-list :list="list" :title="title" @select='selectItem'></sign-list>
    <router-view></router-view>
  </div>
</template>

<script>
import signList from 'components/sign-list/sign-list'
import {getSignList} from 'api/api'
 export default {
   data(){
     return{
       list:[],
       title:'抵押面签列表'
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
       if(this.list[index].state === '待约定签约时间'){
         this.$router.push({path:'/sign/reschedule'})
       }else{
         this.$router.push({path:'/sign/confirmState'})
       }  
     }
   }
 }
</script>

<style lang='stylus' scoped>
 
</style>
