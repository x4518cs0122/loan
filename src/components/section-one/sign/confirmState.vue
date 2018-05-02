<template>
    <div class="confirm-state">
        <v-header :next="next" :title="title" @submit="submit" @back="back"></v-header>
        <form-list :list="list" @pop="pop" ref="formList" @choosed="choosed"></form-list>  
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
export default {
  data(){
      return{
          next:'提交',
          title:'确定签约状态',
          list:[{
              title:'',
              items:[{
                class:'normal-wrapper',
                text:'约定时间',
                value:'',
            },{
                class:'normal-wrapper',
                text:'约定地点',
                value:'',
            },{
                class:'select-wrapper',
                text:'签约状态',
                value:'',
                options:['已签约','未签约']
            }]
          }],
          options:[],
          currentIndex:-1
      }
  },
  methods:{
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          this.$refs.formList.choosed(option)
      },
      back(){
          this.$router.back()
      },
      submit(){
          console.log("done!")
      }
  },
  components:{
      vHeader,
      pop,
      formList
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.confirm-state
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .normal-wrapper
        normal-wrapper()
    .select-wrapper
        select-wrapper()
</style>
