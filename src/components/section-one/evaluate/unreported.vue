<template>
    <div class="unreported" v-if="showForm">
        <v-header title="出报告" @back="back"></v-header>
        <form-list :list="reports" @pop="pop" :obj="list" @choosed="choosed" ref="formList" @datePick="datePickerShow">
            <div class="botton">
                <el-button type="danger" class="submit" @click="submit">提交</el-button>
            </div>
        </form-list>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import pop from 'base/pop-up/pop-up'
import formList from 'components/form-list/form-list'
 export default {
     props:{
         list:{
             type:Object,
             default:() =>{
                 return {}
             }
         }
     },
     data(){
         return{
             reports:[
                 {
                    title:'报告内容',
                    items:[{
                        class:'input-wrapper',
                        text:'权利人',
                        placeholder:'点击输入权利人姓名',
                        value:'report_obligee'
                    },{
                        class:'input-wrapper',
                        text:'借款人',
                        placeholder:'点击输入借款人姓名',
                        value:'report_borrower'
                    },{
                        class:'input-wrapper',
                        text:'座落',
                        placeholder:'点击输入座落',
                        value:'report_repose'
                    },{
                        class:'input-wrapper',
                        text:'房龄',
                        placeholder:'点击输入房龄姓名',
                        value:'report_house_age'
                    },{
                        class:'input-wrapper',
                        text:'面积',
                        placeholder:'点击输入面积',
                        value:'report_house_area'
                    },{
                        class:'input-wrapper',
                        text:'单价',
                        placeholder:'点击输入单价',
                        value:'report_house_single'
                    },{
                        class:'input-wrapper',
                        text:'总价',
                        placeholder:'点击输入总价',
                        value:'report_house_total'
                    },{
                        class:'input-wrapper',
                        text:'贷款金额',
                        placeholder:'点击输入贷款金额',
                        value:'report_loan_amount'
                    },{
                        class:'input-wrapper',
                        text:'年限',
                        placeholder:'点击输入年限',
                        value:'report_loan_year'
                    },{
                        class:'select-wrapper',
                        text:'首套/两套',
                        key:'report_first',
                        value:'',
                        options:['首套','两套']
                    }]
                 }
                ],
             options:[],
             showForm:false
         }
     },
     methods:{
         show(){
             this.showForm = true
         },
         hidden(){
             this.showForm = false
         },
         pop(option){
            this.options = option
            this.$refs.pop.show()
         },
         datePickerShow(){
            this.$refs.datePicker.toggleList()
         },
         choosed(option){
            this.$refs.formList.choosed(option)      
         },
         submit(){
             this.list.id = 1
             this.hidden()
         },
         validate(obj){
             for(key in obj){
                 if(obj[key] === ''|| !obj[key]){
                     obj.key
                 }
             }
         },
         back(){
             this.hidden()
         }
     },
     components:{
         vHeader,
         pop,
         formList
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.unreported
    position absolute 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .botton   
        box-sizing border-box
        width 100%
        padding 0 20px
        .submit
            width 100%
            margin 20px 0

</style>
