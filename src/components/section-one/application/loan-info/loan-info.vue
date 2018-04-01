<template>
    <div class="loan-info">
        <h2 class="title">借款情况申请</h2>
        <div class="input-wrapper">
            <span class="text">申请金额</span>
            <input type="text" placeholder="输入申请金额（元）">
        </div>
        <div class="input-wrapper">
            <span class="text">申请期限</span>
            <input type="text" placeholder="输入申请期限">
        </div>
        <div class="select-wrapper">
            <span class="text">申请授信方式</span>
            <span class="desc"></span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <div class="input-wrapper">
            <span class="text">借款用途</span>
            <input type="text" placeholder="输入借款用途">
        </div>
        <div class="select-wrapper">
            <span class="text">还款方式</span>
            <span class="desc"></span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <div class="input-wrapper">
            <span class="text">备注</span>
            <input type="text" placeholder="输入其它备注事项">
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


