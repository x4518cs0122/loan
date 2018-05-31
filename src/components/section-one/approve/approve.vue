<template>
    <div class="approve">
        <approve-list title="抵押审批列表" :list="list" @select="select"></approve-list>
        <router-view></router-view>
    </div>
</template>

<script>
import approveList from 'components/approve-list/approve-list'
import {getApprove} from 'api/api'
import {mapMutations} from 'vuex'
 export default {
     data(){
         return{
             list:[],        
         }
     },
     created(){
         this._getApprove()
     },
     methods:{
         _getApprove(){
             getApprove().then((res)=>{
                 console.log(res.data)
                 this.list = res.data
             })
         },
         back(){
             this.$router.back()
         },
         select(index){
             let customer = this.list[index]
             this.setCustomer(customer)
             this.$router.push({path:`/approve/${customer.id}`}) 
         },
         ...mapMutations({
             setCustomer:'SET_CUSTOMER'
         })
     },
     components: {
        approveList
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
