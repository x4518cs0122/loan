<template>
    <div class="branch">
      <v-header title="报审" next="提交" @goback="goback" @submit="submit"></v-header>
      <rs-list>
          <ul slot="body">
            <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
            <li><rs-select selectText="上报审批时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
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
import {baoshen} from 'api/api'
export default {
  data(){
    return{
      obj:{
        time:''
      }
    }
  },
  methods:{
    goback(){
      this.$router.push({path:`/approve/${this.customer.taskId}`})
    },
    selected(key, model) {
        this.obj[model] = key
    },
    submit(){
      baoshen(this.obj.time, this.customer.taskId).then((res) =>{
        if(res.status === 1){
          this.goback()
        }else{
          // handler error message
        }
      })
      
    }
  },
  components:{
    vHeader,
    rsList,
    rsText,
    rsSelect
  },
  computed:{
    ...mapGetters([
      'customer'
    ])
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.branch
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow auto
    background $color-background
</style>
