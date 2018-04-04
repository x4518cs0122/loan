<template>
    <div class="user-info">
        <Scroll ref="scroll" class="scroll">
            <div>
                <div class="select-wrapper">
                    <span class="text">申请日期</span>
                    <span class="desc">选择申请日期</span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <ul class="personalInfo">
                    <h2 class="title">申请人信息</h2>
                    <li v-for="(item,index) in items" :key="index">
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
</template>
<script>
import Scroll from 'base/scroll/scroll'
export default {
  components: {
      Scroll
  },
  data(){
      return{
          items:[
              {
                class:'select-wrapper',
                text:'性别',
                val:'',
                options:['男','女']
            },{
                class:'select-wrapper',
                text:'婚姻情况',
                val:'',
                options:['未婚','已婚','离异','丧偶']
            },{
                class:'select-wrapper',
                text:'家庭结构',
                val:'',
                options:['有子女都成年','有未成年子女','无子女']
            },{
                class:'input-wrapper',
                text:'联系方式',
                val:'',
                placeholder:'点击输入联系方式'
            },{
                class:'select-wrapper',
                text:'户籍',
                val:'',
                options:['本地户籍','非本地户籍']
            },{
                class:'input-wrapper',
                text:'身份证号',
                val:'',
                placeholder:'点击输入二代身份证号码'
            },{
                class:'input-wrapper',
                text:'居住状况',
                val:'',
                placeholder:'点击输入居住状况'
            },{
                class:'input-wrapper',
                text:'居住状况',
                val:'',
                placeholder:'点击输入居住状况'
            },{
                class:'input-wrapper',
                text:'居住地址',
                val:'',
                placeholder:'点击输入居住地址'
            },{
                class:'input-wrapper',
                text:'居住年限',
                val:'',
                placeholder:'点击输入居住年限'
            },{
                class:'select-wrapper',
                text:'住房情况',
                val:'',
                options:['本地有房(无贷款)','本地有房(有贷款)','异地有住房(无贷款)','异地有住房(有贷款)','无自有住房']
            },{
                class:'select-wrapper',
                text:'就业性质',
                val:'',
                options:['授薪','自雇']
            },{
                class:'input-wrapper',
                text:'就业年限',
                val:'',
                placeholder:'现单位工作/企业成立'
            },{
                class:'input-wrapper',
                text:'月收入',
                val:'',
                placeholder:'个人收入/企业销售收入'
            }
          ],
          options:[]
      }
  },
  methods:{
      choosed(item){
        let id = this.currentModal
        document.getElementById(`${id}`).innerText = item
      }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-info
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


