<template>
    <div class="estate" v-show="toggleShow">
        <vHeader :title="isadd? '添加房产信息':'房产信息'" :next="isadd? '确定':''" @goback="hide" @submit="submit" back="接单"></vHeader>
        <div class="info-wrapper">
            <p class="warning" v-show="warning">输入不合法，请输入数字</p>
            <div class="area">
                <span class="text">房产面积</span>
                <input class="input" :value="house.area" v-if="house.area" disabled>
                <input class="input" placeholder="请输入房产面积（性质）" ref="area" v-model="area" v-else>
                <span class="perMeters">平方米</span>  
            </div>
            <div class="area">
                <span class="text">询价结果</span>
                <input class="input" :value="house.enquiryResult" v-if="house.enquiryResult" disabled>
                <input class="input" placeholder="请输入询价结果" ref="price" v-model="enquiryResult" v-else>
                <span class="perMeters">元/平方米</span>
            </div>
            <div class="area">
                <span class="text">总价</span>
                <input class="input" :value="house.totalPrice || total" disabled >
                <!-- <input class="input" placeholder="请输入总价" ref="total" :value="total" v-else> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from 'components/header/header'
export default {
  props:{
      house:{
          type:Object,
          default: () =>{
              return {}
          }
      }
  },
  data(){
      return{
        toggleShow:false,
        area:'',
        enquiryResult: '',
        totalPrice: '',   
        areaError:false,
        enquiryResultError: false,
        warning:false   
      }
  },
  components: {
      vHeader
  },
  computed:{
      isadd() {
          return Object.keys(this.house).length === 0
      },
      total() {  
          this.areaError = parseFloat(this.area).toString() === 'NaN'
          this.enquiryResultError = parseFloat(this.enquiryResult).toString() === 'NaN'
          if(this.areaError || this.enquiryResultError){
              return ''
          }   
          this.totalPrice = parseFloat(this.area) * parseFloat(this.enquiryResult)
          return this.totalPrice
      }
  },
  methods:{
      hide(){
          this.toggleShow = false
      },
      show(){
          this.toggleShow = true
      },
      submit(){
          if(!this.isadd){
              return 
          }
          if(this.areaError||this.enquiryResultError){
              this.warning = true
              return
          }
          let mortgageHouses = {
                area:this.area,
                enquiryResult: this.enquiryResult,
                totalPrice: this.total,
          };
          this.$emit('submit',mortgageHouses)
          this.reset()
          this.hide()
      },
      reset() {
          this.totalPrice = ''
          this.area = ''
          this.enquiryResult = ''
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
        .warning
            color $color-warning
            font-size $font-size-medium
            margin 5px 0
            padding-left: 110px
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
            input:disabled
                background $pure-white
            .perMeters
                flex 0 0 80px
                font-size $font-size-small

</style>


