<template>
    <div class="sign-detail">
        <v-header @goback="goback" title="确定回证时间" next="提交" @submit="_postGuohuState"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="placeholder"> </li>
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-text label="客户姓名" :value="customer.clientName"></rs-text></li>
                <li><rs-text label="联系方式" :value="customer.clientPhone"></rs-text></li>
                <li class="placeholder"></li> 
                <li><rs-select selectText="回证日期" model="time" @selected="selected" :isDate="true"></rs-select></li>  
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
import {postGuohuState} from '@/api/api';
export default {
  data() {
    return {
      obj: {
        time: null,
      },
    };
  },
  methods: {
    _postGuohuState() {
      postGuohuState(this.customer.id, this.obj.time).then(res =>{
          if(res.result){
              this.goback()
          }
      })
    },
    goback() {
      this.$router.push({path: '/erGuohu'});
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
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
    rsList
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
