<template>
    <div class="confirm-state">
        <v-header next="提交" title="确定面签状态" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="面签地点" :options="options.place" model="address" @selected="selected"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsSelect from 'base/rsselect/rsselect'
import {mapGetters} from 'vuex'
import {postVisa} from 'api/api'
export default {
  data(){
      return{
          obj:{
              time:null,
              address:null
          },
          options:{
              place:[{key:0, value:'管理自定1'}]
          }
      }
  },
  methods:{
      goback(){
          this.$router.push({path:'/sign'})
      },
      selected(key, model) {
          this.obj[model] = key
      },
      submit(){
          if(!this.validate){          
              return 
          }
          this.obj.taskId = this.customer.taskId
          postVisa(this.obj).then((res)=>{
              if(res.status === 1){
                  this.$router.push({path:'/sign'})
              }
          })
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ]),
      validate(){
          return this.obj.time != null && this.obj.address !=null
      },
  },
  components:{
      vHeader,
      rsSelect,
      rsList,
      rsText
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
    overflow auto
    background $color-background
</style>
