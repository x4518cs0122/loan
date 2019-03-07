<template>
  <div class="evaluate-list">
    <v-header @goback="goback" :title="title"></v-header>
    <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list';
import vHeader from 'components/header/header';
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    goback() {
      this.$router.push({ path: '/bussiness' });
    },
    itemHandle(index) {
      this.$emit('select', index);
    }
  },
  components: {
    detailList,
    vHeader
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.evaluate-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: $color-background;
}
</style>
