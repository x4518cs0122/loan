<template>
  <div class="header">
        <span class="back" @click="back">返回</span>
        <span class="text">{{title}}</span>
        <span class="submit" @click="submit" >{{next}}</span>
    </div>
</template>
<script>
export default {
  props:{
      title:{
          type:String,
          default:'抵押接单'
      },
      next:{
          type:String,
          default:''
      }
  },
  methods:{
      back(){
          this.$emit('back')
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
        display  flex
        height 50px
        line-height 50px
        text-align center
        font-size $font-size-medium
        color $color-theme
        background $color-header-background
        border-bottom 2px solid rgb(228,228,228)
        .back
            flex 0 0 50px 
        .text
            flex 1
            color $color-text-l
            font-size $font-size-large        
        .submit
            flex 0 0 60px
</style>


