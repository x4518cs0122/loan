<template>
    <div class="er-evaluate">
        <evaluate-list title="抵押评估下单列表" :list="list" @select="select"></evaluate-list>
        <router-view></router-view>
    </div>
</template>

<script>
import evaluateList from 'components/evaluate-list/evaluate-list'
import {getEvaluate} from 'api/api'
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
             if(this.list[index].state === '待下单'){
                this.$router.push({path:'/evaluate/placeOrder'})
             }else{
                this.$router.push({path:'/evaluate/unreported'})
             }           
         }
     },
     components:{
        evaluateList
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.er-evaluate
    position absolute 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .list-wrapper
        position fixed 
        top 52px
        bottom 0
        right 0
        left 0
        overflow hidden
 
</style>
