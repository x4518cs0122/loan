<template>
  <div class="sign-detail">
    <v-header @goback="goback" title="确定过户状态" next="提交" @submit="_postHuizheng"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
       <cube-form-group>
        <cube-form-item :field="{label:'贷款编号'}" class="self-form-item">
          <p>{{customer.id}}</p>
        </cube-form-item>
        <cube-form-item :field="{label:'客户姓名'}" class="self-form-item">
          <p>{{customer.clientName}}</p>
        </cube-form-item>
        <cube-form-item :field="{label:'联系方式'}" class="self-form-item">
          <p>{{customer.clientPhone}}</p>
        </cube-form-item>
      </cube-form-group>
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
import { mapGetters } from 'vuex';
import { DatePicker } from 'base';
import { postGuohuInfo } from '@/api/api';
export default {
  data() {
    return {
      obj: {
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
    _postHuizheng() {
      this.$refs.form.validate(success => {
        if (success) {
          let toast = this.$createToast({
            mask: true,
            time: 0
          });
          toast.show();
          postGuohuInfo(this.customer.id, this.obj.time).then(
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
      });
    },
    goback() {
      this.$router.push({ path: '/erGuohu' });
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
