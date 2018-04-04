<template>
  <div class="sign">
    <app-title :title="title" @back="back"></app-title>
    <Scroll class="scroll" :data="list">
      <div>
        <detail-list :list='list' @itemHandle='selectItem'></detail-list>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import {getSignList} from 'api/api'
import Scroll from 'base/scroll/scroll'
import appTitle from 'base/header/header'
 export default {
   data(){
     return{
       list:[],
       title:'抵押面签列表'
     }
   },
   components: {
     detailList,
     Scroll,
     appTitle
   },
   mounted(){
     this._getSignList()
   },
   methods:{
     _getSignList(){
       getSignList().then((res)=>{
         this.list = res.data
       })
     },
     back(){
       this.$router.back()
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
.scroll
  position absolute 
  top 54px
  bottom 0
  left 0
  right 0
  overflow hidden
 
</style>
