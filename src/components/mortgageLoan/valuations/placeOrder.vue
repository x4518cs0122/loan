<template>
  <div class="placeOrder">
    <v-header title="下单" @goback="goback" @submit="submit" next="提交"></v-header>
    <cube-form :model="model" :immediate-validate="false" ref="form">
      <cube-form-group>
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
import { DatePicker } from 'base';
import { mapGetters, mapActions } from 'vuex';
import { postEvaluateOrder, getOptions } from 'api/api';
import { formatAxiosOptions } from '../utils';
export default {
  data() {
    return {
      model: {
        time: '',
        company: ''
      },
      fields: [],
      time: {
        modelKey: 'time',
        label: '完成时间',
        rules: {
          required: true
        }
      }
    };
  },
  created() {
    getOptions(1).then(res => {
      this.companyOptions = formatAxiosOptions(res.data);
      this.initFields();
    });
  },
  methods: {
    goback() {
      this.$router.push({ path: '/evaluate' });
      this._getEvaluate()
    },
    initFields() {
      this.fields = [
        {
          type: 'select',
          modelKey: 'company',
          label: '评估公司',
          props: {
            options: this.companyOptions
          },
          rules: {
            required: true
          }
        }
      ];
    },
    submit() {
      this.$refs.form.validate(suc => {
        if (suc) {
          this.model.orderId = this.customer.id;
          postEvaluateOrder(this.model).then(res => {
            if (res.result) {
              this.goback();
            }
          });
        }
      });
    },
    ...mapActions(['_getEvaluate'])
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

.placeOrder {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
