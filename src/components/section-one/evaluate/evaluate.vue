<template>
    <div class="evaluate">
        <v-header @back="back" :title="title"></v-header>
        <div class="list-wrapper">
            <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import {getEvaluate} from 'api/api'
import vHeader from 'base/header/header'
 export default {
     data(){
         return{
             list:[],
             title:'抵押评估下单列表'
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
         back(){
             this.$router.back()
         },
         itemHandle(index){
             if(this.list[index].state === '待下单'){
                this.$router.push({path:'/evaluate/placeOrder'})
             }else{
                this.$router.push({path:'/evaluate/unreported'})
             }
             
         }
     },
     components:{
         detailList,
         vHeader
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.evaluate
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
