<template>
  <div class="interview-detail">
      <!-- <app-title :title="title" :next="next" @back="back"></app-title> -->
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
      <ul class="table-wrapper" @click="editForm($event)">
          <li class="select-wrapper" v-for="(item,index) in formlist" :key="index" :data-index="index"> 
              <span class="text">{{item}}</span>
              <span class="desc" id="sex">点击编辑</span>
              <span class="icon">
                  <span class="fa fa-chevron-right" aria-hidden="true"></span>
              </span>
          </li>
      </ul>
      <router-view></router-view>
  </div>
</template>
<script>
import appTitle from 'base/header/header'
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          next:'提交',
          formlist:['资料目录表','支行审批','分行审批','出正评']  
      }
  },
  components: {
      appTitle
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
      editForm(e){
          let target = e.target    
          while(target.nodeName.toLowerCase() != 'li'){
              target = target.parentNode
          }    
          let formIndex = target.getAttribute("data-index")
          switch (parseInt(formIndex)){
              case 0:
                this.$router.push({path:`/approve/${this.customer.id}/mulu`})
                break
              case 1:
                this.$router.push({path:`/approve/${this.customer.id}/subbranch`})
                break
              case 2:
                this.$router.push({path:`/approve/${this.customer.id}/branch`})
                break
              case 3:
                this.$router.push({path:`/approve/${this.customer.id}/zhengping`})
                break
              default:
                console.log('nothing!')
                break
          }

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
            .select-wrapper
                select-wrapper()

</style>


