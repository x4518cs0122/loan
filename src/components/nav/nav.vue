<template>
    <div class="header">
        <div class="text">
            <span>{{title}}</span>
        </div>
        <div class="bell-wrapper" @click="toggleNotice">
            <span  class="fa fa-bell-o icon" aria-hidden="true">
                <span class="active"></span>
            </span>          
        </div>
        <notice v-if="noticeShow" @back="toggleNotice"></notice>
    </div>
</template>
<script>
import notice from 'components/notice/notice'
export default {
  props:{
      title:{
          type:String,
          default:'业务办理'
      }
  },
  data(){
      return{
          noticeShow:false
      }
  },
  methods:{
      titleChange(title){
          this.title = title
      },
      toggleNotice(){
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
        width 100%  
        height 50px
        background $color-header-background
        border-bottom 2px solid rgb(228,228,228)
        .text
            font-size $font-size-medium-x
            color $color-theme
            line-height 50px
            text-align center
            font-weight 700
        .bell-wrapper
            line-height 50px
            position absolute
            right 20px
            top 0
            .icon
                position relative
                color $color-theme
                font-weight 200
                font-size $font-size-large-x
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


