<template>
  <div class="interview-detail">
      <form-list :list="list" @pop="pop" ref="formList"></form-list>
      <pop :options="options" ref="pop" @choosed="choosed"></pop>
      <router-view></router-view>
  </div>
</template>
<script>
import formList from 'components/form-list/form-list'
import pop from 'base/pop-up/pop-up'
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          next:'提交',
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
      pop
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
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
    .interview-detail
        position fixed
        top 52px
        bottom 0
        left 0
        right 0
        overflow hidden
        background #fff
        .info
            margin-bottom 20px
            .normal-wrapper
                normal-wrapper()
        .table-wrapper
            border-top 1px solid $color-border
            .table
                display flex
                height 20px
                line-height 20px
                padding 10px 20px
                font-size $font-size-medium
                border-bottom 1px solid $color-border
                .text
                    flex 1
                .icon 
                    flex 0 0 100px
                    color $color-theme
                    text-align right
                    .fa
                        color $color-icon-right

</style>


