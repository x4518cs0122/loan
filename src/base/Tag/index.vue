<template>
  <div class="rs-tag" :style="{background: color}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  }
};
</script>
<style lang="stylus" scoped>
.rs-tag {
  display: flex;
  width: 50px;
  height: 20px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  margin-right: 5px;

  &::last-child {
    margin-right: 0;
  }
}
</style>

