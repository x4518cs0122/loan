<template>
  <div class="header">
        <div class="header-wrapper">
            <div class="back" @click="goback">
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
        background $background-color-header
        border-bottom 1px solid rgb(228,228,228)
        .back
            position absolute
            top 0
            bottom 0
            left 0
            width 50px
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
            width 50px 
</style>


