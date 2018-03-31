<template>
    <div class="estate" v-show="toggleShow">
        <app-title :title="title" :next="next" @back="hide" @submit="submit"></app-title>
        <div class="info-wrapper">
            <div class="area">
                <span class="text">房产面积</span>
                <input class="input" placeholder="请输入房产面积（性质）" ref="area">
            </div>
            <div class="area">
                <span class="text">询价结果</span>
                <input class="input" placeholder="请输入询价结果" ref="price">
                <span class="perMeters">元/平方米</span>
            </div>
            <div class="area">
                <span class="text">总价</span>
                <input class="input" placeholder="请输入总价" ref="total">
            </div>
        </div>
    </div>
</template>
<script>
import appTitle from 'base/header/header'
export default {
  data(){
      return{
          toggleShow:false,
          title:'添加房产信息',
          next:'确定'
      }
  },
  components: {
      appTitle
  },
  methods:{
      hide(){
          this.toggleShow = false
      },
      show(){
          this.toggleShow = true
      },
      submit(){
          const area = this.$refs.area.value
          const price = this.$refs.price.value
          const total = this.$refs.total.value
          this.$emit('submit',area,price,total)
          this.hide()
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.estate
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 200
    background #fff
    .info-wrapper
        .area
            display flex
            padding 0 20px
            height 45px
            line-height 45px
            font-size $font-size-medium
            vertical-align top
            border-bottom 1px solid $color-border
            .text
                flex 0 0 100px
            .input
                flex 1
                outline:none
                color $color-text-l
            .perMeters
                flex 0 0 80px
                font-size $font-size-small

</style>


