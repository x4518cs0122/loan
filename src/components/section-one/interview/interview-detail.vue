<template>
  <div class="interview-detail">
      <div class="info">
          <div class="normal-wrapper">
              <span class="text">贷款编号</span>
              <span class="val">{{customer.id}}</span>
          </div>
          <div class="normal-wrapper">
              <span class="text">客户姓名</span>
              <span class="val">{{customer.name}}</span>
          </div>
          <div class="normal-wrapper">
              <span class="text">联系方式</span>
              <span class="val">{{customer.phone}}</span>
          </div>
          <div class="normal-wrapper">
              <span class="text">借款品种</span>
              <span class="val"></span>
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
      <router-view></router-view>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          next:'提交'     
      }
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  methods:{
      back(){
          this.$router.back()
      },
      editForm(form){
          this.$router.push({path:`/interview/${this.customer.id}/sqForms`})
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
    .interview-detail
        position fixed
        top 52px
        bottom 0
        left 0
        right 0
        overflow hidden
        background #fff
        .info
            margin-bottom 20px
            .normal-wrapper
                normal-wrapper()
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


