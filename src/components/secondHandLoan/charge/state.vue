<template>
    <div class="sign-detail">
        <v-header @goback="goback" title="确定收费状态" next="提交" @submit="_postChargeDetail"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-text label="客户姓名" :value="customer.clientName"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.clientPhone"></rs-text></li>
                <li class="list-header">
                    <p>收费明细</p>
                </li> 
                <li><rs-select selectText="费用A状态" model="isA" @selected="selected" :options="options.isgo"></rs-select></li> 
                <li><rs-select selectText="收取费用A时间" model="timeA" @selected="selected" :isDate="true"></rs-select></li>   
                <li><rs-select selectText="费用B状态" model="isB" @selected="selected" :options="options.isgo"></rs-select></li> 
                <li><rs-select selectText="收取费用B时间" model="timeB" @selected="selected" :isDate="true"></rs-select></li>   
                <li><rs-select selectText="费用C状态" model="isC" @selected="selected" :options="options.isgo"></rs-select></li> 
                <li><rs-select selectText="收取费用C时间" model="timeC" @selected="selected" :isDate="true"></rs-select></li>   
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
import {postChargeDetail, allFinish} from '@/api/api';
export default {
  data() {
    return {
      obj: {
        chargeId: null,
        isA: null,
        timeA: null,
        isB: null,
        timeB: null,
        isC: null,
        timeC: null,
      },
      options: {
        isgo: [{id: '1', value: '是'}, {id: '0', value: '否'}],
      },
    };
  },
  methods: {
    _postChargeDetail() {
      this.obj.chargeId = this.customer.id;
      postChargeDetail(this.customer.id, this.obj).then(res => {
        if (res.result) {
          allFinish(this.customer.id).then(() => {
            this.goback();
          });
        }
      });
    },
    goback() {
      this.$router.push({path: '/erCharge'});
    },
    selected(id, model) {
      if (/^time[A-C]$/.test(model)) {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = id;
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
