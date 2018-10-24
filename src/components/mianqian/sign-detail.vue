<template>
    <div class="sign-detail">
        <v-header @goback="goback" title="抵押面签列表"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.phone"></rs-text></li>
                <li><rs-text label="借款品种" :value="loanType[customer.loan_type]"></rs-text></li>
                <li class="placeholder"></li>
                <li><rs-select selectText="资料目录表" @clicked="editDataForm"></rs-select></li>
                <li><rs-select selectText="个人贷款申请表" @clicked="editPersonalForm"></rs-select></li>
            </ul>
        </rs-list>             
        <router-view></router-view>
    </div>
</template>

<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsSelect from 'base/rsselect/rsselect'
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
         goback(){
             this.$router.push({path:'/sign'})
         },
         editDataForm(){
             this.$router.push({path:`/sign/${this.customer.taskId}/form`})
         },
         editPersonalForm(){
             this.$router.push({path:`/sign/${this.customer.taskId}/application`})
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components:{
         vHeader,
         rsText,
         rsSelect,
         rsList
     }
     
 }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
.sign-detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    background $color-background

</style>
