<template>
    <div class="progress">
        <v-header title='二手房整件输机' @back="back"></v-header>
        <form-list :list="list" @pop="pop"></form-list>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import formList from 'components/form-list/form-list'
export default {
  data(){
      return{
          list:[{
              title:'确定房查征信状态',
              items:[{
                  class:'select-wrapper',
                  text:'房查征信完成日期',
                  value:'',
                  options:[]
              }]
          },{
              title:'确定整件状态',
              items:[{
                  class:'select-wrapper',
                  text:'整件完成日期',
                  value:'',
                  options:[]
              }]
          },{
              title:'确定输机状态',
              items:[{
                  class:'select-wrapper',
                  text:'输机完成日期',
                  value:'',
                  options:[]
              }]
          }]
      }
  },
  methods:{
      pop(){
          console.log('time!')
      },
      back(){
          this.$router.back()
      }
  },
  components:{
      formList,
      vHeader
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.progress
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
</style>
