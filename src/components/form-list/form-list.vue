<template>
    <Scroll class="form-list" :data="list">
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
                            <span class="tips" v-if="item.tips">{{item.tips}}</span>
                        </div>
                        <div :class="item.class" v-if="item.class === 'normal-wrapper'">
                            <span class="text">{{item.text}}</span>
                            <span class="val">{{item.val}}</span>
                        </div>
                        <div class="collapse" v-if="item.class==='collapse-wrapper'">
                            <el-collapse accordion>
                                <el-collapse-item class="item">
                                    <template slot="title" >
                                        <span @click.stop>
                                            <el-checkbox v-model="item.checked" class="color-grey">{{item.name}}</el-checkbox>
                                        </span>
                                        <i class="header-icon el-icon-info"></i>
                                    </template>
                                    <div class="detail" v-if="item.options">
                                        <h2 class="detail-title">{{item.name}}明细</h2>
                                        <div class="sm">   
                                            <el-checkbox-group v-model="item.checkList">
                                                <span class="text">说明：</span>
                                                <el-checkbox v-for="(option,index) in item.options" :key="index" :label="option">{{option}}</el-checkbox>              
                                            </el-checkbox-group>
                                        </div>
                                        <div class="page-wrapper">
                                            <span class="text">页码:</span>
                                            <input type="text" placeholder="请输入页码" v-model="item.page">
                                        </div>
                                        <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input> -->
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="botton" v-if="botton">
            
        </div>
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
      },
      botton:{
          type:String,
          default:''
      }
  },
  data(){
      return{
          currentItem:{}
      }
  },
  methods:{
      pop(item){
          this.currentItem = item
          if(item.type === selectType.estate){
            this.$emit('estate')          
          }else if(item.type && item.type === selectType.datePick){
            this.$emit('datePick')
          }else{
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
    .item
        .color-grey
            color #000
            padding-left 20px
        .detail
            color #606266
            margin-left 40px
            .sm
                margin 5px 0
                .text
                    font-size 14px
            .page-wrapper
                display flex
                .text
                    flex 0 0 40px
                input 
                    flex 1
                    outline none 
                    border-bottom 1px solid rgba(144,144,144,0.3)
</style>
