<template>
    <div class="confirm-state">
        <v-header :next="next" :title="title" @submit="submit" @back="back"></v-header>
        <ul>
            <li v-for="(item,index) in items" :key="item.name" >
                <div :class="item.class" v-if="item.class === 'normal-wrapper'">
                    <span class="text">{{item.text}}</span>
                    <span class="val">{{item.val}}</span>
                </div>
                <div :class="item.class" v-else @click="pop(index)">
                    <span class="text">{{item.text}}</span>
                    <span class="desc" :id="item.id">{{item.val}}</span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
            </li>
        </ul>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
export default {
  data(){
      return{
          next:'提交',
          title:'确定签约状态',
          items:[{
              class:'normal-wrapper',
              text:'约定时间',
              val:'',
          },{
              class:'normal-wrapper',
              text:'约定地点',
              val:'',
          },{
              class:'select-wrapper',
              text:'签约状态',
              val:'',
              id:'state'
          }],
          options:['已完成','未完成'],
          currentIndex:-1
      }
  },
  methods:{
      pop(index){
          this.$refs.pop.show()
          this.currentIndex = index
      },
      choosed(item){
          this.items[this.currentIndex].val = item
      },
      back(){
          this.$router.back()
      },
      submit(){
          console.log("done!")
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
.confirm-state
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .normal-wrapper
        normal-wrapper()
    .select-wrapper
        select-wrapper()
</style>
