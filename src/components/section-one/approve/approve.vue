<template>
    <div class="approve">
        <v-header :title="title" @back="back"></v-header>
        <div class="list-wrapper">
            <detail-list :list="list" @itemHandle="itemHandle"></detail-list> 
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import detailList from 'base/detail-list/detail-list'
import Scroll from 'base/scroll/scroll'
import {getApprove} from 'api/api'
import {mapMutations} from 'vuex'
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
         },
         back(){
             this.$router.back()
         },
         itemHandle(index){
             let customer = this.list[index]
             this.setCustomer(customer)
             this.$router.push({path:`/approve/${customer.id}`})
             
         },
         ...mapMutations({
             setCustomer:'SET_CUSTOMER'
         })
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
    .list-wrapper
        position fixed 
        top 52px
        bottom 0
        right 0
        left 0
        overflow hidden
</style>
