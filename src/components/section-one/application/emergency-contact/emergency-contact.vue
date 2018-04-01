<template>
    <div class="emergency-contact">
        <h2 class="title">其它紧急联系人信息（不承担贷款相关责任）</h2>
        <div class="input-wrapper">
            <span class="text">姓名</span>
            <input type="text" placeholder="输入紧急联系人姓名">
        </div>
        <div class="select-wrapper">
            <span class="text">是您的</span>
            <span class="desc"></span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <div class="input-wrapper">
            <span class="text">住宅号码</span>
            <input type="text" placeholder="输入电话格式：区号-号码">
        </div>
        <div class="input-wrapper">
            <span class="text">手机号码</span>
            <input type="text" placeholder="输入手机号码">
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.title
    title()
.select-wrapper
    select-wrapper()
.input-wrapper
    input-wrapper()
</style>


