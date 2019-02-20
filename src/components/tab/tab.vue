<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/bussiness">   
        <span class="fa fa-list-ul icon" aria-hidden="true"></span>   
        <div class="tab-link">业务</div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/todo">
        <span class="fa fa-check-circle-o icon" aria-hidden="true"></span>
        <div class="tab-link">待办</div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/query">
        <span class="fa fa-search icon" aria-hidden="true"></span>
        <div class="tab-link">查询</div>
    </router-link>
    <router-link tag="div" class="tab-item" to="/personalCenter">
        <span class="fa fa-user-circle icon" aria-hidden="true"></span>
        <div class="tab-link">我的</div>
    </router-link>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.tab {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 40px;
    padding-top: 10px;
    font-size: $font-size-medium;
    border-top: 1px solid rgb(228, 228, 228);
    background: -webkit-linear-gradient($color-border, $pure-white);
    background: -o-linear-gradient($color-border, $pure-white); 
    background: -moz-linear-gradient($color-border, $pure-white); 
    background: linear-gradient($color-border, $pure-white);
    z-index: 2
    .tab-item {
        flex: 1;
        text-align: center;
        .icon {
            font-size: $font-size-large;
            margin-bottom: 3px;
        }

        .tab-link {
            color: $color-text-l;
            font-size: $font-size-small;
            padding-bottom: 5px;
        }

        &.router-link-active {
            .tab-link, .icon {
                color: $base-golden;
            }
        }
    }
}
</style>


