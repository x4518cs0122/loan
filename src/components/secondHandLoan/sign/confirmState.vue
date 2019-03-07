<template>
  <div class="confirm-state">
    <v-header next="提交" title="确定面签状态" @submit="submit" @goback="goback"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item :field="id" class="self-form-item">
          <p>{{customer.id}}</p>
        </cube-form-item>
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="obj" modelKey="time"></Date-picker>
        </cube-form-item>
        <cube-form-item :field="address" class="self-form-item"></cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import { mapGetters, mapActions } from 'vuex';
import { postSHVisa, getOptions } from 'api/api';
import { formatAxiosOptions } from '@/components/mortgageLoan/utils';
import { DatePicker } from 'base';
export default {
  data() {
    return {
      obj: {
        visaId: 1,
        time: null,
        address: null
      },
      id: {
        label: '贷款编号',
        modelKey: 'visaId'
      },
      time: {
        label: '完成时间',
        modelKey: 'time',
        rules: {
          required: true
        }
      },
      address: {}
    };
  },
  created() {
    this.initFileds();
  },
  methods: {
    goback() {
      this.$router.push({ path: '/sign' });
    },
    initFileds() {
      getOptions(0).then(res => {
        if (res.result) {
          this.address = {
            type: 'select',
            modelKey: 'address',
            label: '面签地点',
            props: {
              options: formatAxiosOptions(res.data)
            }
          };
        }
      });
    },
    submit() {
      this.$refs.form.validate(success => {
        if (success) {
          let toast = this.$createToast({
            mask: true,
            time: 0
          });
          toast.show();
          postSHVisa(this.customer.id, this.obj.time, this.obj.address)
            .then(res => {
              if (res.result) {
                this.getSignList();
                this.$router.push({ path: '/erSign' });
              }
              toast.hide();
            })
            .catch(err => {
              toast.hide();
            });
        }
      });
    },
    ...mapActions(['getSignList'])
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
@import '~common/stylus/mixin';

.confirm-state {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
