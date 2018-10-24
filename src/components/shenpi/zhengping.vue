<template>
    <div class="zhengping">
        <!-- <v-header :title="title" @submit="submit" :next="next"></v-header> -->
        <form-list :list="infos" @pop="pop" ref="formList" choosed="choosed"></form-list> 
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import Scroll from 'base/scroll/scroll'
import formList from 'components/form-list/form-list'
export default {
  data(){
    return{
      title:'出正评',
      next:'提交',
      infos:[
        {
          items:[{
                class:'select-wrapper',
                text:'正评状态',
                value:'',
                options:['已出','未出,继续提醒']
            },{
                class:'select-wrapper',
                text:'出正评日期',
                value:'选择出报告日期',
            }]
        },{
            title:'报告内容',
            items:[
                {
                    class:'input-wrapper',
                    text:'权利人',
                    placeholder:'点击输入权利人',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'借款人',
                    placeholder:'点击输入借款人',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'坐落',
                    placeholder:'点击输入坐落',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'房龄',
                    placeholder:'点击输入房龄',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'面积',
                    placeholder:'点击输入面积',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'单价',
                    placeholder:'点击输入单价',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'总价',
                    placeholder:'点击输入总价',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'贷款金额',
                    placeholder:'点击输入贷款金额',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'年限',
                    placeholder:'点击输入年限',
                    value:''
                },{
                    class:'select-wrapper',
                    text:'首套/两套',
                    value:'',
                    options:['首套','两套']
                }
            ]
        }
      ],
      currentItem:{},
      options:[]
    }
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
      console.log("status:"+this.status)
      this.$router.back()
    }
  },
  components:{
    vHeader,
    pop,
    Scroll,
    formList
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
    .zhengping
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        background $color-background
        .scroll
            position fixed
            top 52px
            bottom 0
            left 0
            right 0
            overflow hidden
            .select-wrapper
                select-wrapper()
            .input-wrapper
                input-wrapper()
            .title
                title()
</style>
