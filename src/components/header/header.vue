<template>
  <div class="header">
        <div class="header-wrapper">
            <div class="back" @click="goback" v-show="!hideback">
                <i class="fa fa-angle-left" aria-hidden="true"></i>&nbsp;{{back}}</div>
            <div class="title">
                <div class="inner">{{title}}</div>
            </div>
            <div class="submit" @click="submit" v-show="next">{{next}}</div>         
        </div>  
        <div class="placeholder"></div>      
  </div>
</template>
<script>
import notice from 'components/notice/notice'
export default {
  props:{
      back:{
          type: String,
          default: '返回'
      },
      title:{
          type:String,
          default:''
      },
      next:{
          type:String,
          default:''
      },
      hideback:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return{
          noticeShow:false
      }
  },
  methods:{
      goback(){
          this.$emit('goback')
      },
      submit(){
          this.$emit('submit')
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.header
    .placeholder
        height: 50px;
    .header-wrapper
        position fixed
        top 0
        height 50px
        width 100%
        line-height 50px
        text-align center
        font-size $font-size-medium
        color $pure-white
        background: -webkit-linear-gradient($background-color-header-top, $background-color-header); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient($background-color-header-top, $background-color-header); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient($background-color-header-top, $background-color-header); /* Firefox 3.6 - 15 */
        background: linear-gradient($background-color-header-top, $background-color-header);
        border-bottom 1px solid rgb(228,228,228)
        .back
            position absolute
            top 0
            bottom 0
            left 0
            width 60px
            white-space nowrap;
        .title  
            width 100%
            .inner
                margin 0 50px
                color $pure-white
                font-size $font-size-medium-x       
        .submit
            position absolute
            top 0
            right 0
            bottom 0
            width 60px 
</style>


