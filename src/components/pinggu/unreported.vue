<template>
    <div class="unreported" v-if="showForm">
        <v-header title="出报告" @goback="hidden"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="list-header">报告内容</li>
                <li><rs-input @input="rsinput" inputText="权利人" model="report_obligee" :value="obj.report_obligee"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="借款人" model="report_borrower"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="座落" model="report_repose"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="房龄" model="report_house_age"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="面积" model="report_house_area"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="单价" model="report_house_single"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="总价" model="report_house_total"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="贷款金额" model="report_loan_amount"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="年限" model="report_loan_year"></rs-input></li>
                <li><rs-select selectText="首套/两套" :options="options.onetwo" model="report_first" @selected="selected"></rs-select></li>
            </ul>
            <div class="botton" slot="footer">
                <el-button type="danger" class="submit" @click="submit">提交</el-button>
            </div>
        </rs-list>
    </div>
</template>

<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsInput from 'base/rsinput/rsinput'
import rsSelect from 'base/rsselect/rsselect'
 export default {
     props:{
         obj:{
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
             options:{
                 onetwo:[{key:0, value:'首套'},{key:1, value:'两套'}]
             },
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
         selected(key, model) {
             this.obj[model] = key
         },
         rsinput(value, model) {
             this.obj[model] = value
         },
         submit(){
             this.obj.id = 1
             this.hidden()
         },
         validate(obj){
             for(key in obj){
                 if(obj[key] === ''|| !obj[key]){
                     obj.key
                 }
             }
         }
     },
     components:{
         vHeader,
         rsList,
         rsSelect,
         rsInput
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.unreported
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow auto
    background $color-background
    .botton   
        box-sizing border-box
        width 100%
        padding 0 20px
        .submit
            width 100%
            margin 20px 0

</style>
