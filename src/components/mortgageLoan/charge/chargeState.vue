<template>
    <div class="fangkuan">
        <v-header @goback="goback" @submit="submit" title="确定收费状态" next="提交"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-select selectText="完成收费时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
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
import {changeChargeState} from '@/api/api'
export default {
  data() {
    return {
      obj:{
          time: null
      }
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
    },
    submit() {
      if(!this.obj.time){
          return
      }
      changeChargeState(this.customer.id, this.obj.time).then(res =>{
          res.result && this.goback()
      })
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

.fangkuan {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: $color-background;
}
</style>
