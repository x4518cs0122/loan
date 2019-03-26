<template>
  <div class="fangkuan">
    <v-header @goback="goback" @submit="submit" title="确定收费状态" next="提交"></v-header>
    <cube-form :model="obj" :immediate-validate="false" ref="form">
      <cube-form-group>
        <cube-form-item :field="id" class="self-form-item">
          <p>{{customer.id}}</p>
        </cube-form-item>
        <cube-form-item :field="time" class="self-form-item">
          <Date-picker :model="obj" modelKey="time"></Date-picker>
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
import { mapGetters, mapActions } from 'vuex';
import { changeChargeState } from '@/api/api';
import { DatePicker } from 'base';
export default {
  data() {
    return {
      obj: {
        time: null,
        type: '',
        amount: '',
        bank: '',
        remitter: ''
      },
      time: {
        modelKey: 'time',
        label: '回款时间',
        rules: {
          required: true
        }
      },
      id: {
        modelKey: 'id',
        label: '贷款编号'
      },
      fields: [
        {
          type: 'input',
          modelKey: 'type',
          label: '回款类型',
          props: {
            placeholder: '请输入回款类型'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'amount',
          label: '回款金额(元)',
          props: {
            placeholder: '请输入回款金额'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'bank',
          label: '转账银行',
          props: {
            placeholder: '请输入转账银行全称'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'remitter',
          label: '转账人',
          props: {
            placeholder: '请输入转账人姓名'
          },
          rules: {
            required: true
          }
        }
      ]
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    selected(id, model) {
      this.obj[model] = new Date(id).getTime();
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
          changeChargeState(this.customer.id, this.obj)
            .then(res => {
              if (res.result) {
                this.getCharge();
                this.goback();
              }
              this.toastHide();
            })
            .catch(err => {
              this.toastHide();
              this.$createToast({
                mask: true,
                txt: '请求走丢了，请重新提交'
              });
            });
        }
      });
    },
    ...mapActions(['getCharge'])
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
