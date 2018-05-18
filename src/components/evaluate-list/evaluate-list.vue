<template>
    <div class="evaluate-list">
        <v-header @back="back"></v-header>
        <div class="list-wrapper">
            <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        </div>
    </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import {getEvaluate} from 'api/api'
import vHeader from 'base/header/header'
 export default {
     props:{
         list:{
             type:Array,
             default:()=>{
                 return []
             }
         }
     },
     methods:{
         back(){
             this.$router.back()
         },
         itemHandle(index){
             this.$emit('select',index)
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
.evaluate-list
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
