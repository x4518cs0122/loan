<template>
  <div class="branch">
    <v-header title="报审" next="提交" @goback="goback" @submit="submit"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group>
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
import { mapGetters, mapActions } from 'vuex';
import { baoshen } from 'api/api';
export default {
  data() {
    return {
      obj: {
        time: ''
      },
      time: {
        modelKey: 'time',
        label: '完成时间',
        rules: {
          required: true
        }
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: `/approve/${this.customer.id}` });
    },
    selected(key, model) {
      this.obj[model] = new Date(key).getTime();
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
          this.toastShow()
          baoshen(this.obj.time, this.customer.id).then(res => {
            if(res.result){
              this.goback();
              this.getApprove()
              this.toastHide()
            } 
          });
        }

      });
    },
    ...mapActions(['getApprove'])
  },
  components: {
    vHeader,
    DatePicker
  },
  computed: {
    ...mapGetters(['customer'])
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.branch {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
