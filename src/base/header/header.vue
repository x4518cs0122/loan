<template>
  <div class="header">
        <div class="header-wrapper">
            <span class="back" @click="back">返回</span>
            <span class="title">{{title}}</span>
            <span class="submit" @click="submit" v-if="next">{{next}}</span>     
            <div class="bell-wrapper" @click="noticeDetail" v-if="!next">
                <span  class="fa icon" aria-hidden="true" v-if="icon" :class="icon">
                    <span class="active"></span>
                </span>
            </div>     
        </div> 
        <notice v-if="noticeShow" @back="toggleNotice"></notice>        
  </div>
</template>
<script>
import notice from 'components/notice/notice'
export default {
  props:{
      icon:{
          type:String,
          default:''
      },
      title:{
          type:String,
          default:''
      },
      next:{
          type:String,
          default:''
      }
  },
  data(){
      return{
          noticeShow:false
      }
  },
  methods:{
      back(){
          this.$emit('back')
      },
      submit(){
          this.$emit('submit')
      },
      toggleNotice(){
          this.noticeShow = !this.noticeShow
      },
      noticeDetail(){
          this.noticeShow = !this.noticeShow
      }
  },
  components:{
      notice
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.header
    position relative
    height 50px
    .header-wrapper
        display  flex
        height 100%
        line-height 50px
        text-align center
        font-size $font-size-medium
        color $color-theme
        background $color-header-background
        border-bottom 2px solid rgb(228,228,228)
        .back
            flex 0 0 50px 
        .title
            flex 1
            color $color-text-l
            font-size $font-size-large        
        .submit,.bell-wrapper
            flex 0 0 60px   
        .bell-wrapper
            line-height 50px
            color $color-theme
            font-weight 200
            font-size $font-size-large-x
            .icon
                position relative 
                .active
                    position absolute
                    top 0
                    right 0
                    margin 2px
                    display inline-block
                    height 8px
                    width 8px
                    background #FF5918
                    border-radius 50%
</style>


