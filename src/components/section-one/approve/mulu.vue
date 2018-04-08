<template>
    <div class="jy-mulu">
        <v-header :title="title" @back="back" :next="next"></v-header>
        <Scroll class="scroll">
            <div>
                <div class="select-wrapper"> 
                    <span class="text">完成日期</span>
                    <span class="desc" id="sex">选择完成时间</span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="normal-wrapper">
                    <span class="text">资料收集情况</span>
                    <span class="val">已收齐</span>
                </div>
                <h2 class="title">资料明细</h2>
                <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in items" :key="index" class="item">
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
        </Scroll>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
export default {
  data(){
      return{
          title:'资料目录表',
          next:'提交',
          jyList:[
              {
                  name:'借款人身份证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'借款人户口',
                  checked:false,
                  options:['原件','复印件','首页','户主页','本人页'],
                  checkList:[],
                  page:'',
              },{
                  name:'借款人配偶身份证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'借款人配偶户口',
                  checked:false,
                  options:['原件','复印件','首页','户主页','本人页'],
                  checkList:[],
                  page:'',
              },{
                  name:'婚姻证明',
                  checked:false,
                  options:['原件','复印件','结婚证','离婚证','离婚协议'],
                  checkList:[],
                  page:'',
              },{
                  name:'抵押物房产两证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'资产证明复印件',
                  checked:false,
                  options:['原件','复印件','房产证','车产证','其他资产'],
                  checkList:[],
                  page:'',
              },{
                  name:'收入证明',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'营业执照（三证合一）',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'企业法定代表人身份证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'公司章程',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'经营地租赁合同或产权证明',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'贸易合同',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'用途合同',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'其他',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              }
          ],
          xfList:[
              {
                  name:'借款人身份证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'借款人户口',
                  checked:false,
                  options:['原件','复印件','首页','户主页','本人页'],
                  checkList:[],
                  page:'',
              },{
                  name:'借款人配偶身份证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'借款人配偶户口',
                  checked:false,
                  options:['原件','复印件','首页','户主页','本人页'],
                  checkList:[],
                  page:'',
              },{
                  name:'婚姻证明',
                  checked:false,
                  options:['原件','复印件','结婚证','离婚证','离婚协议'],
                  checkList:[],
                  page:'',
              },{
                  name:'抵押物房产两证',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'资产证明复印件',
                  checked:false,
                  options:['原件','复印件','房产证','车产证','其他资产'],
                  checkList:[],
                  page:'',
              },{
                  name:'收入证明',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'用途合同',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              },{
                  name:'其他',
                  checked:false,
                  options:['原件','复印件'],
                  checkList:[],
                  page:'',
              }
          ],
          items:[]
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
      init(){
          if(this.customer.id %2 === 1){
              this.items = this.jyList
          }else{
              this.items = this.xfList
          }
      }
  },
  mounted(){
      this.init()
  },
  components:{
      vHeader,
      Scroll
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.jy-mulu
    position absolute 
    top 0
    bottom 0
    left 0
    right 0
    background $color-background
    .scroll
        position fixed 
        top 52px
        bottom 0
        left 0
        right 0
        overflow hidden
    .select-wrapper
        select-wrapper()
    .normal-wrapper
        normal-wrapper()
    .title
        title()
    .item
        // padding 0 20px
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
