<template>
    <div class="reports">
        <v-header title="测评报告管理" @back="back"></v-header>
        <div>       
            <!-- 表单显示 -->
            <div class="report-wrapper" v-for="(item,index) in list" :key="index">
                <!-- 如果存在id值 则表示该报告已经填写 -->
                <div class="report-content" v-if="item.id">
                    <h2 class="title">报告{{index}}</h2>
                    <div class="text">
                        <span class="text-left">预评</span>
                        <span class="text-right">2017-01-02</span>
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
                    <div class="delete" @click="deleteReport">
                        <i class="el-icon-delete icon"></i>
                        <span>删除</span>
                    </div>
                    <div class="edit" @click="editReport(item)">
                        <i class="el-icon-edit-outline icon"></i>
                        <span>编辑</span>
                    </div>   
                </div>
            </div>
        </div>
        <unreported :list="reportsObj" ref="unreported"></unreported>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import unreported from './unreported'
 export default {
     data(){
         return{
             reportsObj:{},
             list:[{
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
              }],
             obj:{
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
              }
         }
     },
     methods:{
         back(){
             this.$router.back()
         },
         editReport(item){
             this.reportObj = item
             this.$refs.unreported.show()
         },
         deleteReport(){
             
         }
     },
     components: {
        vHeader,
        unreported
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
                    
</style>
