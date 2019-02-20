<template>
  <div class="page-personal-center">
    <div class="card-wrapper">
      <div class="card-left">
        <h3 class="name">{{user.name}}</h3>
        <p class="department">日晟行&nbsp;>&nbsp;管理员</p>
        <p class="phone">手机号:{{user.phone}}</p>
      </div>
      <div class="card-right">
        <div class="avatar">
          <p class="inner">{{nickname}}</p>
        </div>
      </div>
    </div>
    <ul class="diy-wrapper">
      <li class="diy-item">
        <span class="icon-wrapper">
          <i class="fa fa-user icon" aria-hidden="true"></i>
        </span>
        <p class="text">修改密码</p>
        <span class="arrow">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
      <li class="diy-item">
        <span class="icon-wrapper">
          <i class="fa fa-cog icon" aria-hidden="true"></i>
        </span>
        <p class="text">设置</p>
        <span class="arrow">
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </li>
      <!-- <li class="diy-item">
                <span class="icon-wrapper "><i class="fa fa-cog icon" aria-hidden="true"></i></span>
                <p class="text">修改密码</p>
      </li>-->
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import tab from 'components/tab/tab';

export default {
  data() {
    return {
      list: []
    };
  },
  components: { tab },
  methods: {},
  computed: {
    ...mapGetters(['user']),
    nickname() {
      return this.user.name.split('')[1];
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.page-personal-center {
  background: $pure-white;
  padding-top: 20px;
  height: 100%;

  .card-wrapper {
    position: relative;
    margin: 20px;
    margin-top: 0;
    padding: 10px;
    display: flex;
    border: 1px solid $color-light-grey;
    height: 80px;
    border-radius: 5px;
    box-shadow: 2px 1px 1px $color-light-grey;

    .card-left {
      flex-shrink: 1;
      flex-grow: 1;

      .name {
        padding-top: 5px;
        padding-left: 5px;
      }

      .department, .phone {
        font-size: $font-size-small;
        color: $color-grey;
        margin-top: 25px;
      }

      .phone {
        margin-top: 10px;
      }
    }

    .card-right {
      width: 100px;
      text-align: right;

      .avatar {
        position: relative;
        display: inline-block;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        border: 1px solid $color-light-grey;
        background: $avatar-background;

        .inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          color: $pure-white;
          font-size: $font-size-small;
        }
      }
    }
  }

  .diy-wrapper {
    padding: 20px;

    .diy-item {
      display: flex;
      position: relative;
      font-size: $font-size-medium;
      color: $color-text-l;
      height: 40px;
      line-height: 40px;
      align-items: center;

      .icon-wrapper {
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        background: $color-warning;
        margin-right: 20px;

        .icon {
          color: $pure-white;
        }
      }

      .text {
        flex-shrink: 1;
        flex-grow: 1;
        border-bottom: 1px solid $color-light-grey;
      }

      .arrow {
        position: absolute;
        right: 10px;
        color: $color-grey;
      }
    }
  }
}
</style>
