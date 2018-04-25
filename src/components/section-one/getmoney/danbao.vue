<template>
    <div class="danbao">
        <v-header :title="title" @submit="submit" :next="next" @back="back"></v-header>
        <Scroll class="scroll">
            <ul>
                <li v-for="(type,index) in danbaoList" :key="index">
                    <h2 class="title" v-if="type.title">{{type.title}}</h2>
                    <ul>
                        <li v-for="(item,index) in type.items" :key="index">
                            <div v-if="item.class==='select-wrapper'" :class="item.class" @click="pop(item)">
                                <span class="text">{{item.text}}</span>
                                <span class="desc">{{item.value}}</span>
                                <span class="icon">
                                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                                </span>
                            </div>
                            <div :class="item.class" v-else>                            
                                <span class="text">{{item.text}}</span>
                                <span class="val">{{item.value}}</span>                           
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </Scroll>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import pop from 'base/pop-up/pop-up'
import vHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
 export default {
     data(){
         return{
             title:'担保函与收费明细',
             next:'提交',
             options:[],
             currentItem:{},
             danbaoList:[
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
         pop(item){
             this.options = item.options
             this.currentItem = item
             this.$refs.pop.show()
         },
         choosed(option){
             this.currentItem.value = option
         },
         back(){
             this.$router.back()
         },
         submit(){
             console.log('done!')
         }
     },
     components:{
         vHeader,
         pop,
         Scroll
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
    .danbao
        position absolute
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
            .title
                title()
            .select-wrapper
                select-wrapper()
            .normal-wrapper
                normal-wrapper()
 
</style>
