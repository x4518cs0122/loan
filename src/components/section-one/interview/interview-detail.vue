<template>
  <div class="interview-detail">
      <v-header @back="back" @submit="submit" next="提交" title="抵押面谈"></v-header>
      <form-list :list="list" @pop="pop" ref="formList"></form-list>
      <pop :options="options" ref="pop" @choosed="choosed"></pop>
      <router-view></router-view>
  </div>
</template>
<script>
import formList from 'components/form-list/form-list'
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          options:[],
          list:[{
              title:'',
              items:[{
                  class:'normal-wrapper',
                  text:'贷款编号',
                  val:''
              },{
                  class:"select-wrapper",
                  text:'完成时间',
                  value:'',
                  options:[]
              }]
            },{
                title:'面谈建议',
                items:[
                    {
                        class:'input-wrapper',
                        text:'拟申请机构',
                        placeholder:'点击输入拟申请机构名称',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'拟对接人',
                        placeholder:'点击输入拟对接人姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'拟上报金额',
                        placeholder:'点击输入拟上报金额',
                        value:''
                    },{
                        class:"select-wrapper",
                        text:'拟签约时间',
                        value:'',
                        options:[]
                    },{
                        class:'input-wrapper',
                        text:'费率',
                        placeholder:'点击输入费率',
                        value:''
                    },{
                        class:"select-wrapper",
                        text:'客户还款方式',
                        value:'',
                        options:['按月等额本息','按月等额本金','按月付息']
                    },{
                        class:"select-wrapper",
                        text:'客户用途',
                        value:'',
                        options:['客户自己提供','我公司提供']
                    },{
                        class:"input-wrapper",
                        text:'调查意见',
                        placeholder:'',
                        value:''
                    }
                ]
            }]
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  components:{
      formList,
      pop,
      vHeader
  },
  methods:{
      back(){
          this.$router.back()
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          this.$refs.formList.choosed(option)
      },
      submit(){

      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .interview-detail
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        overflow hidden
        background #fff
</style>


