<template>
    <div class="login">
        <h2 class="header">登录</h2>
        <p class="message" v-show="message">{{message}}</p>
        <div class="name">
            <input type="text" placeholder="用户名" v-model="name" class="input">
            <i class="el-icon-close clear" @click="clear"></i>
            <i class="el-icon-arrow-down collapse"></i>
        </div>
        <div class="password">
            <input type="text" placeholder="密码" v-model="password" class="input">
        </div>
        <div class="botton" @click="_login">
            <el-button type="danger" class="inner">登录</el-button>
        </div>
        <p class="forget">忘记密码</p>
    </div>
</template>

<script>
import {login} from 'api/api'
 export default {
     data(){
         return{
             name:"",
             password:"",
             message:''
         }
     },
     methods:{
         clear(){
             this.name = ""
         },
         _login(){
             let data = {
                            name:this.name,
                            password:this.password
                        }
             login(data).then((res)=>{
                 console.log(res)
                 if(!res.data.status){
                     this.message = res.data.message
                 }else{
                     const token = res.headers.token
                     sessionStorage.setItem("token", token)
                     this.$router.push({path:'/bussiness'})
                 }
                 
             })
         }
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.login
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .header
        margin-top 70px
        margin-bottom 30px
        width 100%
        text-align center
        font-size 30px
        font-weight 200
    .message
        color $color-warning
        margin 0 0 10px 20px
        font-size 14px
    .name,.password
        display flex
        line-height 30px
        height 30px
        margin 0 20px
        font-size 20px
        margin-bottom 30px
        border-bottom 1px solid $color-mingxi
        .input
            flex 1
            font-size 16px
            outline none
        .clear
            flex 0 0 30px
        .collapse   
            flex 0 0 30px
    .botton
        width 100%
        text-align center
        .inner
            width 60%
    .forget
        width 100%
        text-align center
        font-size 14px
        margin-top 20px
</style>
