<template>
  <div class="interview">
        <app-title title="抵押面谈列表" @back="back"></app-title>
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
        <!-- <interview-detail v-show="detail" @hiddenDetail="hiddenDetail" @showForm="showForm"></interview-detail>
        <application v-if="application" @goBack="hiddenForm"></application> -->
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list'
import {getInterview} from 'api/api'
import {ERR_OK} from 'api/config'
import appTitle from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import application from 'components/section-one/application/application'
import interviewDetail from 'components/section-one/interview/interview-detail'
import {mapMutations} from 'vuex'
export default {
  data(){
      return{
          list:[],
          application:false,
          detail:false
      }
  },
  created() {
      this._getInterview()
  },
  methods:{
      _getInterview(){
          getInterview().then((res)=>{
            this.list = res.data
          })
      },
      back(){
          this.$router.back()
      },
      itemHandle(index){
          let id = this.list[index].id
          let customer = this.list[index]
          this.$router.push({path:`/interview/${id}`})
          this.setCustomer(customer)
      },
      ...mapMutations({
          setCustomer:'SET_CUSTOMER'
      })
  },
  components: {
      detailList,
      appTitle,
      Scroll,
      application,
      interviewDetail
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .interview
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background #fff
        overflow hidden
</style>


