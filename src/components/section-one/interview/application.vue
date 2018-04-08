<template>
  <div class="application">
        <app-title title="个人贷款申请表" :next="nextTxt" @back="back" @submit="next"></app-title>  
         <!-- 个人信息 index = 1 -->   
        <div v-show="currentIndex === 1">
            <Scroll ref="scroll" class="scroll">
                <div>
                    <div class="select-wrapper">
                        <span class="text">申请日期</span>
                        <span class="desc">选择申请日期</span>
                        <span class="icon">
                            <span class="fa fa-chevron-right" aria-hidden="true"></span>
                        </span>
                    </div>
                    <ul>
                        <h2 class="title">申请人信息</h2>
                        <li v-for="(item,index) in userItems" :key="index" @click="pop($event,item)">
                            <div :class="item.class" v-if="item.class==='select-wrapper'"> 
                                <span class="text">{{item.text}}</span>
                                <span class="desc" id="sex">{{item.value}}</span>
                                <span class="icon">
                                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                                </span>
                            </div>
                            <div :class="item.class" v-else>
                                <span class="text">{{item.text}}</span>
                                <input type="text" :placeholder="item.placeholder" v-model="item.value">
                            </div>
                        </li>
                    </ul>   
                </div> 
            </Scroll>      
        </div>
         <!-- 配偶信息 index = 2 -->
        <div v-show="currentIndex === 2">
            <Scroll ref="scroll" class="scroll">
                <ul>
                    <h2 class="title">配偶信息</h2>
                    <li v-for="(item,index) in partnerInfo" :key="index" @click="pop($event,item)">
                        <div :class="item.class" v-if="item.class==='select-wrapper'"> 
                            <span class="text">{{item.text}}</span>
                            <span class="desc" id="sex">{{item.value}}</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div :class="item.class" v-else>
                            <span class="text">{{item.text}}</span>
                            <input type="text" :placeholder="item.placeholder" v-model="item.value">
                        </div>
                    </li>
                </ul>   
            </Scroll>      
        </div>
        <!-- 工作单位 index = 3 -->
        <div v-show="currentIndex === 3">
            <Scroll ref="scroll" class="scroll">
                <ul>
                    <h2 class="title">工作单位</h2>
                    <li v-for="(item,index) in jobInfo" :key="index" @click="pop($event,item)">
                        <div :class="item.class" v-if="item.class==='select-wrapper'"> 
                            <span class="text">{{item.text}}</span>
                            <span class="desc" id="sex">{{item.value}}</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div :class="item.class" v-else>
                            <span class="text">{{item.text}}</span>
                            <input type="text" :placeholder="item.placeholder" v-model="item.value">
                        </div>
                    </li>
                </ul>   
            </Scroll>      
        </div>
        <!-- 贷款信息 index = 4 -->
        <div v-show="currentIndex === 4">
            <Scroll ref="scroll" class="scroll">
                <ul>
                    <h2 class="title">申请借款信息</h2>
                    <li v-for="(item,index) in loanInfo" :key="index" @click="pop($event,item)">
                        <div :class="item.class" v-if="item.class==='select-wrapper'"> 
                            <span class="text">{{item.text}}</span>
                            <span class="desc" id="sex">{{item.value}}</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div :class="item.class" v-else>
                            <span class="text">{{item.text}}</span>
                            <input type="text" :placeholder="item.placeholder" v-model="item.value">
                            <span class="tips" v-show="item.tips">{{item.tips}}</span>
                        </div>
                    </li>
                </ul>   
            </Scroll>      
        </div>
        <!-- 紧急联系人信息 index = 5 -->
        <div v-show="currentIndex === 5">
            <Scroll ref="scroll" class="scroll">
                <ul>
                    <h2 class="title">申请借款信息</h2>
                    <li v-for="(item,index) in emergencyInfo" :key="index" @click="pop($event,item)">
                        <div :class="item.class" v-if="item.class==='select-wrapper'"> 
                            <span class="text">{{item.text}}</span>
                            <span class="desc" id="sex">{{item.value}}</span>
                            <span class="icon">
                                <span class="fa fa-chevron-right" aria-hidden="true"></span>
                            </span>
                        </div>
                        <div :class="item.class" v-else>
                            <span class="text">{{item.text}}</span>
                            <input type="text" :placeholder="item.placeholder" v-model="item.value">
                            <span class="tips" v-show="item.tips">{{item.tips}}</span>
                        </div>
                    </li>
                </ul>   
            </Scroll>      
        </div>
        <popUp :options="options" ref="pop" @choosed="choosed"></popUp>
  </div>
