<template>
  <div class="confirm-state">
    <v-header next="提交" title="确定放款" @submit="submit" @goback="goback"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group legend="确定放款">
        <cube-form-item
          :field="item"
          v-for="item in times"
          :key="item.modelKey"
          class="self-form-item"
        >
          <Date-picker :model="obj" :modelKey="item.modelKey"></Date-picker>
        </cube-form-item>
        <cube-form-item :field="fields" class="self-form-item"></cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import { DatePicker } from 'base';
import { mapGetters } from 'vuex';
import { postMoneyState } from 'api/api';
export default {
  data() {
    return {
      obj: {
        loanId: null,
        result:null,
        loanTime: null,
        backTime: null,
        name: null
      },
      times: [
        {
          type: 'input',
          label: '回款情况',
          modelKey: 'result',
          props: {
            placeholder: '请输入领证人姓名'
          },
          rules: {
            required: true
          }
        },
        {
          label: '放款时间',
          modelKey: 'loanTime',
          rules: {
            required: true
          }
        },
        {
          label: '证回公司时间',
          modelKey: 'backTime'
        }
      ],
      fields: {
        type: 'input',
        modelKey: 'name',
        label: '领证人姓名',
        props: {
          placeholder: '请输入领证人姓名'
        },
        rules: {
          required: true
        }
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: '/erGetmoney' });
    },
    submit() {
      let toast = this.$createToast({
        mask: true,
        time: 0
      });
      toast.show();
      postMoneyState(this.customer.id, this.obj).then(
        res => {
          if (res.result) {
            this.goback();
          }
          toast.hide();
        },
        err => {
          toast.hide();
          this.$createToast({
            mask: true,
            txt: err,
            type: 'txt'
          }).show();
        }
      );
    }
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: {
    vHeader,
    DatePicker
  }
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
