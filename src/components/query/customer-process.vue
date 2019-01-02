<template>
    <div class="loan-detail" v-if="showDetail">
        <v-header @goback="hidden" title="贷款详情" back="返回"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-text label="贷款编号" :value="queryCheckedorder.id"></rs-text></li>
                <li><rs-text label="客户姓名" :value="queryCheckedorder.clientName"></rs-text></li>
                <li><rs-text label="联系方式" :value="queryCheckedorder.clientPhone"></rs-text></li>
                <li class="placeholder"></li> 
            </ul>
            <div slot="footer">
                <ul class="process-wrapper">
                    <li class="process-item no-border">
                        <div class="split-line start"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.checklist.totalState === 'finish'?'fa-check active':'fa-handshake-o'"></i>
                        </div>
                        <div class="current-state">
                            <p>接单</p>
                            <p v-html="queryCheckedorder.extra.checklist.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p v-html="queryCheckedorder.extra.checklist.totalState === 'finish'? '已提交客户信息表':'待提交客户信息表'"
                                :class="queryCheckedorder.extra.checklist.totalState === 'finish'? 'success':'grey'"></p>
                        </div>
                    </li>
                    <li class="process-item no-border" v-if="isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.view&&queryCheckedorder.extra.view.totalState=== 'finish'?'fa-check active':'fa-coffee'"></i>
                        </div>
                        <div class="current-state">
                            <p>面谈</p>
                            <p v-html="queryCheckedorder.extra.view&&queryCheckedorder.extra.view.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p  :class="queryCheckedorder.extra.view&&queryCheckedorder.extra.view.totalState === 'finish'? 'success':'grey'"
                                v-html="queryCheckedorder.extra.view&&queryCheckedorder.extra.view.totalState === 'finish'? '已提交面谈建议':'待提交面谈建议'">
                            </p>
                        </div>
                    </li>
                    <li class="process-item no-border">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.visa&&queryCheckedorder.extra.visa.totalState=== 'finish'?'fa-check active':'fa-files-o'"></i>
                        </div>
                        <div class="current-state">
                            <p>面签</p>
                            <p v-html="queryCheckedorder.extra.visa&&queryCheckedorder.extra.visa.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.visa&&queryCheckedorder.extra.visa.catalogState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.visa?queryCheckedorder.extra.visa.catalogState.message:'待完善资料目录表'}}
                            </p>
                            <p  v-if="isMortgage"
                                :class="queryCheckedorder.extra.visa&&queryCheckedorder.extra.visa.formState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.visa?queryCheckedorder.extra.visa.formState.message:'待完善个人申请表'}}
                            </p>
                            <p :class="queryCheckedorder.extra.visa&&queryCheckedorder.extra.visa.visaState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.visa?queryCheckedorder.extra.visa.visaState.message:'待确定面签状态'}}
                            </p>
                        </div>
                    </li>
                    <li class="process-item no-border">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.order&&queryCheckedorder.extra.order.totalState === 'finish'?'fa-check active':'fa-calculator'"></i>
                        </div>
                        <div class="current-state">
                            <p>评估下单</p>
                            <p v-html="queryCheckedorder.extra.order&&queryCheckedorder.extra.order.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.order&&queryCheckedorder.extra.order.orderState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.order?queryCheckedorder.extra.order.orderState.message:'待下单'}}
                            </p>
                            <p :class="queryCheckedorder.extra.order&&queryCheckedorder.extra.order.reportState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.order?queryCheckedorder.extra.order.reportState.message:'待出报告'}}
                            </p>
                        </div>
                    </li>
                    <li class="process-item no-border" v-if="!isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.input&&queryCheckedorder.extra.input.totalState=== 'finish'?'fa-check active':'fa-laptop'"></i>
                        </div>
                        <div class="current-state">
                            <p>整件输机</p>
                            <p v-html="queryCheckedorder.extra.input&&queryCheckedorder.extra.input.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.input&&queryCheckedorder.extra.input.checkState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.input?queryCheckedorder.extra.input.checkState.message:'待房查征信'}}
                            </p>
                            <p :class="queryCheckedorder.extra.input&&queryCheckedorder.extra.input.catalogState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.input?queryCheckedorder.extra.input.catalogState.message:'待完善资料目录表'}}
                            </p>
                            <p :class="queryCheckedorder.extra.input&&queryCheckedorder.extra.input.inputState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.input?queryCheckedorder.extra.input.inputState.message:'待确定输机状态'}}
                            </p>
                        </div>
                    </li>
                    <li class="process-item no-border">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.approve&&queryCheckedorder.extra.approve.totalState === 'finish'?'fa-check active':'fa-pencil'"></i>
                        </div>
                        <div class="current-state">
                            <p>审批</p>
                            <p v-html="queryCheckedorder.extra.approve&&queryCheckedorder.extra.approve.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p  v-if="isMortgage"
                                :class="queryCheckedorder.extra.approve&&queryCheckedorder.extra.approve.catalogState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.approve?queryCheckedorder.extra.approve.catalogState.message:'待完善资料目录表'}}
                            </p>
                            <p :class="queryCheckedorder.extra.approve&&queryCheckedorder.extra.approve.sendState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.approve?queryCheckedorder.extra.approve.sendState.message:'待报审'}}
                            </p>
                            <p :class="queryCheckedorder.extra.approve&&queryCheckedorder.extra.approve.approveState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.approve?queryCheckedorder.extra.approve.approveState.message:'待确定审批状态'}}
                            </p>
                            <p  v-if="isMortgage"
                                :class="queryCheckedorder.extra.approve&&queryCheckedorder.extra.approve.approveComment.done? 'success':'grey'">
                                {{queryCheckedorder.extra.approve?queryCheckedorder.extra.approve.approveComment.message:'待出正评'}}
                            </p>
                        </div>
                    </li>
                    <!-- 二手房过户 -->
                    <li class="process-item no-border" v-if="!isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.transfer&&queryCheckedorder.extra.transfer.totalState === 'finish'?'fa-check active':'fa-building-o'"></i>
                        </div>
                        <div class="current-state">
                            <p>过户</p>
                            <p v-html="queryCheckedorder.extra.transfer&&queryCheckedorder.extra.transfer.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.transfer&&queryCheckedorder.extra.transfer.receiptState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.transfer?queryCheckedorder.extra.transfer.receiptState.message : '待确定回证状态'}}
                            </p>
                            <p :class="queryCheckedorder.extra.transfer && queryCheckedorder.extra.transfer.transferState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.transfer?queryCheckedorder.extra.transfer.transferState.message : '待确定过户状态'}}
                            </p>
                        </div>
                    </li>
                    <!-- 抵押贷款-抵押 -->
                    <li class="process-item no-border" v-if="isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.mortgage&&queryCheckedorder.extra.mortgage.totalState === 'finish'?'fa-check active':'fa-university'"></i>
                        </div>
                        <div class="current-state">
                            <p>抵押</p>
                            <p v-html="queryCheckedorder.extra.mortgage&&queryCheckedorder.extra.mortgage.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.mortgage&&queryCheckedorder.extra.mortgage.mortgageState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.mortgage?queryCheckedorder.extra.mortgage.mortgageState.message : '待确定抵押状态'}}
                            </p>
                            <p  v-if="isMortgage"
                                :class="queryCheckedorder.extra.mortgage && queryCheckedorder.extra.mortgage.guaranteePublish.done? 'success':'grey'">
                                {{queryCheckedorder.extra.mortgage?queryCheckedorder.extra.mortgage.guaranteePublish.message : '待出担保函'}}
                            </p>
                            <p  v-if="isMortgage"
                                :class="queryCheckedorder.extra.mortgage&&queryCheckedorder.extra.mortgage.guaranteeApprove.done? 'success':'grey'">
                                {{queryCheckedorder.extra.mortgage?queryCheckedorder.extra.mortgage.guaranteeApprove.message : '担保函待审批'}}
                            </p>
                        </div>
                    </li>
                    <!-- 二手房-抵押 -->
                    <li class="process-item no-border" v-if="!isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.mortgageA&&queryCheckedorder.extra.mortgageA.totalState === 'finish'?'fa-check active':'fa-university'"></i>
                        </div>
                        <div class="current-state">
                            <p>抵押</p>
                            <p v-html="queryCheckedorder.extra.mortgageA&&queryCheckedorder.extra.mortgageA.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.mortgageA&&queryCheckedorder.extra.mortgageA.mortgageState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.mortgageA?queryCheckedorder.extra.mortgageA.mortgageState.message : '待确定抵押状态'}}
                            </p>
                            <p  :class="queryCheckedorder.extra.mortgageA && queryCheckedorder.extra.mortgageA.takeEvidence.done? 'success':'grey'">
                                {{queryCheckedorder.extra.mortgageA?queryCheckedorder.extra.mortgageA.takeEvidence.message : '待确定取证时间'}}
                            </p>
                            <p  :class="queryCheckedorder.extra.mortgageA&&queryCheckedorder.extra.mortgageA.returnEvidence.done? 'success':'grey'">
                                {{queryCheckedorder.extra.mortgageA?queryCheckedorder.extra.mortgageA.returnEvidence.message : '待确定反证时间'}}
                            </p>
                        </div>
                    </li>
                    <!-- 二手房担保 -->
                    <li class="process-item no-border" v-if="!isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.guarantee&&queryCheckedorder.extra.guarantee.totalState === 'finish'?'fa-check active':'fa-gavel'"></i>
                        </div>
                        <div class="current-state">
                            <p>担保</p>
                            <p v-html="queryCheckedorder.extra.guarantee&&queryCheckedorder.extra.guarantee.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.guarantee&&queryCheckedorder.extra.guarantee.guaranteeState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.guarantee?queryCheckedorder.extra.guarantee.guaranteeState.message : '待确定担保状态'}}
                            </p>
                            <p :class="queryCheckedorder.extra.guarantee&&queryCheckedorder.extra.guarantee.reportState.done? 'success':'grey'">
                                {{queryCheckedorder.extra.guarantee?queryCheckedorder.extra.guarantee.reportState.message : '待出房产报告'}}
                            </p>
                        </div>
                    </li>
                    <!-- 抵押-收费 -->
                    <li class="process-item no-border" v-if="isMortgage">
                        <div class="split-line"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'?'fa-check active':'fa-diamond'"></i>
                        </div>
                        <div class="current-state">
                            <p>收费</p>
                            <p v-html="queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'? 'success':'grey'">
                                {{queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'? '已收费' : '待收费'}}
                            </p>
                        </div>
                    </li>
                    <!-- 放款 -->
                    <li class="process-item no-border" >
                        <div class="split-line" :class="isMortgage? 'end':''"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.loan&&queryCheckedorder.extra.loan.totalState === 'finish'?'fa-check active':'fa-money'"></i>
                        </div>
                        <div class="current-state">
                            <p>放款</p>
                            <p v-html="queryCheckedorder.extra.loan&&queryCheckedorder.extra.loan.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p  v-if="isMortgage"
                                :class="queryCheckedorder.extra.loan&&queryCheckedorder.extra.loan.totalState === 'finish'? 'success':'grey'">
                                {{queryCheckedorder.extra.loan&&queryCheckedorder.extra.loan.totalState === 'finish'? '已放款' : '待放款'}}
                            </p>
                            <p  v-if="!isMortgage"
                                :class="queryCheckedorder.extra.loan&&queryCheckedorder.extra.loan.totalState === 'finish'? 'success':'grey'">
                                {{queryCheckedorder.extra.loan&&queryCheckedorder.extra.loan.totalState === 'finish'? '已放款' : '待放款'}}
                            </p>
                        </div>
                    </li>
                    <!-- 二手房收费 -->
                    <li class="process-item no-border" v-if="!isMortgage">
                        <div class="split-line end"></div>
                        <div class="circle">
                            <i class="fa icon" :class="queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'?'fa-check active':'fa-diamond'"></i>
                        </div>
                        <div class="current-state">
                            <p>收费</p>
                            <p v-html="queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'? '已完成':'待进行'"></p>
                        </div>
                        <div class="desc">
                            <p>业务员:</p>
                            <p :class="queryCheckedorder.extra.charge&&queryCheckedorder.extra.charge.totalState === 'finish'? 'success':'grey'">
                                {{queryCheckedorder.extra.loan&&queryCheckedorder.extra.charge.totalState === 'finish' ? '已收费' : '待收费'}}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </rs-list>  
    </div>
</template>

<script type='text/ecmascript-6'>

import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import { mapGetters } from 'vuex';

const visaState = ['catalogState', 'formState', 'visaState'];

  export default {
    props:{
        loanType:{
            type:String,
            default:''
        }
    },
    data () {
      return {
          showDetail:false,
          isMortgage:this.loanType === '抵押贷款'? true:false
      }
    },
    components:{ vHeader, rsText, rsList },
    methods:{
        show() {
            this.showDetail = true
        },
        hidden() {
            this.showDetail = false
        }
    },
    computed:{
        ...mapGetters([
            'queryCheckedorder'
        ])
    }
  }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';
.loan-detail
    position: fixed
    top 0
    left 0
    bottom 0
    right 0
    overflow auto 
    background: $color-background;
    .process-wrapper
        .process-item
            display flex
            font-size $font-size-small
            position relative
            align-items center
            box-sizing border-box
            padding 20px 20px
            .split-line
                width: 1px
                border-left 1px solid $color-theme
                position absolute 
                left: 30px
                height: 100%
                &.start
                    // height:25px
                    height 50%
                    top: 50%
                &.end
                    height 50%
                    top 0
            .circle
                position relative
                height: 20px
                width: 20px
                border: 1px solid #eee
                border-radius 50%
                background $pure-white
                .icon
                    position absolute
                    top 50%
                    left 50%
                    transform translate3d(-50%, -50%, 0)
                    z-index 2
                    &.active
                        color:$color-success
            .current-state
                width 80px
                text-align center
            .desc
                flex-shrink 1
                flex-grow 1
                .grey
                    color: $color-text-ll
                .success
                    color: $color-success
                p
                    margin-bottom 3px
                    &:last-child
                        margin-bottom 0

</style>