<template>
  <div class="interview">
        <v-header @goback="goback" title="抵押面谈列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle" state="待填写面谈建议"></detail-list>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list'
import {getInterview} from 'api/api'
import vHeader from 'components/header/header'
import {mapMutations} from 'vuex'
import {getToken} from 'common/js/utils'
export default {
  data(){
      return{
          list:[],
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
      goback(){
          this.$router.push({path:'/bussiness'})
      },
      itemHandle(index){
          let id = this.list[index].taskId
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
      vHeader,
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
        background $pure-white
        overflow hidden
        .list-wrapper
            position fixed 
            top 50px
            bottom 0
            left 0
            right 0
            overflow hidden
</style>


