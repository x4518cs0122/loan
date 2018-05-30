<template>
    <div class="placeOrder">
        <v-header title="下单" @back="back" @submit="submit" next="提交"></v-header>
        <form-list :list="list" @pop="pop" ref="formList" :obj="obj" @choosed="choosed" @datePick="datePickerShow"></form-list>  
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
        <date-picker ref="datePicker" @submit="choosed"></date-picker>
    </div>
</template>

<script>
import pop from 'base/pop-up/pop-up'
import vHeader from 'base/header/header'
 export default {
     data(){
         return{
             list:[{
                    title:'',
                    items:[{
                        class:'normal-wrapper',
                        text:'贷款编号',
                        value:'',
                    },{
                        class:'select-wrapper',
                        text:'完成时间',
                        key:'time',
                        type:selectType.datePick,
                        value:'',
                    },{
                        class:'select-wrapper',
                        text:'签约地点',
                        key:'company',
                        value:'',
                        options:['管理添加1','管理添加2']
                    }]
                }],
             obj:{
                    time:'',
                    company:''
                },
             options:[]
         }
     },
     methods:{
         pop(item){
             this.options = item.options
             this.$refs.pop.show()
         },
         choosed(item){
             this.$refs.formList.choosed(item)
         },
         back(){
             this.$router.back()
         },
         submit(){
             console.log('success! textarea:'+this.textarea+'company:'+this.items[1].val)
         }
     },
     components: {
         vHeader,
         pop
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.placeOrder
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .title
        title()
    .select-wrapper
        select-wrapper()
    .normal-wrapper
        normal-wrapper()
        height 60px
        textarea 
            resize none 
            overflow auto
            width 100%
            outline none
            border none
 
</style>
