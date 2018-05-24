<template>
    <div class="pop-up" >
        <transition name="slide">   
            <ul class="item-wrapper" v-show="popUpShow">
                <li v-for="(item,index) in options" :key="index" class="list-item" @click="choosed(item)">
                        <p class="text">{{item}}</p>
                    </li>
                </ul>   
        </transition>
        <transition name="meng">
            <div class="list-mask" v-if="popUpShow" @click="hide"></div>
        </transition>
    </div>  
</template>
<script>
export default {
  props:{
      options:{
          type:Array,
          default:()=>{
              return []
          }
      }
  },
  data(){
      return{
          popUpShow:false
      }
  },
  methods:{
      show(){
          this.popUpShow = true
      },
      hide(){
          this.popUpShow = false
      },
      choosed(item){
          this.$emit('choosed',item)
          this.hide()
      }

  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .pop-up  
        position fixed 
        bottom 0
        left 0
        right 0  
        max-height 300px
        z-index 200
        .item-wrapper
            z-index 50
            background #fff
            &.slide-enter-active, &.slide-leave-active 
                transition all .3s
            &.slide-enter, &.slide-leave-to
                transform translate3d(0,100%,0)
            .list-item
                padding 10px 20px
                text-align center
                font-size $font-size-medium
                color $color-text-l
                border-bottom 1px solid $color-border
        .list-mask
            position fixed
            top 0
            left 0
            width 100%
            height 100%
            z-index -2
            background rgba(7,17,27,0.6)
            backdrop-filter blur(10px)
            &.meng-enter-active, &.meng-leave-active 
                transition all .3s              
            &.meng-enter-to, &.meng-leave
                background rgba(7,17,27,0.6)
    

</style>


