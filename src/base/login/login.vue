<template>
  <div class="login">
    <div class="login-icon">
      <img src="../../../static/images/loginIcon.png" width="80" height="80">
    </div>
    <p class="message" v-show="message">{{message}}</p>
    <div class="name">
      <input type="text" placeholder="用户名" v-model="userInfo.name" class="input">
      <i class="el-icon-close clear" @click="clear"></i>
      <i class="el-icon-arrow-down collapse"></i>
    </div>
    <div class="password">
      <input type="password" placeholder="密码" v-model="userInfo.password" class="input">
    </div>
    <div class="botton" @click="loginByUsername">
      <cube-button :primary="true" class="inner">登录</cube-button>
    </div>
    <!-- <p class="forget">忘记密码</p> -->
  </div>
</template>

<script>
import { login } from 'api/api';
import { setToken } from 'common/js/utils';
export default {
  data() {
    return {
      userInfo: {
        name: '15972102336',
        password: 'zyq123456'
        // name:'',
        // password:''
      },
      message: ''
    };
  },
  methods: {
    clear() {
      this.userInfo.name = '';
      this.userInfo.password = '';
    },
    loginByUsername() {
      const userInfo = this.userInfo;
      this.$store
        .dispatch('setUserInfo', userInfo)
        .then(res => {
          this.$router.push({ name: 'bussiness' });
        })
        .catch(err => {
          console.log(err);
          this.message = err;
        });
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable';

.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: $color-white;

  .login-icon {
    margin: 50px 0 50px 0;
    text-align: center;
  }

  .message {
    color: $color-warning;
    margin: 0 0 10px 20px;
    font-size: 14px;
  }

  .name, .password {
    display: flex;
    line-height: 30px;
    height: 30px;
    margin: 0 20px;
    font-size: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid $color-mingxi;

    .input {
      flex: 1;
      font-size: 16px;
      outline: none;
    }

    .clear {
      flex: 0 0 30px;
    }

    .collapse {
      flex: 0 0 30px;
    }
  }

  .botton {
    width: 100%;
    text-align: center;

    .inner {
      width: 60%;
      background: #ff0200;
    }

    .cube-btn {
      display: inline;
      padding: 10px;
    }
  }

  .forget {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
  }
}
</style>
