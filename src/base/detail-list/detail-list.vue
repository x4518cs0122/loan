<template>
  <Scroll class="detail-list" :data="list">
      <ul>
          <li class="list-item" v-for="(item,index) in list" :key="index" @click="itemHandle(index)">
              <div class="state-wrapper">
                  <span class="id">{{index+1}}.</span>
                  <span class="state">{{item.state}}</span>
                  <span class="state" v-if="item.substate">{{item.substate}}</span>
              </div>
              <div class="info">
                  <span class="name">客户:{{item.name}}</span>
                  <span class="phone">联系方式:{{item.phone}}</span>
              </div>
          </li>
      </ul>
  </Scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
export default {
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
    methods:{
        itemHandle(index){
            this.$emit('itemHandle',index)
        }
    },
    components:{
        Scroll
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .detail-list
        position relative
        height 100%
        width 100%
        overflow hidden
        .list-item
            padding 20px 30px
            border-bottom 2px solid $color-border  
            .state-wrapper  
                font-size $font-size-medium    
                color $color-text-l    
                margin-bottom 10px
                .id
                    margin-right 5px
                .state
                    margin-right 5px
            .info
                font-size $font-size-small
                color $color-text-ll

            

</style>


