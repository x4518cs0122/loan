<template>
    <div class="estate" v-show="toggleShow">
        <vHeader :title="isadd? '添加房产信息':'房产信息'" :next="isadd? '确定':''" @goback="hide" @submit="submit" back="接单"></vHeader>
        <div class="info-wrapper">
            <div class="area">
                <span class="text">房产面积</span>
                <input class="input" :value="house.area" v-if="house.area" disabled>
                <input class="input" placeholder="请输入房产面积（性质）" ref="area" v-model="area" v-else>
            </div>
            <div class="area">
                <span class="text">询价结果</span>
                <input class="input" :value="house.enquiry_result" v-if="house.enquiry_result" disabled>
                <input class="input" placeholder="请输入询价结果" ref="price" v-model="enquiry_result" v-else>
                <span class="perMeters">元/平方米</span>
            </div>
            <div class="area">
                <span class="text">总价</span>
                <input class="input" :value="house.total_price" v-if="house.total_price" disabled>
                <input class="input" placeholder="请输入总价" ref="total" v-model="total_price" v-else>
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
        enquiry_result: '',
        total_price: '',       
      }
  },
  components: {
      vHeader
  },
  computed:{
      isadd() {
          return Object.keys(this.house).length === 0
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
          let mortgageHouses = {
                id: null,
                area:this.area,
                enquiry_result: this.enquiry_result,
                total_price: this.total_price,
                checklist_id: null
            }  
          this.$emit('submit',mortgageHouses)
          this.reset()
          this.hide()
      },
      reset() {
          this.total_price = ''
          this.area = ''
          this.enquiry_result = ''
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
            input:disabled
                background $pure-white
            .perMeters
                flex 0 0 80px
                font-size $font-size-small

</style>


