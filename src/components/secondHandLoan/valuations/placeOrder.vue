<template>
    <div class="confirm-state">
        <v-header next="提交" title="下单" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li class="list-header"> 
                    <p>确定下单状态</p>
                </li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="评估公司" valueType="1" model="company" @selected="selected"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsInput from 'base/rsinput/rsinput';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters} from 'vuex';
import {confirmEvaluate} from 'api/api';
export default {
  data() {
    return {
      obj: {
        orderId: null,
        time: null,
        company: null,
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({path: '/erEvaluate'});
    },
    selected(id, model) {
      if (model === 'time') {
        this.obj[model] = new Date(id).getTime();
        return;
      }
      this.obj[model] = parseInt(id);
    },
    submit() {
      confirmEvaluate(this.customer.id, this.obj.time, this.obj.company).then(res => {
        if (res.result) {
          this.$router.push({path: '/erEvaluate'});
        }
      });
    },
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: {
    vHeader,
    rsSelect,
    rsList,
    rsInput,
  },
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';
.confirm-state {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background: $color-background;
}
</style>
