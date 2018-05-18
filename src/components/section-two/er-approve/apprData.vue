<template>
    <div class="jy-mulu">
        <formList :list="list" ref="choosed" @pop="pop"></formList>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>
<script>
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          options:[],
          list:[{
              title:'',
              items:[
                  {
                      class:"select-wrapper",
                      text:'完成日期',
                      value:'',
                      options:[]
                  },{
                      class:"normal-wrapper",
                      text:'资料收集情况',
                      value:'已完成',
                  }
              ]
            },{
              title:'资料明细',
              items:[
                  {
                    class:'collapse-wrapper',
                    name:'客户情况登记明细表',
                    checked:false,
                    checkList:[],
                    page:'',
                  },{
                    class:'collapse-wrapper',
                    name:'买卖双方身份证',
                    checked:false,
                    options:['原件','复印件'],
                    checkList:[],
                    page:'',
                  },{
                    class:'collapse-wrapper',
                    name:'买卖双方户口',
                    checked:false,
                    options:['原件','复印件','首页','户主页','本人页'],
                    checkList:[],
                    page:'',
                  },{
                    class:'collapse-wrapper',
                    name:'婚姻证明',
                    checked:false,
                    options:['原件','复印件','结婚证','离婚证','离婚协议'],
                    checkList:[],
                    page:'',
                  },{
                    class:'collapse-wrapper',
                    name:'抵押物房产两证',
                    checked:false,
                    options:['原件','复印件'],
                    checkList:[],
                    page:'',
                  },{
                    class:'collapse-wrapper',
                    name:'首付款收据',
                    checked:false,
                    options:['原件','复印件'],
                    checkList:[],
                    page:'',
                  },{
                    class:'collapse-wrapper',
                    name:'银行卡复印件',
                    checked:false,
                    options:['原件','复印件','房产证','车产证','其他资产'],
                    checkList:[],
                    page:'',
                 },{
                    class:'collapse-wrapper',
                    name:'收入证明',
                    checked:false,
                    options:['原件','复印件','房产证','车产证','其他资产'],
                    checkList:[],
                    page:'',
                 },{
                    class:'collapse-wrapper',
                    name:'银行流水(近6个月)',
                    checked:false,
                    options:['原件','复印件','房产证','车产证','其他资产'],
                    checkList:[],
                    page:'',
                 },{
                    class:'collapse-wrapper',
                    name:'其他',
                    checked:false,
                    options:['原件','复印件'],
                    checkList:[],
                    page:'',
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
  methods:{
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          this.$refs.formList.choosed(option)
      },
  },
  components:{
      formList,
      pop
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.jy-mulu
    position fixed 
    top 52px
    bottom 0
    left 0
    right 0
    background $color-background
    
</style>
