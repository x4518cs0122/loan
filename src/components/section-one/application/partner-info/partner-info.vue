<template>
    <div class="partner-info">
        <h2 class="title">配偶信息</h2>
        <div class="input-wrapper">
            <span class="text">姓名</span>
            <input type="text" placeholder="输入配偶姓名">
        </div>
        <div class="input-wrapper">
            <span class="text">手机号码</span>
            <input type="text" placeholder="输入配偶手机号码">
        </div>
        <div class="select-wrapper">
            <span class="text">证件类型</span>
            <span class="desc"></span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <div class="select-wrapper">
            <span class="text">是否共同申请</span>
            <span class="desc"></span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
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


