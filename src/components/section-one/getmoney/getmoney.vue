<template>
    <div class="getmoney">
        <v-header :title="title" @back="back"></v-header>
        <div class="list-wrapper">
            <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {getMoney} from 'api/api'
import detailList from 'base/detail-list/detail-list'
import vHeader from 'base/header/header'
import {mapMutations} from 'vuex'
 export default {
     data(){
         return{
             title:"抵押放款列表",
             list:[]
         }
     },
     created(){
         this._getMoney()
     },
     methods:{
         _getMoney(){
             getMoney().then((res)=>{
                 this.list = res.data
             })
         },
         back(){
             this.$router.back()
         },
         itemHandle(index){
             console.log('11')
             let customer = this.list[index]
             this.setCustomer(customer)
             if(customer.state === '待确定放款状态'){
                 this.$router.push({path:'/getmoney/fangkuan'})
             }else{
                 this.$router.push({path:'/getmoney/danbao'})
             }
             
         },
         ...mapMutations({
            setCustomer:'SET_CUSTOMER'
        })
     },
     components:{
         detailList,
         vHeader
     }
 }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
.getmoney
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    .list-wrapper
        position fixed 
        top 52px
        bottom 0
        right 0
        left 0
        overflow hidden
 
</style>
