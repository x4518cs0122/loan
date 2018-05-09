<template>
    <div class="customer">
      <v-header title="确定回证时间" next="提交" @back="back"></v-header>
      <form-list :list="list" @pop="pop" ref="formList" ></form-list>
      <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import vHeader from 'base/header/header'
import formList from 'components/form-list/form-list'
import pop from 'base/pop-up/pop-up'
 export default {
     data(){
         return{
             options:[],
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
                 title:'确定过户状态',
                 items:[{
                     class:'select-wrapper',
                     text:'过户状态',
                     value:'',
                     options:['未完成','已完成']
                 }]
              },{
                 title:'确定回证时间',
                 items:[{
                     class:'select-wrapper',
                     text:'回证时间',
                     value:'选择回证时间',
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
         },
         pop(option){
             this.options = option
             this.$refs.pop.show()
         },
         choosed(option){
             this.$refs.formList.choosed(option)
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components:{
         vHeader,
         formList,
         pop
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
