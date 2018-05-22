<template>
    <div class="danbao">
        <v-header :title="title" @submit="submit" :next="next" @back="back"></v-header>
        <div class="scroll">
            <form-list :list="list" ref="formList" @pop="pop"></form-list>
        </div>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import pop from 'base/pop-up/pop-up'
import Scroll from 'base/scroll/scroll'
 export default {
     data(){
         return{
             options:[],
             currentItem:{},
             list:[
                {
                    items:[{
                        class:'normal-wrapper',
                        text:'贷款编号',
                        value:''
                    },{
                        class:'normal-wrapper',
                        text:'客户姓名',
                        value:''
                    },{
                        class:'normal-wrapper',
                        text:'联系方式',
                        value:''
                    },{
                        class:'normal-wrapper',
                        text:'借款品种',
                        value:''
                    }]
                },{
                    title:'担保函与收费明细',
                    items:[{
                        class:'select-wrapper',
                        text:'担保函开具状态',
                        value:'',
                        options:['已开','未开']
                    },{
                        class:'select-wrapper',
                        text:'担保函开具日期',
                        value:'',
                        options:['已开','未开']
                    },{
                        class:'select-wrapper',
                        text:'费用A收费状态',
                        value:'',
                        options:['已收','未收']
                    },{
                        class:'select-wrapper',
                        text:'费用A收费时间',
                        value:'',
                        options:['已开','未开']
                    },{
                        class:'select-wrapper',
                        text:'费用B收费状态',
                        value:'',
                        options:['已开','未开']
                    },{
                        class:'select-wrapper',
                        text:'费用B收费时间',
                        desc:'',
                        options:['已开','未开']
                    },{
                        class:'select-wrapper',
                        text:'费用C收费状态',
                        value:'',
                        options:['已开','未开']
                    },{
                        class:'select-wrapper',
                        text:'费用C收费时间',
                        value:'',
                        options:['已开','未开']
                    }]
                }
             ]
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
         back(){
             this.$router.back()
         },
         submit(){
             console.log('done!')
         }
     },
     components:{
         pop,
         Scroll
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.danbao
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .scroll
        position fixed 
        top 52px
        bottom 0
        left 0
        right 0
        overflow hidden
        background $color-background

</style>
