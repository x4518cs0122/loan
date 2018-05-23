<template>
    <div class="date-picker">
        <div class="picker-wrapper">
            <div class="list-header">
                <span class="cancel">取消</span>
                <span class="title">选择时间</span>
                <span class="submit">提交</span>
            </div>
            <div class="scroll-wrapper">
                <Scroll class="years" :listenScroll="listenScroll"  @scrollEnd="scrollEnd" ref="scroll" >
                    <ul class="space">
                        <li v-for="(year,index) in yearList" :key="index" class="item">
                            <span>{{year}}</span>
                        </li>
                    </ul>
                </Scroll>
                <Scroll class="months" >
                    <ul class="space">
                        <li v-for="(month,index) in monthList" :key="index" class="item">
                            <span>{{month}}</span>
                        </li>
                    </ul>
                </Scroll>
                <Scroll class="days" >
                    <ul class="space">
                        <li v-for="(day,index) in dayList" :key="index" class="item">
                            <span>{{day}}</span>
                        </li>
                    </ul>
                </Scroll>
            </div>
        </div>
        <div class="line-wrapper">
            
        </div>
        <transition name="fade">
            <div class="list-mask"  @click="toggleList()">
                
            </div>
        </transition>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'

const SCROLL_ITEM_SIZE = 26
 export default {
     data(){
         return{
             show:false,
             yearList:['2016','2017','2018','2016','2017','2018','2016','2017','2018','2016','2017','2018'],
             monthList:['2016','2017','2018'],
             dayList:['2016','2017','2018']
         }
     },
     created(){
         this.listenScroll = true
     },
     methods:{
         toggleList(){
             this.show = !this.show
         },
         scrollEnd(pos){
            //  console.log(pos.y)
            let maxLength = (this.yearList.length-1) * SCROLL_ITEM_SIZE
             if(pos.y > 0||pos.y < -maxLength){
                 return
             }
             let y = Math.abs(pos.y)
             let index = Math.floor((y-SCROLL_ITEM_SIZE/2)/SCROLL_ITEM_SIZE)+1
             this.$refs.scroll.scrollTo(0,-SCROLL_ITEM_SIZE*index)
         }
     },
     components:{
         Scroll
     }
 }
</script>

<style lang='stylus' scoped>
.date-picker
    position fixed
    left:0
    bottom 0
    z-index 50
    width 100%
    height 100% 
    .picker-wrapper
        position absolute
        left 0
        bottom 0
        z-index -1
        width 100%   
        // transform translate3d(0,100%,0)
        .list-header
            display flex
            height 40px
            line-height 40px
            padding 0 18px
            background #f3f5f7
            // border-1px(rgba(7,17,27,0.1))
            .cancel
                flex 0 0 30px
                font-size 12px
                color rgb(0,160,220)
            .title
                flex 1
                text-align center
                font-size 14px
                font-weight 200
                line-height 40px
                width 100%
                color rgb(7,17,27)
            .submit
                flex 0 0 30px
                font-size 12px
                color rgb(0,160,220)
        .scroll-wrapper
            display flex
            height 226px
            width 100%
            background #f3f5f7
            .years,.months,.days
                flex 1
                overflow hidden             
                .space
                    padding 100px 0
                    .item
                        font-size 16px
                        text-align center
                        padding 5px
            // .months
            //     flex 1
            // .days
            //     flex 1
    .line-wrapper
        position absolute 
        bottom 100px
        left 0
        width 100%
        display inline-block
        height 26px
        border-top 1px solid #c6c6c6
        border-bottom 1px solid #c6c6c6
    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index -2
        background rgba(7,17,27,0.6)
        // backdrop-filter blur(10px)
        &.fade-enter-active, &.fade-leave-active 
            transition: all .3s              
        &.fade-enter-to, &.fade-leave
            background rgba(7,17,27,0.6)
            opacity 1
</style>
