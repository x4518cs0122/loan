<template>
  <div class="sign-detail">
    <v-header @goback="goback" title="确定抵押状态" next="提交" @submit="_postMortgageInfo"></v-header>
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
        <cube-form-item :field="file" class="self-form-item">
          <input type="file" @change="getFile">
        </cube-form-item>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import vHeader from 'components/header/header';
import { DatePicker } from 'base';
import { mapGetters, mapMutations } from 'vuex';
import { postMortgageInfo, postFile } from '@/api/api';
export default {
  data() {
    return {
      obj: {
        time: null,
        certificate: null
      },
      time: {
        label: '完成时间',
        modelKey: 'time',
        rules: {
          required: true
        }
      },
      file:{
        label: '产证信息'
      },
      toast:null
    };
  },
  methods: {
    getFile(e) {
      const file = event.target.files[0];
      const imgMasSize = 1024 * 1024 * 5;
      const formData = new FormData();

      if(file.size > imgMasSize) {
        this.$createToast({
          mask: true,
          txt: '图片最大限制5M',
          type: 'txt'
        }).show()
      }
      this.showToast()
      postFile(formData).then(res => {
        this.obj.certificate = _.get(res, 'data', null)
        this.hideToast()
      })
    },
    showToast() {
      if(!this.toast) {
        this.toast = this.$createToast({
          mask: true,
          time: 0
        });
      }
      this.toast.show()
    },
    hideToast() {
      this.toast.hide()
    },
    _postMortgageInfo() {
      this.$refs.form.validate(success => {
        if (success) {
          this.showToast()
          postMortgageInfo(this.customer.id, this.obj.time).then(
            res => {
              if (res.result) {
                this.goback();
              }
              this.hideToast()
            },
            err => {
              this.hideToast()
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
      this.$router.push({ path: '/erMortgage' });
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
