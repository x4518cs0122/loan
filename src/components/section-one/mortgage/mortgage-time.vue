<template>
    <div class="mortgage-time">
        <v-header :title="title" @back="back" :next="next" @submit="submit"></v-header>
        <div class="normal-wrapper">
            <span class="text">客户编号:</span>
            <span class="val">{{customer.id}}</span>
        </div>
        <div class="normal-wrapper">
            <span class="text">客户姓名:</span>
            <span class="val">{{customer.name}}</span>
        </div>
        <div class="normal-wrapper">
            <span class="text">联系方式:</span>
            <span class="val">{{customer.phone}}</span>
        </div>
        <div class="normal-wrapper">
            <span class="text">借款品种:</span>
            <span class="val">{{customer.type}}</span>
        </div>
        <h2 class="title">与银行确定抵押时间</h2>
        <div class="select-wrapper">
            <span class="text">抵押日期</span>
            <span class="desc">{{time}}</span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import {mapGetters} from 'vuex'
 export default {
     data(){
         return{
             title:'确定抵押时间',
             next:'提交',
             time:''
         }
     },
     methods:{
         back(){
             this.$router.back()
         },
         submit(){
             console.log('thank you for your click!')
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components:{
         vHeader
     }
 }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.mortgage-time
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
