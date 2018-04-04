<template>
    <div class="unreported">
        <v-header :title="title"></v-header>
        <ul>
            <li v-for="(type,index) in reports" :key="index">
                <h2 class="title" v-if="type.title">{{type.title}}</h2>
                <ul>
                    <li v-for="(item,index) in type.items" :key="index">
                        <div v-if="item.class==='select-wrapper'" :class="item.class">
                            <span class="text">{{item.text}}</span>
                            <span class="desc">{{item.val}}</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div :class="item.class" v-else>
                            <label class="text" for="name">{{item.text}}</label>
                            <input  type="text" 
                                :placeholder="item.placeholder" 
                                id="name" 
                                v-model="item.value">
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
 export default {
     data(){
         return{
             title:'出报告',
             reports:[
                 {
                     title:'',
                     items:[{
                         class:'select-wrapper',
                         text:'环节状态',
                         val:'',
                         options:['已出报告','未出报告,继续提醒我']
                     },{
                         class:'select-wrapper',
                         text:'完成日期',
                         val:'选择出报告日期'
                     },{
                         class:'select-wrapper',
                         text:'报告类型',
                         val:'',
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
                ]
         }
     },
     components:{
         vHeader
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
    .title
        title()
    .select-wrapper
        select-wrapper()
    .input-wrapper
        input-wrapper()
        
 
</style>
