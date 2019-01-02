<template>
  <div class="interview-detail">
      <v-header title="抵押审批" @goback="goback"></v-header>
      <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-text label="客户姓名" :value="customer.clientName"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.clientPhone"></rs-text></li>
                <li><rs-text label="借款品种" :value="loanVariety"></rs-text></li>
                <li class="placeholder"></li>
                <li class="edit-link" @click.stop="goEdit('mulu', catalogState)">
                    <i class="fa" :class="catalogState? 'fa-check-circle-o success': 'fa-pencil-square-o warning'"></i>
                    <span class="text">资料目录表</span>
                    <span class="edit" v-html="catalogState? '已完成':'编辑'"></span>
                </li>
                <li class="edit-link" @click.stop="goEdit('baoshen', sendState)">
                    <i class="fa" :class="sendState? 'fa-check-circle-o success': 'fa-pencil-square-o warning'"></i>
                    <span class="text">报审</span>
                    <span class="edit" v-html="sendState? '已完成':'编辑'"></span>
                </li>
                <li class="edit-link" @click.stop="goEdit('state', approveState)">
                    <i class="fa" :class="approveState? 'fa-check-circle-o success': 'fa-pencil-square-o warning'"></i>
                    <span class="text">确定审批状态</span>
                    <span class="edit" v-html="approveState? '已完成':'编辑'"></span>
                </li>
                <li class="edit-link" @click.stop="goEdit('zhengping', customer.extra.commentType === '正评')">
                    <i class="fa" :class="customer.extra.commentType === '正评'? 'fa-check-circle-o success': 'fa-pencil-square-o warning'"></i>
                    <span class="text">出正评</span>
                    <span class="edit" v-html="customer.extra.commentType === '正评'? '已完成':'编辑'"></span>
                </li>
            </ul>
      </rs-list>
      <top-tip ref="topTip">
          <div class="tip-title">
              <i class="fa fa-ban icon"></i>
              <span class="text">{{errorMessage}}</span>
          </div>   
      </top-tip> 
      <router-view></router-view>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import rsSelect from 'base/rsselect/rsselect';
import * as _ from 'lodash'
import topTip from 'base/top-tip/top-tip';
import unreported from 'components/mortgageLoan/valuations/unreported'
import {mapGetters, mapMutations} from 'vuex';
import {getOrderInfo, getOptionById, getProcess, getReports, formalReport, getCurrentState} from 'api/api';
export default {
  data() {
    return {
      loanVariety: '',
      reports:{},
      approveState: false,
      sendState: false,
      catalogState: false,
      errorMessage:''
    };
  },
  components: {vHeader, rsList, rsText, rsSelect, unreported, topTip},
  computed: {
    ...mapGetters(['customer']),
  },
  created() {
    this.getLoanVarity();
    this._getCurrentState()
  },
  methods: {
    /**获取贷款类型 */
    async getLoanVarity() {
      let checklistId = this.customer.rootId + 1;
      getOrderInfo(checklistId).then(res => {
        if (res.result) {
          let optionId = res.data.loanVariety;
          getOptionById(optionId).then(res => {
            this.loanVariety = res.data.value;
            let customer = Object.assign(this.customer, {
              loanVariety: this.loanVariety,
            });
            this.setCustomer(customer);
          });
        }
      });
    },
    /**判断当前状态 */
    _getCurrentState(){
      getCurrentState(this.customer.id).then(res =>{
        if(res.result){
          this.catalogState = res.data.catalogState.done
          this.sendState = res.data.sendState.done
          this.approveState = res.data.confirmApproveState.done
        }
      })
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
    goback() {
      this.$router.push({path: '/approve'});
    },
    /**资料，报审，审批状态跳转逻辑 */
    goEdit(where, done) {
      if (done) {
        return;
      }
      if((where === 'baoshen' ||  where === 'state' || where === 'zhengping') && !this.catalogState){ 
        this.errorMessage = '请先完善资料目录表'
        this.$refs.topTip.show()
        return
      }
      if((where === 'state' || where === 'zhengping') && !this.sendState){
        this.errorMessage = '请先修改报审状态'
        this.$refs.topTip.show()
        return
      }
      if(where === 'zhengping' && !this.approveState){
        this.errorMessage = '请先修改审批状态'
        this.$refs.topTip.show()
        return
      }
      this.$router.push({path: `/approve/${this.customer.id}/${where}`});
    },
  },
  watch: {
    $route(to, from) {
      let isChildrenRouter = /^\/approve\/.+\/.+$/.test(from.path);
      isChildrenRouter && this._getCurrentState();
    },
  },
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.interview-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y auto
    overflow-x:hidden;
    background $color-background
    .edit-link {
        position: relative;
        padding: 15px 20px;

        .success {
            color: $color-theme;
        }

        .warning {
            color: $color-warning;
        }

        .text {
            color: $color-text-l;
        }

        .edit {
            position: absolute;
            right: 30px;
            padding-left: 10px;
            font-size: $font-size-small;
            border-left: 1px solid $color-border;
        }
    }
    .tip-title {
        text-align: center;
        padding: 18px 0;
        font-size: 0;

        .icon {
            font-size: $font-size-medium;
            color: $bello-active;
            margin-right: 4px;
        }

        .text {
            font-size: $font-size-medium;
            color: $pure-white;
        }
    }
}
</style>


