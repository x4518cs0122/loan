<template>
 <div class="sign-detail">
     <v-header @back="back" @submit="submit" title="确认面签时间"></v-header>
     <form-list :list="list" @pop="pop" @datePick="datePickerShow" ref="formList"></form-list>
     <pop :options="options" ref='pop' @choosed="choosed"></pop>
     <date-picker ref="datePicker" @submit="choosed"></date-picker>
 </div>
</template>

<script>
import {getSignDetail} from 'api/api'
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
import datePicker from 'base/datePicker/datePicker'
import {selectType} from 'common/js/config'
 export default {
   data () {
     return {
         data:{},
         list:[
            {
                title:'',
                items:[
                    {
                        class:"normal-wrapper",
                        val:'',
                        text:'贷款编号'
                    },{
                        class:"normal-wrapper",
                        val:'',
                        text:'客户姓名'
                    },{
                        class:"normal-wrapper",
                        val:'',
                        text:'联系方式'
                    },{
                        class:"normal-wrapper",
                        val:'',
                        text:'借款品种'
                    }
                ]
            },{
                title:'约定签约时间',
                items:[
                    {
                        class:'select-wrapper',
                        text:"约定时间",
                        value:'选择约定时间',
                        type:selectType.datePick
                    },{
                        class:'select-wrapper',
                        text:"约定地点",
                        value:'',
                        options:['儿童乐园','鬼屋','你说去哪儿']
                    }
                ]
            }
         ],
         options:[]
     }
   },
   created(){
       this.currentItem={},
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
           this.list[0].items.map((item,index)=>{
               item.val = list[index]
           })         
       },
       pop(){
           this.currentItem = 
           this.$refs.pop.show()
       },
       datePickerShow(){
           this.$refs.datePicker.toggleList()
       },
       choosed(item){
           document.getElementById('position').innerText = item
       },
       back(){
           this.$router.back()
       },
       submit(){
           console.log('yes!')
       }
   },
   components:{
       vHeader,
       pop,
       datePicker,
       formList
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
