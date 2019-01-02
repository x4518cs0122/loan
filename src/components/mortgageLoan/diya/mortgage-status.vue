<template>
    <div class="mortgage-status">
        <v-header title="确定抵押状态" @goback="goback" @submit="submit" next="提交"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>

<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsText from 'base/rstext/rstext';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters} from 'vuex';
import {changeMortgageState, passMortgage} from '@/api/api'
export default {
  data() {
    return {
      obj: {
        time: null,
        //   不添加担保函功能
        isNeedGuaranteeL: null,
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({path: '/mortgage'});
    },
    submit() {
        changeMortgageState(this.customer.id, this.obj.time).then(res =>{
            if(res.result) {
                passMortgage(this.customer.id).then(res =>{
                    res.result && this.goback()
                })
            }
            // handle error waiting!
        })
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
    },
  },
  computed: {
    ...mapGetters(['customer']),
  },
  components: {
    rsList,
    rsText,
    rsSelect,
    vHeader,
  },
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.mortgage-status {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background: $color-background;
}
</style>
