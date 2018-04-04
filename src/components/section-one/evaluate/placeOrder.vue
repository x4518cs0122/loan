<template>
    <div class="placeOrder">
        <v-header :title="title" @back="back" @submit="submit" :next="next"></v-header>
        <div>
            <h2 class="title">下单格式</h2>
            <div class="normal-wrapper">
                <span class="text">下单格式</span>
                <textarea class="val" placeholder="输入单子内容" v-model="textarea"></textarea>
            </div>
        </div>
        <div>
            <h2 class="title">确定下单状态</h2>
            <ul>
                <li class="select-wrapper" v-for="(item,index) in items" 
                    :key="index" 
                    @click="pop(item)">
                    <span class="text">{{item.text}}</span>
                    <span class="desc">{{item.val}}</span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </li>
            </ul>
        </div>
        <pop :options="options" @choosed="choosed" ref="pop"></pop>
    </div>
</template>

<script>
import pop from 'base/pop-up/pop-up'
import vHeader from 'base/header/header'
 export default {
     data(){
         return{
             title:'下单',
             next:'提交',
             items:[{
                 text:'完成时间',
                 val:'选择下单完成日期',
                 options:[]
             },{
                 text:'评估公司',
                 val:'',
                 options:['公司1','公司2','公司3']
             }],
             textarea:'',
             currentItem:{},
             options:[]
         }
     },
     methods:{
         pop(item){
             this.options = item.options
             this.$refs.pop.show()
             this.currentItem = item
         },
         choosed(item){
             this.currentItem.val = item
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
