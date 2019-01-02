<template>
    <div>
        <ul class="detail-list" v-if="list.length > 0">
            <li class="list-item" v-for="(item,index) in list" :key="index" @click="itemHandle(index)">
                <div class="state-wrapper">
                    <span class="id">{{index+1}}.</span>
                    <span class="state">{{state || item.currentState}}</span>
                    <span class="state">{{loanStates[item.state]}}</span>
                </div>
                <div class="info">
                    <span class="name">客户:{{item.clientName}}</span>
                    <span class="phone">联系方式:{{item.clientPhone}}</span>
                </div>
            </li>
            <li>
                <div class="load-more" >
                    <p v-if="hasmore&&!loading" @click.stop="loadmore">点击加载更多</p>
                    <span v-if="hasmore&&loading"><i class="fa fa-spinner fa-pulse icon" aria-hidden="true" ></i>&nbsp;加载中</span>
                    <p v-if="!hasmore">没有更多了..</p>
                </div>
            </li>
        </ul>
        <h3 class="empty" v-else>列表为空</h3>
    </div>
</template>
<script>
import {loanStates} from '@/utils/Const';
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    state: {
      type: String,
      default: '',
    },
    loading: {
        type: Boolean,
        default: false
    },
    hasmore: {
        type: Boolean,
        default: false
    }
  },
  created() {
    this.loanStates = loanStates;
  },
  methods: {
    itemHandle(index) {
      this.$emit('itemHandle', index);
    },
    loadmore() {
        this.$emit('loadmore')
    }
  },
  components: {},
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

// .fix {
    .detail-list {
        position: relative;
        width: 100%;
        // overflow: auto;
        background: $color-background;

        .list-item {
            padding: 20px 30px;
            background: $color-white;
            border-bottom: 2px solid $color-border;

            .state-wrapper {
                font-size: $font-size-medium;
                color: $color-text-l;
                margin-bottom: 10px;

                .id {
                    margin-right: 5px;
                }

                .state {
                    margin-right: 5px;
                }
            }

            .info {
                font-size: $font-size-small;
                color: $color-text-ll;
            }
        }
        .load-more{
            height:30px;
            line-height:30px
            font-size :$font-size-small
            color:$color-loadmore
            text-align center
            .icon{
                font-size $font-size-medium
            }
        }
    }

    .empty {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
// }
</style>


