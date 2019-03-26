<template>
  <div class="confirm-state">
    <v-header next="提交" title="确定房查征信状态" @submit="submit" @goback="goback"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group legend="确定房查征信状态">
        <cube-form-item
          :field="item"
          v-for="item in time"
          :key="item.modelKey"
          class="self-form-item"
        >
          <Date-picker :model="obj" :modelKey="item.modelKey"></Date-picker>
        </cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import { DatePicker } from 'base';
import { mapGetters } from 'vuex';
import { postCheck } from 'api/api';
export default {
  data() {
    return {
      obj: {
        orderId: null,
        houseTime: null,
        creditTime: null
      },
      time: [
        {
          label: '房查完成时间',
          modelKey: 'houseTime',
          rules: {
            required: true
          }
        },
        {
          label: '征信完成时间',
          modelKey: 'creditTime',
          rules: {
            required: true
          }
        }
      ]
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: '/erwrite' });
    },
    submit() {
      this.$refs.form.validate(success => {
        if (success) {
          let toast = this.$createToast({
            mask: true,
            time: 0
          });
          toast.show();
          postCheck(this.customer.id, this.obj.houseTime, this.obj.creditTime).then(res => {
            if (res.result) {
              this.goback();
            }
            toast.hide();
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
