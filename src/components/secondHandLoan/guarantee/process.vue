<template>
    <div class="sign-detail">
        <v-header @goback="goback" title="担保流程" next="提交" @submit="_postGuaranteeProcess"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-text label="客户姓名" :value="customer.clientName"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.clientPhone"></rs-text></li>
                <li class="placeholder"></li> 
                <li><rs-select selectText="是否需要盖章" :options="options.needStamp" model="isNeedStamp" @selected="selected"></rs-select></li>  
                <li v-show="obj.isNeedStamp === 1"><rs-select selectText="盖章通过时间" model="stampTime" @selected="selected" :isDate="true"></rs-select></li>  
                <li><rs-select selectText="出担保函日期" model="guaranteeTime" @selected="selected" :isDate="true"></rs-select></li>  
            </ul>
        </rs-list>           
    </div>
</template>

<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters, mapMutations} from 'vuex';
import {postGuaranteeProcess, postSkipZhengping} from '@/api/api';
export default {
  data() {
    return {
      obj: {
        guaranteeId: null,
        isNeedStamp: null,
        stampTime: 0,
        guaranteeTime: null,
      },
      options: {
        needStamp: [{id: 0, value: '否'}, {id: 1, value: '是'}],
      },
    };
  },
  methods: {
    _postGuaranteeProcess() {
      this.obj.guaranteeId = this.customer.id;
      postGuaranteeProcess(this.customer.id, this.obj).then(res => {
        if (res.result) {
          if(this.customer.extra.commentType === '正评') {
              postSkipZhengping(this.customer.id);
              this.goback()
          }else{
              this.goback()
          }        
        }
      });
    },
    selected(id, model) {
      if (model === 'isNeedStamp') {
        this.obj[model] = parseInt(id);
        return;
      }
      this.obj[model] = new Date(id).getTime();
    },
    goback() {
      this.$router.push({path: '/erGuarantee'});
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
}
</style>
