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
import {selectType} from 'common/js/config'
import datePicker from 'base/datePicker/datePicker'
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
                     title:'',
                     items:[{
                        class:'normal-wrapper',
                        text:'贷款编号',
                        value:'',
                     },{
                         class:'select-wrapper',
                         text:'完成日期',
                         key:'time',
                         type:selectType.datePick,
                         value:'选择出报告日期'
                     },{
                         class:'select-wrapper',
                         text:'报告类型',
                         key:'report_type',
                         value:'',
                         options:['预评','正评']
                     }]
                 },{
                    title:'报告内容',
                    items:[{
                        class:'input-wrapper',
                        text:'权利人',
                        key:'report_obligee',
                        placeholder:'点击输入权利人姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'借款人',
                        key:'report_borrower',
                        placeholder:'点击输入借款人姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'座落',
                        key:'report_repose',
                        placeholder:'点击输入座落',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'房龄',
                        key:'report_house_age',
                        placeholder:'点击输入房龄姓名',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'面积',
                        key:'report_house_area',
                        placeholder:'点击输入面积',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'单价',
                        key:'report_house_single',
                        placeholder:'点击输入单价',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'总价',
                        key:'report_house_total',
                        placeholder:'点击输入总价',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'贷款金额',
                        key:'report_loan_amount',
                        placeholder:'点击输入贷款金额',
                        value:''
                    },{
                        class:'input-wrapper',
                        text:'年限',
                        key:'report_loan_year',
                        placeholder:'点击输入年限',
                        value:''
                    },{
                        class:'select-wrapper',
                        text:'首套/两套',
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
             console.log('you did!')
         },
         back(){
             this.$router.back()
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
