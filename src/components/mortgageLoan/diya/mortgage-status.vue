<template>
  <div class="mortgage-status">
    <v-header title="确定抵押状态" @goback="goback" @submit="submit" next="提交"></v-header>
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
import { mapGetters, mapActions } from 'vuex';
import { changeMortgageState, passMortgage } from '@/api/api';
import {DatePicker} from 'base'
export default {
  data() {
    return {
      obj: {
        time: null,
        //   不添加担保函功能
        isNeedGuaranteeL: null
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
      this.$router.push({ path: '/mortgage' });
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
          changeMortgageState(this.customer.id, this.obj.time)
            .then(res => {
              if (res.result) {
                passMortgage(this.customer.id)
                  .then(res => {
                    this.toastHide();
                    if (res.result) {
                      this.getMortgage()
                      this.goback();
                    }
                  })
                  .catch(err => {
                    this.toastHide();
                  });
              } else {
                this.toastHide();
              }
            })
            .catch(err => {
              this.toastHide();
            });
        }
      });
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
    },
    ...mapActions(['getMortgage'])
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: {
    DatePicker,
    vHeader
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.mortgage-status {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
