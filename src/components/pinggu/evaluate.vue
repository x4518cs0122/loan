<template>
    <div class="evaluate">
        <evaluate-list title="抵押评估下单列表" :list="list" @select="select"></evaluate-list>
        <router-view></router-view>
    </div>
</template>

<script>
import evaluateList from 'components/evaluate-list/evaluate-list'
import {getEvaluate} from 'api/api'
import { mapMutations } from 'vuex';
 export default {
     data(){
         return{
             list:[],
         }
     },
     created(){
         this._getEvaluate()
     },
     methods:{
         _getEvaluate(){
             getEvaluate().then((res)=>{
                 this.list = res.data
             })
         },
         select(index){
             let customer = this.list[index]
             this.setCustomer(customer)
             if(this.list[index].state === '待评估下单'){
                this.$router.push({path:'/evaluate/placeOrder'})
             }else{
                this.$router.push({path:'/evaluate/reports'})
             }           
         },
         ...mapMutations({
             setCustomer:'SET_CUSTOMER'
         })
     },
     components:{
        evaluateList
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.evaluate
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow auto
    background $color-background
</style>
