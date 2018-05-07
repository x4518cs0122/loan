<template>
    <div class="collapse">
        <el-collapse accordion>
            <el-collapse-item v-for="(item,index) in list" :key="index" class="item">
                <template slot="title" >
                    <span @click.stop>
                        <el-checkbox v-model="item.checked" class="color-grey">{{item.name}}</el-checkbox>
                    </span>
                    <i class="header-icon el-icon-info"></i>
                </template>
                <div class="detail">
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
</template>
<script>
export default {
  props:{
      list:{
          type:Array,
          default:()=>{
              return []
          }
      }
  }
}
</script>
<style lang="stylus" scoped>
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
