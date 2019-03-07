<template>
  <div :class="`page-${name}`">
    <slot></slot>
    <div v-if="loading" class="loading-opacity">
      <cube-loading :size="40"></cube-loading>
    </div>
  </div>
</template>

<script>
/**
 *  @author 天一
 *  @desc 统一处理页面的loading效果,传入name值用于定于页面
 */
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="stylus" scoped>
.loading-opacity {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #e7e5e4;
  opacity: 0.5;
  display: flex;
  justify-content: center;

  .cube-loading {
    display: flex;
    align-items: center;
  }
}
</style>
