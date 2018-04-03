<template>
  <div class="interview">
        <app-title title="抵押面谈列表" @back="back"></app-title>
        <Scroll :data="interview" class="detail-wrapper">
            <div>
                <detail-list :list="interview" @itemHandle="itemHandle"></detail-list>
            </div>
        </Scroll>
        <interview-detail v-show="detail" @hiddenDetail="hiddenDetail" @showForm="showForm"></interview-detail>
        <application v-if="application" @goBack="hiddenForm"></application>
  </div>
</template>
<script>
import detailList from 'base/detail-list/detail-list'
import {getInterview} from 'api/interview'
import {ERR_OK} from 'api/config'
import appTitle from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import application from 'components/section-one/application/application'
import interviewDetail from 'components/section-one/interview-detail/interview-detail'
export default {
  data(){
      return{
          interview:[],
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
              if(res.errno == ERR_OK){
                  this.interview = res.data
              }
          })
      },
      back(){
          this.$router.back()
      },
      itemHandle(){
          this.detail = true
      },
      hiddenDetail(){
          this.detail = false
      },
      hiddenForm(){
          this.application = false
      },
      showForm(form){
          if(form === 2){
              this.application = true             
          }else{
              return
          }
      }
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
        .detail-wrapper
            position fixed
            top 52px
            bottom 0
            left 0
            right 0
            overflow hidden
</style>


