<template>
    <div class="branch">
        <v-header :title="title" :next="next" @back="back" @submit="submit"></v-header>
        <div class="select-wrapper" @click="pop">
            <span class="text">环节状态</span>
            <span class="desc">{{status}}</span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
export default {
  data(){
    return{
      title:'分行审批',
      next:'提交',
      status:'',
      options:['已通过','未通过,再次审批','失败']
    }
  },
  methods:{
    back(){
      this.$router.back()
    },
    pop(){
      this.$refs.pop.show()
    },
    choosed(item){
      this.status = item
    },
    submit(){
      console.log("status:"+this.status)
      this.$router.back()
    }
  },
  components:{
    vHeader,
    pop
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.branch
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .select-wrapper
        select-wrapper()
</style>
