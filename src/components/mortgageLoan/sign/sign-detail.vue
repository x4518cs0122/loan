<template>
    <div class="sign-detail">
        <v-header @goback="goback" title="抵押面签列表"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.clientPhone"></rs-text></li>
                <li><rs-text label="借款品种" :value="loanVariety"></rs-text></li>
                <li class="placeholder"></li>
                <li class="edit-link" @click.stop="goEdit('form', customer.extra.catalogState.done)">
                    <i class="fa" :class="customer.extra.catalogState.done? 'fa-check-circle-o success': 'fa-pencil-square-o warning'"></i>
                    <span class="text">资料目录表</span>
                    <span class="edit" v-html="customer.extra.catalogState.done? '已完成':'编辑'"></span>
                </li>
                <li class="edit-link" @click.stop="goEdit('application', customer.extra.formState.done)">
                    <i class="fa" :class="customer.extra.formState.done? 'fa-check-circle-o success': 'fa-pencil-square-o warning'"></i>
                    <span class="text">个人贷款申请表</span>
                    <span class="edit" v-html="customer.extra.formState.done? '已完成':'编辑'"></span>
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
import topTip from 'base/top-tip/top-tip';
import {mapGetters, mapMutations} from 'vuex';
import {getOptionById, getProcess, getOrderInfo} from '@/api/api';
export default {
  data() {
    return {
      loanVariety: '',
      errorMessage:'资料目录表未完成'
    };
  },
  mounted() {
    this.getLoanVarity();
  },
  methods: {
    getLoanVarity() {
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
    goback() {
      this.$router.push({path: '/sign'});
    },
    goEdit(link, done) {
      if (done) {
        return;
      }
      if(link === 'application' && !this.customer.extra.catalogState.done){
        this.$refs.topTip.show()
        return
      }
      this.$router.push({path: `/sign/${this.customer.id}/${link}`});
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER',
    }),
  },
  computed: {
    ...mapGetters(['customer']),
  },
  components: {
    vHeader,
    rsText,
    rsSelect,
    rsList,
    topTip
  },
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.sign-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: $color-background;

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
