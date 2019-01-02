<template>
    <div class="normal-wrapper">
        <p class="text">{{label}}</p>
        <p class="val">{{value}}</p>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props:{
        label:{
            type:String,
            default: ''
        },
        value:{}
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang='stylus' scoped>
.normal-wrapper
    height 20px
    line-height 20px
    padding 15px 20px
    display flex
    background $pure-white
    font-size $font-size-medium
    .text
        float left
        width 100px       
    .val
        flex-grow 1
        flex-shrink 1
    p
        margin 0
</style>