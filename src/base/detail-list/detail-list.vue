<template>
    <div>
        <ul class="detail-list" v-if="list.length > 0">
            <li class="list-item" v-for="(item,index) in list" :key="index" @click="itemHandle(index)">
                <div class="state-wrapper">
                    <span class="id">{{index+1}}.</span>
                    <span class="state">{{state || item.state}}</span>
                    <span class="state" v-if="item.report_type">已出{{item.report_type}}</span>
                </div>
                <div class="info">
                    <span class="name">客户:{{item.name}}</span>
                    <span class="phone">联系方式:{{item.phone}}</span>
                </div>
            </li>
        </ul>
        <h3 class="empty" v-else>列表为空</h3>
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default: ()=>{
                return []
            }
        },
        state:{
            type:String,
            default:''
        }
    },
    methods:{
        itemHandle(index){
            this.$emit('itemHandle',index)
        }
    },
    components:{}
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
    .detail-list
        position relative
        width 100%
        overflow auto 
        background $color-background
        .list-item
            padding 20px 30px
            background $color-white
            border-bottom 2px solid $color-border  
            .state-wrapper  
                font-size $font-size-medium    
                color $color-text-l    
                margin-bottom 10px
                .id
                    margin-right 5px
                .state
                    margin-right 5px
            .info
                font-size $font-size-small
                color $color-text-ll
    .empty
        position: fixed
        top: 50%
        left: 50%
        transform translate3d(-50%, -50%, 0)
            

</style>


