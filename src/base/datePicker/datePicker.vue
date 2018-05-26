<template>
    <div class="date-picker" v-if="show">
        <div class="picker-wrapper">
            <div class="list-header">
                <span class="cancel" @click="toggleList">取消</span>
                <span class="title">选择时间</span>
                <span class="submit" @click="submit">提交</span>
            </div>
            <div class="scroll-wrapper">
                <Scroll class="years" :listenScroll="listenScroll"  @scrollEnd="scrollEndYear" ref="scrollYear" >
                    <ul class="space">
                        <li v-for="(year,index) in yearList" :key="index" class="item">
                            <span>{{year}}</span>
                        </li>
                    </ul>
                </Scroll>
                <Scroll class="months" :listenScroll="listenScroll"  @scrollEnd="scrollEndMonth" ref="scrollMonth" >
                    <ul class="space">
                        <li v-for="(month,index) in monthList" :key="index" class="item">
                            <span>{{month}}</span>
                        </li>
                    </ul>
                </Scroll>
                <Scroll class="days" :listenScroll="listenScroll"  @scrollEnd="scrollEndDay" ref="scrollDay" >
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
            <div class="list-mask"  @click="toggleList">
                
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
             yearList:[],
             monthList:[],
             dayList:[]
         }
     },
     created(){
         this.time = {}
         this.listenScroll = true
         this.initDate()
     },
     methods:{
         toggleList(){
             this.show = !this.show
             this.dayList = this.setArray(1,31)
         },
         scrollEndYear(pos){
             if(pos.y > 0||pos.y < -maxLength){
                 return
             }
             let index = 0
             let maxLength = (this.yearList.length-1) * SCROLL_ITEM_SIZE
             let y = Math.abs(pos.y)
             index = Math.floor((y-SCROLL_ITEM_SIZE/2)/SCROLL_ITEM_SIZE)+1
             this.$refs.scrollYear.scrollTo(0,-SCROLL_ITEM_SIZE*index)
             this.time.year = this.yearList[index]
         },
         scrollEndDay(pos){
             if(pos.y > 0||pos.y < -maxLength){
                 return
             }
             let index = 0
             let maxLength = (this.dayList.length-1) * SCROLL_ITEM_SIZE
             let y = Math.abs(pos.y)
             index = Math.floor((y-SCROLL_ITEM_SIZE/2)/SCROLL_ITEM_SIZE)+1
             this.$refs.scrollDay.scrollTo(0,-SCROLL_ITEM_SIZE*index)
             //day需要单独处理，月份年份的变化会导致日变化，获取值出现问题，记录index值在提交的时候计算可解决
             this.time.day = index
         },
         scrollEndMonth(pos){
             if(pos.y > 0||pos.y < -maxLength){
                 return
             }
             let index = 0
             let maxLength = (this.monthList.length-1) * SCROLL_ITEM_SIZE
             let y = Math.abs(pos.y)
             index = Math.floor((y-SCROLL_ITEM_SIZE/2)/SCROLL_ITEM_SIZE)+1
             this.$refs.scrollMonth.scrollTo(0,-SCROLL_ITEM_SIZE*index)
             this.time.month = this.monthList[index]
             let year = this.time.year || this.yearList[0]
             this.monthChange(this.time.month,year)
            //  this.$emit('monthChange',)
         },            
        initDate(){
            let d = new Date()
            let year = d.getFullYear()
            this.yearList = this.setArray(year-1,year+1)
            this.monthList = this.setArray(1,12)
        },
        monthChange(month,year){
            let d = new Date(year,month,0)
            this.dayList = this.setArray(1,d.getDate()) 
        },
        setArray(start,end){
            let result = []
            for(let i = start;i<=end;i++){
                result.push(i)
            }
            return result
        },
        submit(){
             let year = this.time.year || this.yearList[0]
             let month = this.time.month || this.monthList[0]
             let day
             let dayIndex = this.time.day
             if(dayIndex){
                 let index = dayIndex > this.dayList.length-1? this.dayList.length-1:dayIndex
                 day = this.dayList[index]
             }else{
                 day = this.time.day || this.dayList[0]
             }            
             this.show = false
             month = ('00'+month).substr(-2,2)
             day = ('00'+day).substr(-2,2)
             this.$emit('submit',year+'-'+month+'-'+day)
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
