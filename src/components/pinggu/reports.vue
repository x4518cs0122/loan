<template>
    <div class="reports">
        <v-header title="测评报告管理" @goback="goback" @submit="submit" next="提交"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="报告类型" :options="options.reportType" model="type" @selected="selected"></rs-select></li>
            </ul>
        </rs-list>
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
        <unreported :obj="reportObj" ref="unreported"></unreported>
    </div>
</template>

<script>
import vHeader from 'components/header/header'
import unreported from './unreported'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsSelect from 'base/rsselect/rsselect'
import {mapGetters} from 'vuex'
import {postReports} from 'api/api'
 export default {
     data(){
         return{
             options:{
                 reportType:[{key:0, value:'预评'},{key:1, value:'正评'}]
             },  
             reportObj: {}, 
             info:{
                time:'',
                type:''
             },
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
                "report_type": null,
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
              }
     },
     methods:{
         goback(){
             this.$router.back()
         },
         selected(key, model) {
             this.info[model] = key
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
         submit(){
             let data = {
                 time:this.info.time,
                 type:this.info.type,
                 taskId:this.customer.taskId,
                 reports:JSON.stringify(this.reports)
             }
             postReports(data).then((res)=>{
                 if(res.status === 1){
                     this.$router.push({path:'/evaluate'})
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
        rsList,
        rsText,
        rsSelect
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
        overflow auto 
        .report-wrapper
            width 100%
            height 100px
            background $color-white
            margin 10px 0 
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
