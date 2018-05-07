<template>
  <transition name="fade">
    <div class="er-order">
        <v-header @back="back" @submit="next" :next="nextTxt"></v-header>
        <!-- 接单第一页 --> 
        <form-list :list="list1" @pop="pop" ref="formList1" v-if="currentIndex === 1"></form-list>
        <form-list :list="list2" @pop="pop" ref="formList2" v-if="currentIndex === 2"></form-list>
        <form-list :list="list3" @pop="pop" ref="formList3" v-if="currentIndex === 3"></form-list>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
  </transition>
</template>
<script>
import vHeader from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
import {selectType} from 'common/js/config'
export default {
  data(){
      return{
          nextTxt:'下一页',
          currentIndex:1,
          list1:[{
                title:'',
                items:[{
                  class:'select-wrapper',
                  text:'完成日期',
                  value:'',
                  options:[]
                }]
            },{
                title:'借款人基本情况',
                items:[{
                    class:'input-wrapper',
                    text:'客户姓名',
                    placeholder:'点击输入客户姓名',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'联系方式',
                    placeholder:'点击输入联系方式',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'工作单位',
                    placeholder:'点击输入工作单位',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'单位电话',
                    placeholder:'点击输入单位电话',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'月均收入',
                    placeholder:'点击输入月均收入',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'联系地址',
                    placeholder:'点击输入联系地址',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'户口所在',
                    placeholder:'点击输入户口所在',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'证件名称',
                    placeholder:'点击输入证件名称',
                    value:''
                },{
                    class:'input-wrapper',
                    text:'证件号码',
                    placeholder:'点击输入证件号码',
                    value:''
                }]
            },{      
              title:'配偶信息',
              items:[{
                  class:'input-wrapper',
                  text:'配偶姓名',
                  value:'',
                  placeholder:'点击输入配偶姓名'
              },{
                  class:'input-wrapper',
                  text:'联系方式',
                  value:'',
                  placeholder:'点击输入联系方式'
              },{
                  class:'input-wrapper',
                  text:'单位电话',
                  value:'',
                  placeholder:'点击输入单位电话'
              },{
                  class:'input-wrapper',
                  text:'证件名称',
                  placeholder:'点击输入证件名称',
                  value:''
              },{
                  class:'input-wrapper',
                  text:'证件号码',
                  placeholder:'点击输入证件号码',
                  value:''
              }]
            }
          ],
          list2:[{
              title:'产权人基本信息',
              items:[
                {
                  class:'input-wrapper',
                  text:'客户姓名',
                  placeholder:'点击输入客户姓名',
                  value:''
                },{
                  class:'input-wrapper',
                  text:'联系方式',
                  placeholder:'点击输入联系方式',
                  value:''
                },{
                  class:'input-wrapper',
                  text:'身份证号',
                  placeholder:'点击输入对应的身份证号',
                  value:''
                },{
                    class:'input-wrapper',
                    text:'配偶姓名',
                    value:'',
                    placeholder:'点击输入配偶姓名'
                },{
                    class:'input-wrapper',
                    text:'联系方式',
                    value:'',
                    placeholder:'点击输入联系方式'
                },{
                    class:'input-wrapper',
                    text:'身份证号',
                    value:'',
                    placeholder:'点击输入身份证号'
                }
              ]
              // items end
            },{
              title:'保证人基本信息',
              items:[
                {
                  class:'input-wrapper',
                  text:'姓名',
                  placeholder:'点击输入保证人姓名',
                  value:''
                },{
                  class:'input-wrapper',
                  text:'联系方式',
                  placeholder:'点击输入联系方式',
                  value:''
                },{
                  class:'input-wrapper',
                  text:'身份证号',
                  placeholder:'点击输入对应的身份证号',
                  value:''
                },{
                    class:'input-wrapper',
                    text:'工作单位',
                    value:'',
                    placeholder:'点击输入保证人工作单位'
                }
              ]
            },{
              title:'房屋基本情况',
              items:[
                {
                  class:'input-wrapper',
                  text:'房屋地址',
                  placeholder:'点击输入房屋地址',
                  value:''
                },{
                  class:'input-wrapper',
                  text:'房产证号',
                  placeholder:'点击输入联系方式',
                  value:''
                },{
                  class:'input-wrapper',
                  text:'土地证号',
                  placeholder:'点击输入对应的身份证号',
                  value:''
                },{
                    class:'input-wrapper',
                    text:'房屋所属区局',
                    value:'',
                    placeholder:'点击输入保证人工作单位'
                },{
                    class:'input-wrapper',
                    text:'建成年份',
                    value:'',
                    placeholder:'点击输入保证人工作单位'
                },{
                    class:'select-wrapper',
                    text:'房屋类型',
                    value:'',
                    options:['普通住宅','商铺','写字楼','别墅']
                },{
                    class:'input-wrapper',
                    text:'建筑面积',
                    value:'',
                    placeholder:'点击输入保证人工作单位'
                },{
                    class:'select-wrapper',
                    text:'土地属性',
                    value:'',
                    options:['划拨','出让']
                }
              ]
            }
          ],
          list3:[
            {
              title:'客户借款基本情况',
              items:[
                {
                  class:'input-wrapper',
                  text:'贷款银行',
                  value:'',
                  placeholder:'点击输入贷款银行'
                },{
                  class:'input-wrapper',
                  text:'评估公司',
                  value:'',
                  placeholder:'点击输入评估公司'
                },{
                  class:'input-wrapper',
                  text:'房屋成交价',
                  value:'',
                  tips:'万元',
                  placeholder:'点击输入房屋成交价格'
                },{
                  class:'input-wrapper',
                  text:'贷款金额',
                  value:'',
                  tips:'万元',
                  placeholder:'点击输入贷款金额'
                },{
                  class:'input-wrapper',
                  text:'评估值',
                  value:'',
                  tips:'万元',
                  placeholder:'点击输入评估值'
                },{
                  class:'input-wrapper',
                  text:'贷款年限',
                  value:'',
                  tips:'年',
                  placeholder:'点击输入贷款年限'
                },{
                  class:'input-wrapper',
                  text:'担保方式',
                  value:'',
                  placeholder:'点击输入担保方式'
                },{
                  class:'select-wrapper',
                  text:'还款方式',
                  value:'',
                  options:['等额本金','等额本息']
                },{
                  class:'select-wrapper',
                  text:'贷款类型',
                  value:'',
                  options:['普通按揭','组合','公积金','消费贷款']
                },{
                  class:'input-wrapper',
                  text:'首付款金额',
                  value:'',
                  placeholder:'点击输入首付款金额'
                },{
                  class:'input-wrapper',
                  text:'首付交付方式',
                  value:'',
                  placeholder:'点击输入首付款交付方式'
                },{
                  class:'select-wrapper',
                  text:'成交是否属实',
                  value:'',
                  options:['是','否']
                },{
                  class:'select-wrapper',
                  text:'客户情况属实',
                  value:'',
                  options:['是','否']
                },{
                  class:'select-wrapper',
                  text:'存折办理',
                  value:'',
                  options:['签约办理','签约后办理']
                },{
                  class:'input-wrapper',
                  text:'备注',
                  value:'',
                  placeholder:'点击输入备注事项'
                }
              ]
            }
          ],
          options:[],       
      }
  },
  created(){
      this._initData()
  },
  methods:{
      _initData(){
          this.list = this.list1
      },
      back(){
        if(this.currentIndex === 1){
            this.$router.back()
            return
        }else if(this.currentIndex === 3){
            this.nextTxt = '下一页'
        }
        this.currentIndex -=1
      },
      pop(option){
          this.options = option
          this.$refs.pop.show()
      },
      choosed(option){
          switch(this.currentIndex){
              case 1:
                this.$refs.formList1.choosed(option)
                break;
              case 2:
                this.$refs.formList2.choosed(option)
                break;
              case 3:
                this.$refs.formList3.choosed(option)
                break;
              default :
                return
          }
      },
      next(){
          if(this.currentIndex === 3){
              this.submit()
              return
          }else if(this.currentIndex === 2){
              this.nextTxt = '提交'
          }   
          this.currentIndex +=1
      },
      submit(){
        console.log('yes!')
      }
  },
  components: {
      vHeader,
      pop,
      formList
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.er-order
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background #fff
    overflow hidden
    &.fade-enter-active, &.fade-leave-active 
        transition: all .3s
    &.fade-enter, &.fade-leave-to 
        transform translate3d(100%,0,0)
</style>


