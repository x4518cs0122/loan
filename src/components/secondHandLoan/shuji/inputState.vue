<template>
    <div class="confirm-state">
        <v-header next="提交" title="二手房整件输机" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li class="list-header"> 
                    <p>确定输机状态</p>
                </li>
                <li><rs-select selectText="输机完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters} from 'vuex';
import {postInputState} from 'api/api';
export default {
  data() {
    return {
      obj: {
        orderId: null,
        time: null
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({path: '/erWrite'});
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
    },
    submit() {
      postInputState(this.customer.id, this.obj.time).then(res => {
        if (res.result) {
          this.goback()
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
    rsList
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
