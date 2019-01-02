<template>
    <div class="confirm-state">
        <v-header next="提交" title="确定面签状态" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="面签地点" valueType="0" model="address" @selected="selected"></rs-select></li>
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
import {postSHVisa} from 'api/api'
export default {
  data(){
      return{
          obj:{
              visaId:null,
              time:null,
              address:null
          }
      }
  },
  methods:{
      goback(){
        this.$router.push({path:'/sign'})
      },
      selected(id, model) {
        if(model === 'time'){
            this.obj[model] = new Date(id).getTime()
            return 
        }
        this.obj[model] = parseInt(id)
      },
      submit(){
        postSHVisa(this.customer.id, this.obj.time, this.obj.address).then((res)=>{
            if(res.result){
                this.$router.push({path:'/erSign'})
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
