<template>
    <div class="mortgage-status">
        <v-header :title="title" @back="back" :next="next" @submit="submit"></v-header>
        <div class="normal-wrapper">
            <span class="text">抵押日期:</span>
            <span class="val">2017-10-24</span>
        </div>
        <div class="select-wrapper" @click="pop">
            <span class="text">签约状态</span>
            <span class="desc">{{status}}</span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import {mapGetters} from 'vuex'
 export default {
     data(){
         return{
             title:'确定签约状态',
             next:'提交',
             options:['已完成','未完成'],
             status:''
         }
     },
     methods:{
         back(){
             this.$router.back()
         },
         submit(){
             console.log('thank you for your click!now status is '+this.status)
         },
         pop(){
             this.$refs.pop.show()
         },
         choosed(item){
             this.status = item
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components:{
         vHeader,
         pop
     }
 }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.mortgage-status
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .normal-wrapper
        normal-wrapper()
    .select-wrapper
        select-wrapper()
    .title
        title()
</style>
