<template>
  <div class="sign">
    <app-title :title="title" @back="back"></app-title>
    <Scroll class="scroll" :data="list">
      <detail-list :list='list' @itemHandle='selectItem'></detail-list>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import {getSignContent} from 'api/sign'
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
     this.get()
   },
   methods:{
     get(){
       getSignContent().then((res)=>{
         this.list = res.data
       })
     },
     back(){
       this.$router.back()
     },
     selectItem(){
       this.$router.push({path:'/sign/signDetail'})
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
