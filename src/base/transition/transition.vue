/**动画基础组件，传入定义好的name名称，获得相应的动画 */
<template>
    <transition :name="name">
        <slot></slot>
    </transition>
</template>

<script type='text/ecmascript-6'>
  export default {
    props:{
        name: String,
        default:''
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .slide-left-enter-active, .slide-left-leave-active 
      transition: all .3s
  .slide-left-enter, .slide-left-leave-to 
      transform translate3d(100%,0,0)
</style>