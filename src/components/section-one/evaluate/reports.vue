<template>
    <div class="reports">
        <v-header title="测评报告管理" @back="back" @submit="submit" next="提交"></v-header>
        <form-list :list="list" @pop="pop" :obj="baseInfo" @choosed="choosed" ref="formList" @datePick="datePickerShow">
            <div>        
                <!-- 表单显示 -->
                <div class="report-wrapper" v-for="(item,index) in reports" :key="index">
                    <!-- 如果存在id值 则表示该报告已经填写 -->
                    <div class="report-content" v-if="item.id">
                        <h2 class="title">报告{{index+1}}</h2>
                        <div class="text">
                            <span class="text-left" v-html="item.report_type === 0 ? '预评':'正评'"></span>
                            <span class="text-right">{{item.time}}</span>
                        </div>
                    </div>
                    <!-- v-else 报告为空 -->
                    <div class="report-content" v-else>
                        <h2 class="title">空报告</h2>
                        <div class="text">
                            <span class="text-left">点击右下角进行编辑</span>
                        </div>
                    </div>
                    <!-- 报告footer操作区 -->
                    <div class="report-footer">
                        <div class="delete" @click="deleteReport(index)">
                            <i class="el-icon-delete icon"></i>
                            <span>删除</span>
                        </div>
                        <div class="edit" @click="editReport(item)">
                            <i class="el-icon-edit-outline icon"></i>
                            <span>编辑</span>
                        </div>   
                    </div>
                </div>
                <div class="button">
                    <el-button type="danger" class="add-report" @click="addReports">添加报告</el-button>
                </div>
            </div>
        </form-list>    
        <unreported :list="reportObj" ref="unreported"></unreported>
        <pop :options="options" ref="pop" @choosed="choosed"></pop>
        <date-picker ref="datePicker" @submit="choosed"></date-picker>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import unreported from './unreported'
import formList from 'components/form-list/form-list'
import {selectType} from 'common/js/config'
import datePicker from 'base/datePicker/datePicker'
import pop from 'base/pop-up/pop-up'
import {mapGetters} from 'vuex'
import {postReports} from 'api/api'
 export default {
     data(){
         return{
             reportObj:{},
             options:[],
             list:[
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
                         key:'type',
                         value:'',
                         options:['预评','正评']
                     }]
                 },
             ],         
             reports:[{
                "id": null,
                "report_type": 0,
                "report_obligee": null,
                "report_borrower": null,
                "report_repose": null,
                "report_house_age": null,
                "report_house_area": null,
                "report_house_single": null,
                "report_house_total": null,
                "report_loan_amount": null,
                "report_loan_year": null,
                "report_first": false,
                "loan_id": null
              }]
         }
     },
     created(){
         this.obj = {
                "id": null,
                "report_type": 0,
                "report_obligee": null,
                "report_borrower": null,
                "report_repose": null,
                "report_house_age": null,
                "report_house_area": null,
                "report_house_single": null,
                "report_house_total": null,
                "report_loan_amount": null,
                "report_loan_year": null,
                "report_first": false,
                "loan_id": null
              },
         this.baseInfo={
                 time:'',
                 type:''
             }
     },
     methods:{
         back(){
             this.$router.back()
         },
         addReports(){
             let obj = Object.assign({},this.obj)
             this.reports.push(obj)
         },
         editReport(item){
             this.reportObj = item
             this.$refs.unreported.show()
         },
         deleteReport(index){
             this.reports.splice(index,1)
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
             let data = {
                 time:this.baseInfo.time,
                 type:this.baseInfo.type,
                 taskId:this.customer.taskId,
                 reports:JSON.stringify(this.reports)
             }
             postReports(data).then((res)=>{
                 if(res.status === 1){
                     this.$router.back()
                 }
             })
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components: {
        vHeader,
        unreported,
        datePicker,
        formList,
        pop
  }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
    .reports
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background $color-background
        overflow hidden 
        .report-wrapper
            width 100%
            height 100px
            background $color-white
            margin-bottom 20px
            .report-content 
                box-sizing border-box      
                width 100%
                height 70px
                border-bottom 1px solid $color-border
                padding 15px
                .title
                    font-weight 700
                .text
                    width 100%
                    margin-top 10px
                    font-size $font-size-medium
                    .text-right
                        float right
            .report-footer
                line-height 30px
                height 30px
                .icon
                    font-size $font-size-large
                .edit,.delete
                    float right
                    font-size $font-size-medium
                    margin-right 10px
                    extend-click()
        .button
            width 100%
            padding 20px
            box-sizing border-box
            .add-report
                width 100%
                    
</style>
