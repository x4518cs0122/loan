<template>
    <div class="confirm-state">
        <v-header next="提交" title="确定放款" @submit="submit" @goback="goback"></v-header>
        <rs-list>
             <ul slot="body">
                <li class="list-header"> 
                    <p>确定放款</p>
                </li>
                <li><rs-select selectText="是否放款" :options="options.isgo"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>
<script>
import vHeader from 'components/header/header';
import rsList from 'base/rslist/rslist';
import rsSelect from 'base/rsselect/rsselect';
import {mapGetters} from 'vuex';
import {postMoneyState} from 'api/api';
export default {
  data() {
    return {
      options:{
          isgo:[{id:1, value:'是'}, {id:0, value:'否'}]
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({path: '/erGetmoney'});
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
    },
    submit() {
      postMoneyState(this.customer.id).then(res => {
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
