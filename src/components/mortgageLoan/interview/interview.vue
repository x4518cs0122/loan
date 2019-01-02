<template>
  <div class="interview">
        <v-header @goback="goback" title="抵押面谈列表" back="主页"></v-header>
        <detail-list :list="list" @itemHandle="itemHandle" state="待填写面谈建议" :loading="loading" @loadmore="loadmore" :hasmore="hasmore"></detail-list>
        <router-view></router-view>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list'
import {getInterview} from 'api/api'
import vHeader from 'components/header/header'
import {mapMutations} from 'vuex'
export default {
  data(){
      return{
          list:[],
          detail:false,
          loading:false,
          hasmore:false,
          page:0,
          needUpdate:this.$route.params.needUpdate || false
      }
  },
  created() {
      this._getInterview()  
  },
  methods:{
      _getInterview(){
          getInterview(this.page).then((res)=>{
            this.list = res.data
          })
      },
      goback(){
          this.$router.push({path:'/bussiness'})
      },
      itemHandle(index){
          let id = this.list[index].id
          let customer = this.list[index]
          this.$router.push({path:`/interview/${id}`})
          this.setCustomer(customer)
      },
      loadmore() {
          this.loading = true
          this.page = this.page + 1
          getInterview(this.page).then(res =>{
              this.list = this.list.concat(res.data)
              this.loading = false
          })
      },
      ...mapMutations({
          setCustomer:'SET_CUSTOMER'
      })
  },
  components: {
      detailList,
      vHeader,
  },
  watch:{
    $route(to, from) {
      let isChildrenRouter = /^\/interview\/.+$/.test(from.path);
      isChildrenRouter && this._getInterview();
    },
  }
}
</script>
<style lang="stylus" scoped>

</style>


