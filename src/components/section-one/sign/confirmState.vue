<template>
    <div class="confirm-state">
        <v-header next="提交" title="确定签约状态" @submit="submit" @back="back"></v-header>
        <form-list :list="list" @pop="pop" ref="formList" :obj="obj" @choosed="choosed" @datePick="datePickerShow"></form-list>  
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
        <date-picker ref="datePicker" @submit="choosed"></date-picker>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import {mapMutations} from 'vuex'
import formList from 'components/form-list/form-list'
import datePicker from 'base/datePicker/datePicker'
import {selectType} from 'common/js/config'
import {postVisa} from 'api/api'
export default {
  data(){
      return{
          list:[{
              title:'',
              items:[{
                class:'normal-wrapper',
                text:'贷款编号',
                value:'',
            },{
                class:'normal-wrapper',
                text:'完成时间',
                key:'time',
                type:selectType.datePick,
                value:'',
            },{
                class:'select-wrapper',
                text:'签约地点',
                key:'address',
                value:'',
                options:['管理添加1','管理添加2']
            }]
          }],
          obj:{
              time:null,
              address:null
          },
          options:[],
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
      datePickerShow(){
          this.$refs.datePicker.toggleList()
      },
      submit(){
          this.obj.taskId = this.customer.taskId
          console.log(this.obj)
        //   postVisa(this.obj).then((res)=>{
        //       console.log(res)
        //   })
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  components:{
      vHeader,
      pop,
      formList,
      datePicker
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
