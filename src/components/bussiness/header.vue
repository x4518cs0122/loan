<template>
  <div class="header">
        <div class="header-wrapper">
            <div class="title">
                <div class="inner">{{title}}</div>
            </div>  
            <div class="bell-wrapper" @click="toggleNotice">
                <span  class="fa icon fa-bell-o" aria-hidden="true">
                    <span class="active"></span>
                </span>
            </div>     
        </div> 
        <div class="placeholder"></div> 
        <!-- <notice ref="notice"></notice>         -->
  </div>
</template>
<script>
import notice from 'components/notice/notice'
export default {
  props:{
      title:{
          type:String,
          default:''
      }
  },
  data(){
      return{
          
      }
  },
  methods:{
      toggleNotice(){
          this.$refs.notice.show()
      }
  },
  components:{
      notice
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
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
        .title  
            width 100%
            .inner
                margin 0 50px
                color $pure-white
                font-size $font-size-medium-x       
        .bell-wrapper
            position absolute
            top 0
            right 0
            bottom 0
            width 50px 
            font-size $font-size-large
            .icon
                position relative 
                .active
                    position absolute
                    top 0
                    right 0
                    margin 2px
                    display inline-block
                    height 6px
                    width 6px
                    background $bello-active
                    border-radius 50%
</style>


