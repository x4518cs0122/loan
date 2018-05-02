<template>
    <Scroll class="form-list">
        <ul>
            <li v-for="(items,index) in list" :key="index">
                <h2 class="title" v-if="items.title">{{items.title}}</h2>
                <ul>
                    <li v-for="(item,index) in items.items" :key="index">
                        <div v-if="item.class==='select-wrapper'" :class="item.class" @click="pop(item)">
                            <span class="text">{{item.text}}</span>
                            <span class="desc">{{item.value}}</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div v-if="item.class==='input-wrapper'" :class="item.class" >
                            <label class="text" for="name">{{item.text}}</label>
                            <input  type="text" 
                                :placeholder="item.placeholder" 
                                id="name" 
                                v-model="item.value">
                        </div>
                        <div :class="item.class" v-if="item.class === 'normal-wrapper'">
                            <span class="text">{{item.text}}</span>
                            <span class="val">{{item.val}}</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </Scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {selectType} from 'common/js/config'
export default {
  props:{
      list:{
          type:Array,
          default:()=>{
              return[]
          }
      }
  },
  data(){
      return{
          currentItem:{}
      }
  },
  methods:{
      pop(item){
          if(item.type === selectType.estate){
            this.$emit('estate')          
          }else{
            this.currentItem = item
            this.$emit('pop',item.options)
          }
          
      },
      choosed(option){
          this.currentItem.value = option
      }
  },
  components:{
      Scroll
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.form-list
    position fixed 
    width 100%
    top 52px
    bottom 0
    left 0
    overflow hidden
    .title
        title()
    .select-wrapper
        select-wrapper()
    .input-wrapper
        input-wrapper()
    .normal-wrapper
        normal-wrapper()
</style>
