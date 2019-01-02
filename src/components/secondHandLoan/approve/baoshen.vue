<template>
    <div class="confirm-state">
        <v-header next="提交" title="确定报审时间" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li class="list-header"> 
                    <p>确定报审时间</p>
                </li>
                <li><rs-select selectText="上报审批时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters} from 'vuex';
import {postApproveBaoshen} from 'api/api';
export default {
  data() {
    return {
      obj: {
        approveId: null,
        time: null
      },
    };
  },
  methods: {
    goback() {
      this.$router.push({path: '/erApprove'});
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
    },
    submit() {
      postApproveBaoshen(this.customer.id, this.obj.time).then(res => {
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
