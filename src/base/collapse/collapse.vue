<template>
    <div class="collapse" >
        <h1 class="title" @click="toggle">{{title}}
            <span class="fa icon" :class="active" aria-hidden="true"></span>
        </h1>
        <transition name="slide">
            <div class="item-wrapper" v-show="show">
                <ul>
                    <li class="item" v-for="item in itemGroup" :key="item.index" @click="itemClick(item.router)">
                        <div class="fa icon" :class="item.icon" aria-hidden="true">
                            <h2 class="text">{{item.title}}</h2>
                        </div>                  
                    </li>
                </ul>
            </div>
        </transition>    
    </div>
</template>
<script>

export default {
  props:{
      title:{
          type:String,
          default:'抵押贷款'
      },
      itemGroup:{
          type:Array,
          default:[]
      }
  },
  data(){
      return{
          show:true
      }
  },
  methods:{
      toggle(){
          this.show = !this.show
      },
      itemClick(router){
          this.$emit('select',router)
      }
  },
  computed: {
      active(){
        return  this.show? 'fa-chevron-down':'fa-chevron-right'
      }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .collapse  
        margin 0 20px
        font-size $font-size-medium
        .title
            height 50px
            line-height 50px
            position relative  
            border-bottom 1px solid $color-border
            .icon
                position absolute
                right 0
                top 16px
                font-size $font-size-large
                color $color-text-l
        .item-wrapper
            display inline-block
            width 100%
            margin-top 20px
            height 270px
            transform-origin center top
            &.slide-enter-active, &.slide-leave-active 
                transition: all .1s linear
            &.slide-enter, &.slide-leave-to 
                transform :scale(1,0)
            // &.slide-enter-to, &.slide-leave
            //     transform :translate3d(0,0,0)
            .item
                text-align center
                display inline-block
                width 33%
                // font-size 0
                height 60px
                margin-bottom 30px
                .icon
                    font-size 25px
                    color #868686
                    .text
                        padding-top 5px
                        color $color-text-l
                        font-size $font-size-medium

</style>


