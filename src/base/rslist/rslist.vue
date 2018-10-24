<template>
    <div>
        <section>
            <slot name="body"></slot>  
        </section>
        <footer>
            <slot name="footer"></slot>
        </footer>        
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.list-header
    height: 30px
    line-height: 30px
    padding-left: 20px
    font-size: $font-size-small
    background: $background-list-header
    color: $font-color-list-header
    border-bottom: none
ul
    background: $pure-white
    font-size: $font-size-medium
    li
        border-bottom 1px solid $color-border
    .no-border
        border-bottom none
    .placeholder
        height: 10px
        line-height: 10px
        background: $background-list-header
</style>