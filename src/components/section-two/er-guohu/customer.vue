<template>
    <div class="customer">
      <v-header title="确定回证时间" next="提交" @back="back"></v-header>
      <form-list :list="list"></form-list>
      <router-view></router-view>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import vHeader from 'base/header/header'
import formList from 'components/form-list/form-list'
 export default {
     data(){
         return{
             list:[{
                 title:'',
                 items:[{
                     class:'normal-wrapper',
                     text:'贷款编号',
                     val:''
                 },{
                     class:'normal-wrapper',
                     text:'客户姓名',
                     val:''
                 },{
                     class:'normal-wrapper',
                     text:'联系方式',
                     val:''
                 }]
              },{
                 title:'回证时间',
                 items:[{
                     class:'select-wrapper',
                     text:'回证时间',
                     value:'确定回证时间',

                 }]
             }]
         }
     },
     created(){
         this.start()
     },
     methods:{
         start(){           
             this.list[0].items[0].val = this.customer.id
             this.list[0].items[1].val = this.customer.name
             this.list[0].items[2].val = this.customer.phone
         },
         back(){
             this.$router.back()
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components:{
         vHeader,
         formList
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.customer
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
   
</style>
