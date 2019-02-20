<template>
  <div class="announce-card">
    <div class="card-header">今日任务</div>
    <div class="baget-wrapper">
      <Tag color="#67C37B">完成 0</Tag>
      <Tag color="#A9CEFF">待办 {{todos.length}}</Tag>
      <Tag color="#FF8871">警告 0</Tag>
    </div>
    <div class="btn-banli" @click="doRightNow">马上办理</div>
  </div>
</template>

<script>
import { Tag } from 'base';
// import
export default {
  props: {
    todos: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    doRightNow() {
      this.$emit('changeTab');
    }
  },
  components: { Tag }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.announce-card {
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 130px;
  width: 260px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 2px #ccc;
  color: $color-text-l;
  text-align: center;
  transform: translate3d(-50%, 0, 0);

  .card-header {
    font-size: 14px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .baget-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .btn-banli {
    display: inline-block;
    width: 140px;
    background: #4D50FE;
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
  }
}
</style>


