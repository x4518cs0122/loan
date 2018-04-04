<template>
 <div class="sign-detail">
     <v-header :next="next" @back="back"></v-header>
     <ul>
         <li class="normal-wrapper" v-for="item in items" :key="item.name">
             <span class="text">{{item.text}}</span>
             <span class="val">{{item.val}}</span>
         </li>
     </ul>
     <h2 class="title">约定签约时间</h2>
     <div class="select-wrapper">
        <span class="text">约定时间</span>
        <span class="desc">选择签约时间</span>
        <span class="icon">
            <span class="fa fa-chevron-right" aria-hidden="true"></span>
        </span>
    </div>
    <div class="select-wrapper" @click="pop">
        <span class="text">约定地点</span>
        <span class="desc" id="position"></span>
        <span class="icon">
            <span class="fa fa-chevron-right" aria-hidden="true"></span>
        </span>
    </div>
    <pop :options="options" ref='pop' @choosed="choosed"></pop>
 </div>
</template>

<script>
import {getSignDetail} from 'api/sign'
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
 export default {
   data () {
     return {
         data:{},
         items:[
            {
                val:'',
                text:'贷款编号'
            },{
                val:'',
                text:'客户姓名'
            },{
                val:'',
                text:'联系方式'
            },{
                val:'',
                text:'借款品种'
            }
        ],
        next:'下一步',
        options:['儿童乐园','鬼屋','你说去哪儿']
     }
   },
   created(){
       this._getDetail()
   },
   methods:{
       _getDetail(){
           getSignDetail().then((res)=>{
               this.normalized(res.data)
           })
       },
       normalized(obj){ 
           var list = new Array(obj.id,obj.name,obj.phone,obj.type)
           this.items.map((item,index)=>{
               item.val = list[index]
           })         
       },
       pop(){
           this.$refs.pop.show()
       },
       choosed(item){
           document.getElementById('position').innerText = item
       },
       back(){
           this.$router.back()
       }
   },
   components:{
       vHeader,
       pop
   }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.sign-detail
    position absolute 
    top 0
    bottom 0
    left 0
    right 0
    background $color-background
    overflow hidden 
    .normal-wrapper
        normal-wrapper()
    .title
        title()
    .select-wrapper
        select-wrapper()
 
</style>
