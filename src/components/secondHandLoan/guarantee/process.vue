<template>
  <div class="sign-detail">
    <v-header @goback="goback" title="担保流程" next="提交" @submit="_postGuaranteeProcess"></v-header>
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
        <cube-form-item :field="stamp" class="self-form-item"></cube-form-item>
        <cube-form-item :field="stampTime" class="self-form-item" v-if="obj.isNeedStamp">
          <Date-picker :model="obj" modelKey="stampTime"></Date-picker>
        </cube-form-item>
        <cube-form-item :field="guaranteeTime" class="self-form-item">
          <Date-picker :model="obj" modelKey="guaranteeTime"></Date-picker>
        </cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import vHeader from 'components/header/header';
import { DatePicker } from 'base';
import { mapGetters, mapMutations } from 'vuex';
import { postGuaranteeProcess, postSkipZhengping } from '@/api/api';
export default {
  data() {
    return {
      obj: {
        guaranteeId: null,
        isNeedStamp: null,
        stampTime: null,
        guaranteeTime: null
      },
      stamp: {
        type: 'select',
        modelKey: 'isNeedStamp',
        label: '是否需要盖章',
        props: {
          options: [{ value: 0, text: '否' }, { value: 1, text: '是' }]
        },
        rules: {
          required: true
        }
      },
      stampTime: {
        modelKey: 'stampTime',
        label: '盖章通过时间',
        rules: {
          required: true
        }
      },
      guaranteeTime: {
        modelKey: 'guaranteeTime',
        label: '出担保函日期',
        rules: {
          required: true
        }
      }
    };
  },
  methods: {
    showToast() {
      if (!this.toast) {
        this.toast = this.$createToast({
          mask: true,
          time: 0
        });
      }
      this.toast.show();
    },
    hideToast() {
      this.toast.hide();
    },
    _postGuaranteeProcess() {
      this.$refs.form.validate(success => {
        if (success) {
          this.showToast();
          this.obj.guaranteeId = this.customer.id;
          postGuaranteeProcess(this.customer.id, this.obj).then(
            res => {
              if (res.result) {
                if (this.customer.extra.commentType === '正评') {
                  postSkipZhengping(this.customer.id).then(
                    res => {
                      if (res.result) {
                        this.hideToast();
                        this.goback();
                      }
                    },
                    err => {
                      this.hideToast();
                      this.$createToast({
                        mask: true,
                        txt: err,
                        type: 'txt'
                      }).show();
                    }
                  );
                } else {
                  this.hideToast();
                  this.goback();
                }
              }
            },
            err => {
              this.hideToast();
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
    selected(id, model) {
      if (model === 'isNeedStamp') {
        this.obj[model] = parseInt(id);
        return;
      }
      this.obj[model] = new Date(id).getTime();
    },
    goback() {
      this.$router.push({ path: '/erGuarantee' });
    },
    ...mapMutations({
      setCustomer: 'SET_CUSTOMER'
    })
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
