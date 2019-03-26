<template>
    <div class="confirm-state">
        <v-header next="提交" title="下单" @submit="submit" @goback="goback"></v-header>
        <cube-form :model="obj" :immediate-validate="false" ref="form1">
          <cube-form-group legend="下单状态">
            <cube-form-item :field="time" class="self-form-item">
              <Date-picker :model="obj" modelKey="time" ></Date-picker>
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
import {mapGetters} from 'vuex';
import {confirmEvaluate, getOptions} from 'api/api';
import {formatAxiosOptions} from '@/components/mortgageLoan/utils'
import {DatePicker} from 'base'
export default {
  data() {
    return {
      obj: {
        orderId: null,
        time: null,
        company: null,
      },
      time: {
        label: '完成时间',
        modelKey: 'time'
      },
      companyOptions:[],
      fields:[]
    };
  },
  created() {
    getOptions(1).then(res =>{
      if(res.result) {
        this.companyOptions = formatAxiosOptions(res.data)
        this.initFields()
      }
    })
  },
  methods: {
    goback() {
      this.$router.push({path: '/erEvaluate'});
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
            required: false
          }
        }
      ]
    },
    submit() {
      confirmEvaluate(this.customer.id, this.obj.time, this.obj.company).then(res => {
        if (res.result) {
          this.$router.push({path: '/erEvaluate'});
        }
      },err =>{
        console.log('helo')
      });
    },
  },
  computed: {
    ...mapGetters(['customer'])
  },
  components: {
    vHeader,
    DatePicker
  },
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
