<template>
    <div class="user-info">
        <Scroll  ref="scroll">
            <div class="select-wrapper">
                <span class="text">申请日期</span>
                <span class="desc">选择申请日期</span>
                <span class="icon">
                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                </span>
            </div>
            <div class="personalInfo">
                <h2 class="title">申请人信息</h2>
                <div class="select-wrapper" @click="showModal('sex')">
                    <span class="text">性别</span>
                    <span class="desc" id="sex"></span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="select-wrapper">
                    <span class="text">婚姻状况</span>
                    <span class="desc"></span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="select-wrapper">
                    <span class="text">家庭结构</span>
                    <span class="desc"></span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="input-wrapper">
                    <span class="text">联系方式</span>
                    <input type="text" placeholder="输入家庭联系方式" >
                </div>
                <div class="select-wrapper">
                    <span class="text">户籍类型</span>
                    <span class="desc"></span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="input-wrapper">
                    <span class="text">身份证号</span>
                    <input type="text" placeholder="输入身份证号">
                </div>
                <div class="input-wrapper">
                    <span class="text">居住状况</span>
                    <input type="text" placeholder="输入居住状况">
                </div>
                <div class="input-wrapper">
                    <span class="text">居住地址</span>
                    <input type="text" placeholder="输入居住地址">
                </div>
                <div class="input-wrapper">
                    <span class="text">本地居住年限</span>
                    <input type="text" placeholder="输入本地居住年限">
                </div>
                <div class="select-wrapper">
                    <span class="text">住房情况</span>
                    <span class="desc"></span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="select-wrapper">
                    <span class="text">就业性质</span>
                    <span class="desc"></span>
                    <span class="icon">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
                <div class="input-wrapper">
                    <span class="text">就业年限</span>
                    <input type="text" placeholder="输入就业年限">
                </div>
                <div class="input-wrapper">
                    <span class="text">月收入</span>
                    <input type="text" placeholder="输入月收入">
                </div>
            </div>    
        </Scroll>
        <div class="pop">
            <popUp :options="options" ref="pop" @choosed="choosed"></popUp>  
        </div>  
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import popUp from 'base/pop-up/pop-up'
export default {
  components: {
      Scroll,
      popUp
  },
  data(){
      return{
          user:{
              date:'',
              sex:'',
              married:'',
              family:'',
              phoneNum:'',
              huji:'',
              identification:'',
              juzhu:'',
              address:'',
              year:'',
              ownHome:'',
              job:'',
              workingYears:'',
              salary:'',
          },
          currentModal:'',
          options:[]
      }
  },
  methods:{
      showModal(info){
          this.currentModal = info
          this.options = ['男','女']
          this.$refs.pop.show()
      },
      choosed(item){
        //   let current = this.currentModal
        //   this.user.sex = item
        let id = this.currentModal
        document.getElementById(`${id}`).innerText = item
      }
  },
  mounted () {
      setTimeout(()=>{
        this.$refs.scroll.refresh()
      },20)
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.title
    title() 
</style>


