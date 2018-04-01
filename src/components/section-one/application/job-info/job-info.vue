<template>
    <div class="job-info">
        <h2 class="title">工作单位信息</h2>
        <ul>
            <li v-for='(item,index) in job' :key="index">
                <div v-if="item.class==='input-wrapper'" :class="item.class">
                    <label class="text" for="name">{{item.text}}</label>
                    <input  type="text" 
                            :placeholder="item.placeholder" 
                            id="name" 
                            v-model="item.value">
                </div>
                <div :class="item.class" v-else>
                    <span class="text">{{item.text}}</span>
                    <span class="desc">{{item.value}}</span>
                    <span class="icon" @click="popUp(item.options,index)">
                        <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    </span>
                </div>
            </li>
        </ul>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>
<script>
import pop from 'base/pop-up/pop-up'
export default {
  data(){
      return{
          job:[{
              class:'input-wrapper',
              text:'工作单位',
              placeholder:'点击输入工作单位名称',
              value:''
          },{
              class:'input-wrapper',
              text:'单位地址',
              placeholder:'点击输入工作单位地址',
              value:''
          },{
              class:'select-wrapper',
              text:'单位性质',
              value:'',
              options:['事业/机关','国有','私营','股份']
          }],
          options:[],
          currentIndex:-1
      }
  },
  methods: {
      popUp(options,index){
          this.options = options;
          this.currentIndex = index
          this.$refs.pop.show()
      },
      choosed(item){
          let index = this.currentIndex;
          this.job[index].value = item
      },
      getData(){

      }
  },
  components: {
      pop
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.title
    title()
.select-wrapper
    select-wrapper()
.input-wrapper
    input-wrapper()
</style>


