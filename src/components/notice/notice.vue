<template>
  <div class="notice">
        <div class="header">
            <div class="back" @click="back">
                <span class="fa fa-arrow-left" aria-hidden="true"></span>
            </div>
            <h1 class="text">公告通知</h1>
        </div>
        <Scroll tag="div" class="list-wrapper" :data="notices" ref="scroll">
            <ul>
                <li class="list-item" v-for="item in notices" :key="item.index">
                    <div class="item-wrapper">
                        <div class="item-left">
                            <h2 class="title">公告标题</h2>
                            <div class="text">
                                <p class="detail">今天是农历初五，街上喜气洋洋，好运来祝你好运来，好运来祝你喜和彩</p>
                            </div>   
                        </div>
                        <div class="item-right">
                            <img :src="item.icon" width="50" height="50" /> 
                        </div>
                    </div>
                    <p class="time">发表于2017-7-7</p>
                </li>
            </ul>
        </Scroll>
  </div>
</template>
<script>
import {getNotice} from 'api/notice'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
export default {
  created () {
      this._getNotice()
  },
  data(){
      return{
          notices:[]
      }
  },
  methods:{
      back(){
          this.$emit('back')
      },
       _getNotice(){
          getNotice().then((res)=>{
              if(res.errno === ERR_OK){
                  console.log(res)
                  this.notices = res.data
              }
          })
      },
      
  },
  components:{
      Scroll
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

    .notice
        position fixed
        top 0
        bottom 0
        right 0
        left 0
        z-index 999
        background rgb(255,255,255)
        .header
            position relative
            height 50px
            line-height 50px
            background #1ABC9C
            color rgb(242,242,242)
            .back
                position absolute
                top 0
                left 20px
                .fa-arrow-left
                    padding 9px
            .text
                width 70%
                margin: 0 auto
                text-align: center
                font-weight 200
        .list-wrapper
            position fixed
            top 50px
            left 0
            right 0
            bottom 0
            overflow hidden
            .list-item
                border-bottom 2px solid $color-header-background
                .item-wrapper
                    display flex
                    padding 10px 30px 10px 20px
                    border-bottom 1px solid $color-header-background
                    .item-left
                        flex 1
                        padding 10px 
                        .title
                            font-size $font-size-medium
                            color $color-text-l
                            margin-bottom 10px
                        .text
                            display inline-block
                            max-width 200px
                            font-size $font-size-small
                            color $color-text-ll
                            .detail
                                no-wrap()
                    .item-right
                        flex 0 0 50px
                        // background-image url()
        .time
            margin 10px 30px
            font-size $font-size-small
            color $color-text-ll

</style>


