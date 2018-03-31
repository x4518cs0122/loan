<template>
  <div class="application">
        <app-title title="个人贷款申请表" :next="nextTxt" @back="back" @submit="next"></app-title>
        <Scroll class="item-wrapper">
            <user-info v-show="currentIndex === 1"></user-info>
            <partner-info v-show="currentIndex === 2"></partner-info>
            <job-info v-show="currentIndex === 3"></job-info>
            <loan-info v-show="currentIndex === 4"></loan-info>
            <emergency-contact v-show="currentIndex === 5"></emergency-contact>
        </Scroll>
  </div>
</template>
<script>
import appTitle from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import userInfo from 'components/section-one/application/user-info/user-info'
import partnerInfo from 'components/section-one/application/partner-info/partner-info'
import jobInfo from 'components/section-one/application/job-info/job-info'
import loanInfo from 'components/section-one/application/loan-info/loan-info'
import emergencyContact from 'components/section-one/application/emergency-contact/emergency-contact'
export default {
  data(){
      return{
          currentIndex:1,
          nextTxt:'下一页'
      }
  },
  components:{
      appTitle,
      Scroll,
      userInfo,
      partnerInfo,
      jobInfo,
      loanInfo,
      emergencyContact
  },
  methods:{
      back(){
          this.currentIndex>1? this.currentIndex--:this.$emit('goBack')
          
      },
      next(){
          if(this.currentIndex === 5){
              this.submit()
          }else{
              this.currentIndex +=1
          }    
      },
      submit(){
          console.log('提交成功')
      }
  },
  watch: {
    currentIndex(newIndex){
        if(newIndex === 5){
            this.nextTxt = '保存'
        }else{
            this.nextTxt = '下一页'
        }
    } 
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .application
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background #ffffff
        overflow hidden
        .item-wrapper
            position fixed
            top 52px
            bottom 0
            left 0
            right 0
            overflow hidden
                    
</style>


