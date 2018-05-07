<template>
    <div class="approve">
        <v-header title="二手房过户列表" @back="back"></v-header>
        <div class="scroll">
            <detail-list :list='list' @itemHandle='select'></detail-list>
        </div> 
        <router-view></router-view>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import detailList from 'base/detail-list/detail-list'
import {getGuohu} from 'api/api'
import {mapMutations} from 'vuex'
 export default {
     data(){
         return{
             list:[] 
         }
     },
     created(){
         this._getGuohu()
     },
     methods:{
         _getGuohu(){
             getGuohu().then((res)=>{
                 this.list = res.data
             })
         },
         back(){
             this.$router.back()
         },
         select(index){
             let customer = this.list[index]
             this.setCustomer(customer)
             this.$router.push({path:`/guohu/${customer.id}`}) 
         },
         ...mapMutations({
             setCustomer:'SET_CUSTOMER'
         })
     },
     components: {
         detailList,
         vHeader
     },
 }
</script>

<style lang='stylus' scoped>
.approve
    position fixed 
    top 0
    bottom 0
    right 0
    left 0
    .scroll
        position fixed 
        top 52px
        bottom 0
        right 0
        left 0
        overflow hidden
</style>
