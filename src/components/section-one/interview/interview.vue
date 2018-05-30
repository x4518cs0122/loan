<template>
  <div class="interview">
        <v-header @back="back" title="抵押面谈列表"></v-header>
        <div class="list-wrapper">
            <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        </div>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list'
import {getInterview} from 'api/api'
import vHeader from 'base/header/header'
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
    //   console.log(getToken())    
  },
  methods:{
      _getInterview(){
          getInterview().then((res)=>{
            this.list = res.data
          })
      },
      back(){
          console.log('22')
          this.$router.back()
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
        background #fff
        overflow hidden
        .list-wrapper
            position fixed 
            top 50px
            bottom 0
            left 0
            right 0
            overflow hidden
</style>


