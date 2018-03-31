<template>
  <div class="interview-detail">
      <app-title :title="title" :next="next" @back="back"></app-title>
      <div class="info">
          <div class="number-wrapper">
              <span class="number">贷款编号</span>
              <span class="text"></span>
          </div>
          <div class="name-wrapper">
              <span class="name">客户姓名</span>
              <span class="text"></span>
          </div>
          <div class="phone-wrapper">
              <span class="phone">联系方式</span>
              <span class="text"></span>
          </div>
          <div class="type-wrapper">
              <span class="type">借款品种</span>
              <span class="text"></span>
          </div>
      </div>
      <div class="table-wrapper">
          <div class="table" @click="editForm(1)">
                <span class="text">资料目录表</span>
                <span class="icon">
                    点击编辑
                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                </span>         
          </div>
          <div class="table" @click="editForm(2)">
                <span class="text">个人贷款申请表</span>
                <span class="icon">
                    点击编辑
                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                </span>         
          </div>
          <div class="table" @click="editForm(3)">
                <span class="text">面谈建议</span>
                <span class="icon">
                    点击编辑
                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                </span>         
          </div>
      </div>
    
  </div>
</template>
<script>
import appTitle from 'base/header/header'
export default {
  data(){
      return{
          title:'抵押面谈',
          next:'提交'
      }
  },
  components: {
      appTitle
  },
  methods:{
      back(){
          this.$emit('hiddenDetail')
      },
      editForm(form){
          this.$emit('showForm',form)
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
    .interview-detail
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        overflow hidden
        background #fff
        .info
            margin-bottom 20px
            .number-wrapper,.name-wrapper,.phone-wrapper,.type-wrapper
                display flex
                height 20px
                line-height 20px
                padding 15px 20px
                font-size $font-size-medium
                border-bottom 1px solid $color-border
                .number,.name,.phone,.type
                    flex 0 0 100px
                .text
                    flex 1
        .table-wrapper
            border-top 1px solid $color-border
            .table
                display flex
                height 20px
                line-height 20px
                padding 10px 20px
                font-size $font-size-medium
                border-bottom 1px solid $color-border
                .text
                    flex 1
                .icon 
                    flex 0 0 100px
                    color $color-theme
                    text-align right
                    .fa
                        color $color-icon-right

</style>


