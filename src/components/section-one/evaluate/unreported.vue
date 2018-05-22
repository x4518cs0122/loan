<template>
    <div class="unreported">
        <v-header :title="title" @submit="submit" :next="next" @back="back"></v-header>
        <form-list :list="reports" @pop="pop" @choosed="choosed" ref="formList"></form-list>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
 export default {
     data(){
         return{
             reports:[
                 {
                     title:'',
                     items:[{
                         class:'select-wrapper',
                         text:'环节状态',
                         value:'',
                         options:['已出报告','未出报告,继续提醒我']
                     },{
                         class:'select-wrapper',
                         text:'完成日期',
                         value:'选择出报告日期'
                     },{
                         class:'select-wrapper',
                         text:'报告类型',
                         value:'',
                         options:['预评','正评']
                     }]
                 },{
                    title:'报告内容',
                    items:[{
                        class:'input-wrapper',
                        text:'权利人',
                        placeholder:'点击输入权利人姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'借款人',
                        placeholder:'点击输入借款人姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'座落',
                        placeholder:'点击输入座落',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'房龄',
                        placeholder:'点击输入房龄姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'面积',
                        placeholder:'点击输入面积',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'单价',
                        placeholder:'点击输入单价',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'总价',
                        placeholder:'点击输入总价',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'贷款金额',
                        placeholder:'点击输入贷款金额',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'年限',
                        placeholder:'点击输入年限',
                        value:''
                    },{
                        class:'select-wrapper',
                        text:'首套/两套',
                        value:'',
                        options:['首套','两套']
                    }]
                 }
                ],
             options:[],
             currentItem:{}
         }
     },
     methods:{
         pop(option){
             this.options = option
             this.$refs.pop.show()
         },
         choosed(option){
             this.$refs.formList.choosed(option)
         },
         submit(){
             console.log('you did!')
         },
         back(){
             this.$router.back()
         }
     },
     components:{
         vHeader,
         pop,
         formList
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.unreported
    position absolute 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
        
 
</style>
