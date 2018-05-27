<template>
    <div class="sign-detail">
        <v-header @back="back" title="抵押面谈列表"></v-header>
        <Scroll>
            <ul>
                <li class="normal-wrapper">
                    <span class="text">贷款编号</span>
                    <span class="val">{{customer.taskId}}</span>
                </li>
                <li class="normal-wrapper">
                    <span class="text">客户姓名</span>
                    <span class="val">{{customer.name}}</span>
                </li>
                <li class="normal-wrapper">
                    <span class="text">联系方式</span>
                    <span class="val">{{customer.phone}}</span>
                </li>
                <li class="normal-wrapper">
                    <span class="text">借款品种</span>
                    <span class="val" v-html="loanType[customer.loan_type]"></span>
                </li>
                <li class="select-wrapper" @click="editDataForm">
                    <span class="text">资料目录表</span>
                    <span class="desc">点击编辑</span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </li>
                <li class="select-wrapper" @click="editPersonalForm">
                    <span class="text">个人贷款申请表</span>
                    <span class="desc">点击编辑</span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </li>
            </ul>
        </Scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
 export default {
     data(){
         return{

         }
     },
     created(){
         this.loanType = ['抵押消费','抵押经营','信用']
     },
     methods:{
         back(){
             this.$router.back()
         },
         editDataForm(){
             this.$router.push({path:`/sign/${this.customer.taskId}/form`})
         },
         editPersonalForm(){
             
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components:{
         vHeader,
         Scroll
     }
     
 }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.sign-detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background $color-background
    .select-wrapper
        select-wrapper()
    .normal-wrapper
        normal-wrapper()
</style>
