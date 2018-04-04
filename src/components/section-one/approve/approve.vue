<template>
    <div class="approve">
        <v-header :title="title"></v-header>
        <detail-list :list="list"></detail-list> 
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import detailList from 'base/detail-list/detail-list'
import Scroll from 'base/scroll/scroll'
import {getApprove} from 'api/api'
 export default {
     data(){
         return{
             title:'抵押审批列表',
             list:[],
             
         }
     },
     created(){
         this._getApprove()
     },
     methods:{
         _getApprove(){
             getApprove().then((res)=>{
                 this.list = res.data
             })
         }
     },
     components: {
         vHeader,
         detailList,
         Scroll
     }
 }
</script>

<style lang='stylus' scoped>
.approve
    position fixed 
    top 0
    bottom 0
    right 0
    left 0
    overflow hidden
 
</style>
