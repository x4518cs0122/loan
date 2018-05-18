<template>
    <div class="approve-list">
        <v-header  @back="back"></v-header>
        <div class="list-wrapper">
            <detail-list :list="list" @itemHandle="select"></detail-list> 
        </div>
    </div>
</template>

<script>
import vHeader from 'base/header/header'
import detailList from 'base/detail-list/detail-list'
import Scroll from 'base/scroll/scroll'
import {getApprove} from 'api/api'
import {mapMutations} from 'vuex'
 export default {
    props:{
        list:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    components: {
        detailList,
        Scroll,
        vHeader
    },
    methods:{
        back(){
            this.$router.back()
        },
        select(index){
            this.$emit('select',index)
        }
    },
    computed:{
        title(){
            let metas = this.$route.matched
            return metas[metas.length-1].meta.title
        }
    }
}
</script>

<style lang='stylus' scoped>
.approve-list
    position fixed 
    top 0
    bottom 0
    right 0
    left 0
    .list-wrapper
        position fixed 
        top 52px
        bottom 0
        right 0
        left 0
        overflow hidden
</style>
