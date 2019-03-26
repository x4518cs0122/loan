<template>
  <div class="confirm-state">
    <v-header next="提交" title="二手房整件输机" @submit="submit" @goback="goback"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group legend="确定输机状态">
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="obj" modelKey="time"></Date-picker>
        </cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import {DatePicker} from 'base'
import { mapGetters } from 'vuex';
import { postInputState } from 'api/api';
export default {
  data() {
    return {
      obj: {
        orderId: null,
        time: null
      },
      time: {
        label: '输机完成时间',
        modelKey: 'time',
        rules: {
          required: true
        }
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: '/erWrite' });
    },
    submit() {
      this.$refs.form.validate(success => {
        if (success) {
          let toast = this.$createToast({
            mask: true,
            time: 0
          });
          toast.show();
          postInputState(this.customer.id, this.obj.time).then(res => {
            if (res.result) {
              this.goback();
            }
            toast.hide()
          },err =>{
            toast.hide();
            this.$createToast({
              mask: true,
              txt: err,
              type: 'txt'
            }).show()
          });
        }
      });
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
