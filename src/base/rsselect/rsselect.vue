<template>
    <!-- 待优化：缓存select-options的值 -->
    <div>
        <div class="select-wrapper" @click="pop">
            <span class="text">
                <span class="required">*</span>{{selectText}}
            </span>
            <span class="desc">{{currentOption || initValue}}</span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <select-list :options='selection' @choosed="choosed" ref="selectList"></select-list>
        <date-picker ref="datePicker" @submit="submit"></date-picker>
    </div>
</template>

<script type='text/ecmascript-6'>
import selectList from './select-list';
import datePicker from 'base/datePicker/datePicker';
import {getOptions} from '@/api/api';
export default {
  props: {
    selectText: {
      type: String,
      default: '',
    },
    //   options格式为对象，至少包含两个属性key和value，其中key为实际值，value为显示值
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    valueType: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: '',
    },
    isDate: {
      type: Boolean,
      default: false,
    },
    initSelection: {},
  },
  mounted() {
    /**若取不到返回值，就使用传入的默认props.options */
    if (this.valueType) {
      getOptions(this.valueType).then(res => {
        if (res.data) {
          this.selection = res.data;
        }
      });
    }
  },
  data() {
    return {
      currentOption: '',
      selection: this.options,
    };
  },
  components: {selectList, datePicker},
  methods: {
    choosed(item) {
      this.currentOption = item.value;
      this.$emit('selected', item.id, this.model);
    },
    submit(date) {
      this.currentOption = date;
      this.$emit('selected', date, this.model);
    },
    pop() {
      if (this.isDate) {
        this.$refs.datePicker.toggleList();
        return;
      }
      if (this.valueType && this.selection.length === 0) {
        /**重新请求，若没有data则回退到bussiness  暂定 */
      }
      if (this.selection.length === 0) {
        this.$emit('clicked');
        return;
      }
      this.$refs.selectList.show();
    },
  },
  computed: {
    initValue() {
      if (this.isDate) {
        return this.initSelection;
      }
      if (!this.initSelection || !/^[0-9]$/.test(this.initSelection)) {
        return;
      }
      let item = this.selection.find(item => {
        return item.id == this.initSelection;
      });
      return item.value;
    },
  },
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.select-wrapper {
    height: 18px;
    line-height: 18px;
    padding: 15px 20px;
    display: flex;
    font-size: $font-size-medium;
    background: $color-white;
    border-bottom: 1px solid $color-border;
    .text {
        flex: 1;
        position relative
        .required {
            position: absolute;
            width: 5px;
            left: -10px;
            color: $color-required;
        }
    }

    .desc {
        flex: 0 0 122px;
        text-align: right;
        padding-right: 20px;
        color: $color-theme;
    }

    .icon {
        flex: 0 0 16px;
        color: $color-icon-right;
        font-size: $font-size-medium-x;
    }
}
</style>