</template>
<script>
import appTitle from 'base/header/header'
import Scroll from 'base/scroll/scroll'
import popUp from 'base/pop-up/pop-up'
import { mapGetters } from 'vuex'
export default {
  data(){
      return{
          currentIndex:1,
          currentItem:{},
          nextTxt:'下一页',
          userItems:[
                {
                    class:'select-wrapper',
                    text:'性别',
                    value:'',
                    options:['男','女']
                },{
                    class:'select-wrapper',
                    text:'婚姻情况',
                    value:'',
                    options:['未婚','已婚','离异','丧偶']
                },{
                    class:'select-wrapper',
                    text:'家庭结构',
                    value:'',
                    options:['有子女都成年','有未成年子女','无子女']
                },{
                    class:'input-wrapper',
                    text:'联系方式',
                    value:'',
                    placeholder:'点击输入联系方式'
                },{
                    class:'select-wrapper',
                    text:'户籍',
                    value:'',
                    options:['本地户籍','非本地户籍']
                },{
                    class:'input-wrapper',
                    text:'身份证号',
                    value:'',
                    placeholder:'点击输入二代身份证号码'
                },{
                    class:'input-wrapper',
                    text:'居住状况',
                    value:'',
                    placeholder:'点击输入居住状况'
                },{
                    class:'input-wrapper',
                    text:'居住地址',
                    value:'',
                    placeholder:'点击输入居住地址'
                },{
                    class:'input-wrapper',
                    text:'居住年限',
                    value:'',
                    placeholder:'点击输入居住年限'
                },{
                    class:'select-wrapper',
                    text:'住房情况',
                    value:'',
                    options:['本地有房(无贷款)','本地有房(有贷款)','异地有住房(无贷款)','异地有住房(有贷款)','无自有住房']
                },{
                    class:'select-wrapper',
                    text:'就业性质',
                    value:'',
                    options:['授薪','自雇']
                },{
                    class:'input-wrapper',
                    text:'就业年限',
                    value:'',
                    placeholder:'现单位工作/企业成立'
                },{
                    class:'input-wrapper',
                    text:'月收入',
                    value:'',
                    placeholder:'个人收入/企业销售收入'
                }
            ],
          partnerInfo:[
                {
                    class:'input-wrapper',
                    text:'姓名',
                    value:'',
                    placeholder:'点击输入配偶姓名'
                },{
                    class:'input-wrapper',
                    text:'联系方式',
                    value:'',
                    placeholder:'点击输入联系方式'
                },{
                    class:'select-wrapper',
                    text:'证件类型',
                    value:'',
                    options:['身份证','临时身份证','户口簿','其他']
                },{
                    class:'select-wrapper',
                    text:'是否共同申请',
                    value:'',
                    options:['是','否']
                },
          ],
          jobInfo:[
                {
                    class:'input-wrapper',
                    text:'经营主体',
                    value:'',
                    placeholder:'点击输入经营主体'
                },{
                    class:'input-wrapper',
                    text:'办公地址',
                    value:'',
                    placeholder:'点击输入办公地址'
                },{
                    class:'select-wrapper',
                    text:'经营场所',
                    value:'',
                    options:['自有','租赁']
                },{
                    class:'input-wrapper',
                    text:'营业执照',
                    value:'',
                    placeholder:'点击输入营业执照'
                },{
                    class:'input-wrapper',
                    text:'贷款卡号',
                    value:'',
                    placeholder:'点击输入贷款卡号'
                }
          ],
          loanInfo:[
                {
                    class:'input-wrapper',
                    text:'申请金额',
                    value:'',
                    placeholder:'点击输入申请金额(元)',
                    tips:'元'
                },{
                    class:'input-wrapper',
                    text:'申请期限',
                    value:'',
                    placeholder:'点击输入申请期限(年)',
                    tips:'年'
                },{
                    class:'select-wrapper',
                    text:'申请授信方式',
                    value:'',
                    options:['抵押经营','抵押消费']
                },{
                    class:'input-wrapper',
                    text:'借款用途',
                    value:'',
                    placeholder:'点击输入借款用途'
                },{
                    class:'select-wrapper',
                    text:'还款方式',
                    value:'',
                    options:['按月付息到期还本','按月等额还息','按月等额本金']
                },{
                    class:'input-wrapper',
                    text:'其他',
                    value:'',
                    placeholder:'自定义备注'
                },
          ],
          emergencyInfo:[
              {
                    class:'input-wrapper',
                    text:'姓名',
                    value:'',
                    placeholder:'点击输入联系人姓名'
                },{
                    class:'select-wrapper',
                    text:'是您的',
                    value:'',
                    options:['父母','子女','其他']
                },{
                    class:'input-wrapper',
                    text:'住宅电话',
                    value:'',
                    placeholder:'格式：区号—号码'
                },{
                    class:'input-wrapper',
                    text:'手机号码',
                    value:'',
                    placeholder:'点击输入手机号码'
                }
          ],
          options:[]
      }
  },
  components:{
      appTitle,
      Scroll,
      popUp
  },
  methods:{
      init(){
          if(!this.customer.id){
              this.$router.push({path:'/interview'})
          }
      },
      back(){
          this.currentIndex>1? this.currentIndex--:this.$router.back()       
      },
      next(){
          if(this.currentIndex === 5){
              this.submit()
          }else{
              this.currentIndex +=1
          }    
      },
      pop(e,item){
          let target = e.target
          while(target.nodeName != 'DIV'){
              target = target.parentNode
          }
          if(target.className === 'select-wrapper'){
              this.currentItem = item
              this.options = item.options
              this.$refs.pop.show()
          }else{
              return
          }
      },
      choosed(item){
          this.currentItem.value = item
      },
      submit(){
          console.log('提交成功')
      },
  },
  computed:{
      ...mapGetters([
          'customer'
      ])
  },
  watch: {
    currentIndex(newIndex){
        if(newIndex === 5){
            this.nextTxt = '保存'
        }else{
            this.nextTxt = '下一页'
        }
    } 
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.application
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background #ffffff
    overflow hidden
    .scroll
        position fixed 
        top 52px
        bottom 0
        left 0
        right 0
        overflow hidden
        .title
            title() 
        .select-wrapper
            select-wrapper()
        .input-wrapper
            input-wrapper()
            input[placeholder]
                font-size 12px
                    
</style>


