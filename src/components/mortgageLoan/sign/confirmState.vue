<template>
  <div class="confirm-state">
    <v-header next="提交" title="确定面签状态" @submit="submit" @goback="goback"></v-header>
    <cube-form :model="model" :immediate-validate="false" ref="form">
      <cube-form-group legend="状态信息">
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="model" modelKey="time"></Date-picker>
        </cube-form-item>
        <cube-form-item
          :field="item"
          v-for="item in fields"
          :key="item.modelKey"
          class="self-form-item"
        ></cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import vHeader from 'components/header/header';
import { mapGetters } from 'vuex';
import { postVisa, getOptions } from 'api/api';
import { DatePicker } from 'base';
import { formatAxiosOptions } from '../utils';
export default {
  data() {
    return {
      addressOptions: [],
      model: {
        visaId: null,
        time: null,
        address: null
      },
      time: {
        modelKey: 'time',
        label: '完成时间',
        rules: {
          required: true
        }
      },
      fields: []
    };
  },
  created() {
    getOptions(0).then(res => {
      this.addressOptions = formatAxiosOptions(res.data);
      this.initFields();
    });
  },
  methods: {
    goback() {
      this.$router.push({ path: '/sign' });
    },
    initFields() {
      this.fields = [
        {
          type: 'select',
          modelKey: 'address',
          label: '面签地点',
          props: {
            options: this.addressOptions
          },
          rules: {
            required: true
          }
        }
      ];
    },
    submit() {
      this.$refs.form.validate(success => {
        if (success) {
          this.model.visaId = this.customer.id;
          postVisa(this.model).then(
            res => {
              if (res.result) {
                this.$router.push({ path: '/sign' });
              }
            },
            err => {
              this.showToast('请求迷路啦～');
            }
          );
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
