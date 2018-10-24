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
        value:{
            type:String,
            default:''
        }
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
    background $pure-white
    font-size $font-size-medium
    .text
        float left
        width 100px       
    .val
        padding-left 100px
        width 100%
    p
        margin 0
</style>