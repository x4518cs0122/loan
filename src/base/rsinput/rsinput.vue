<template>
  <div>
    <div class="input-wrapper" >
      <label class="text" :class="inputText.length > 5? 'small-font': ''" :for="inputText">
        <span v-if="required" class="required">*</span>{{inputText}}
      </label>
      <input :type="type" 
          :placeholder="placeholder || defaultPlaceholder" 
          :id="inputText" 
          v-model="currentValue">
      <span class="tips" v-if="tips">{{tips}}</span>    
    </div>
    <p v-show="!valid && !empty" class="warning">{{message}}</p>
    <p v-show="empty" class="warning">必填项</p>
  </div>  
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    model: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    inputText: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      defult: '',
    },
    validation: {
      type: RegExp,
      default: null,
    },
    /**不合法输入提示信息 */
    message: {
      type: String,
      default: '输入不合法',
    },
    /**是否必填 */
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      valid: true,
      empty: false,
    };
  },
  created() {
    /**使用偷懒的方式 监听输入,做正则匹配 */
    this.$watch('currentValue', newValue => {
      if (this.validation) {
        this.valid = this.validation.test(newValue);
      }
      if (this.required) {
        this.empty = newValue == '' ? true : false;
      }
      if (!this.required && newValue == '') {
        this.valid = true;
      }
      this.$emit('input', newValue, this.model, this.valid);
    });
  },
  computed: {
    defaultPlaceholder() {
      return `请输入${this.inputText}`;
    },
  },
  watch: {
    value(newVal) {
      this.currentValue = newVal;
    },
  },
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.input-wrapper {
  height: 18px;
  line-height: 18px;
  padding: 15px 20px 15px 0;
  margin-left: 20px;
  display: flex;
  background: $color-white;
  font-size: $font-size-medium;
  border-bottom: 1px solid $color-border;

  .text {
    flex: 0 0 90px;
    position: relative;

    .required {
      position: absolute;
      width: 5px;
      left: -10px;
      color: $color-required;
    }
  }

  .small-font {
    font-size: $font-size-small;
  }

  input {
    flex: 1;
    outline: none;
  }

  .tips {
    flex: 0 0 30px;
  }
}

.warning {
  font-size: $font-size-small;
  color: $color-warning;
  margin-left: 110px;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>