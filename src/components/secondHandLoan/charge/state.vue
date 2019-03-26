<template>
  <div class="sign-detail">
    <v-header @goback="goback" title="确定收费状态" next="提交" @submit="_postChargeDetail"></v-header>
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
      <cube-form-group v-for="item in fileds" :key="item.modelKey" :legend="item.label">
        <cube-form-item :field="item" class="self-form-item"/>
        <div v-if="obj[item.modelKey] === 1">
          <cube-form-item
            :field="f"
            v-for="f in item.children"
            :key="f.modelKey"
            class="self-form-item"
          >
            <Date-picker :model="obj" :modelKey="f.modelKey" v-if="f.selfItem"></Date-picker>
          </cube-form-item>
        </div>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import vHeader from 'components/header/header';
import { DatePicker } from 'base';
import { mapGetters, mapMutations } from 'vuex';
import { postChargeDetail, allFinish } from '@/api/api';
export default {
  data() {
    return {
      obj: {
        chargeId: null,
        isA: null,
        timeA: null,
        typeA: null,
        amountA: null,
        bankA: null,
        remitterA: null,
        isB: null,
        timeB: null,
        typeB: null,
        amountB: null,
        bankB: null,
        remitterB: null,
        isC: null,
        timeC: null,
        typeC: null,
        amountC: null,
        bankC: null,
        remitterC: null
      },
      fileds: [
        {
          type: 'select',
          modelKey: 'isA',
          label: '费用A状态',
          props: {
            options: [{ value: 0, text: '否' }, { value: 1, text: '是' }]
          },
          rules: {
            required: true
          },
          children: [
            {
              type: 'select',
              modelKey: 'timeA',
              label: '回款时间',
              selfItem: true,
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              label: '回款类型',
              modelKey: 'typeA',
              props: {
                placeholder: '请输入回款类型'
              }
            },
            {
              type: 'input',
              label: '回款金额(元)',
              modelKey: 'amountA',
              props: {
                placeholder: '请输入回款金额'
              }
            },
            {
              type: 'input',
              label: '转账银行',
              modelKey: 'bankA',
              props: {
                placeholder: '请输入转账银行'
              }
            },
            {
              type: 'input',
              label: '转账人',
              modelKey: 'remitterA',
              props: {
                placeholder: '请输入转账人姓名'
              }
            }
          ]
        },
        {
          type: 'select',
          modelKey: 'isB',
          label: '费用B状态',
          props: {
            options: [{ value: 0, text: '否' }, { value: 1, text: '是' }]
          },
          rules: {
            required: true
          },
          children: [
            {
              type: 'select',
              modelKey: 'timeB',
              label: '回款时间',
              selfItem: true,
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              label: '回款类型',
              modelKey: 'typeB',
              props: {
                placeholder: '请输入回款类型'
              }
            },
            {
              type: 'input',
              label: '回款金额(元)',
              modelKey: 'amountB',
              props: {
                placeholder: '请输入回款金额'
              }
            },
            {
              type: 'input',
              label: '转账银行',
              modelKey: 'bankB',
              props: {
                placeholder: '请输入转账银行'
              }
            },
            {
              type: 'input',
              label: '转账人',
              modelKey: 'remitterB',
              props: {
                placeholder: '请输入转账人姓名'
              }
            }
          ]
        },
        {
          type: 'select',
          modelKey: 'isC',
          label: '费用C状态',
          props: {
            options: [{ value: 0, text: '否' }, { value: 1, text: '是' }]
          },
          rules: {
            required: true
          },
          children: [
            {
              type: 'select',
              modelKey: 'timeC',
              label: '回款时间',
              selfItem: true,
              rules: {
                required: true
              }
            },
            {
              type: 'input',
              label: '回款类型',
              modelKey: 'typeC',
              props: {
                placeholder: '请输入回款类型'
              }
            },
            {
              type: 'input',
              label: '回款金额(元)',
              modelKey: 'amountC',
              props: {
                placeholder: '请输入回款金额'
              }
            },
            {
              type: 'input',
              label: '转账银行',
              modelKey: 'bankC',
              props: {
                placeholder: '请输入转账银行'
              }
            },
            {
              type: 'input',
              label: '转账人',
              modelKey: 'remitterC',
              props: {
                placeholder: '请输入转账人姓名'
              }
            }
          ]
        }
      ]
    };
  },
  methods: {
    _postChargeDetail() {
      this.obj.chargeId = this.customer.id;
      this.$refs.form.validate(success => {
        if (success) {
          let toast = this.$createToast({
            mask: true,
            time: 0
          });
          toast.show();
          postChargeDetail(this.customer.id, this.obj).then(
            res => {
              if (res.result) {
                allFinish(this.customer.id).then(() => {
                  this.goback();
                  toast.hide();
                });
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
      this.$emit('hide');
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
