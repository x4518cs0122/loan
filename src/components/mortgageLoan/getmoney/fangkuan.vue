<template>
  <div class="fangkuan">
    <v-header @goback="goback" @submit="submit" title="确定放款状态" next="提交"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item :field="id" class="self-form-item">
          <p>{{customer.id}}</p>
        </cube-form-item>
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="obj" modelKey="time"></Date-picker>
        </cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import vHeader from 'components/header/header';
import { mapGetters } from 'vuex';
import { changeMoneyState } from '@/api/api';
import {DatePicker} from 'base'
export default {
  data() {
    return {
      obj: {
        time: null
      },
      time: {
        modelKey: 'time',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      id: {
        modelKey: 'id',
        label: '贷款编号'
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: `/getmoney` });
    },
    toastShow() {
      if (!this.toast) {
        this.toast = this.$createToast({
          mask: true,
          time: 0
        });
      }
      this.toast.show();
    },
    toastHide() {
      this.toast.hide();
    },
    submit() {
      this.$refs.form.validate(success => {
        if (success) {
          this.toastShow();
          changeMoneyState(this.customer.id, this.obj.time)
            .then(res => {
              res.result && this.goback();
              this.toastHide();
            })
            .catch(err => {
              this.toastHide();
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
