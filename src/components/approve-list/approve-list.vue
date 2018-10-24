<template>
    <div class="approve-list">
        <v-header  @goback="goback" :title="title"></v-header>
        <detail-list :list="list" @itemHandle="select"></detail-list> 
    </div>
</template>

<script>
import vHeader from 'components/header/header'
import detailList from 'base/detail-list/detail-list'
 export default {
    props:{
        list:{
            type:Array,
            default:()=>{
                return []
            }
        },
        title:{
             type:String,
             default:''
        }
    },
    components: {
        detailList,
        vHeader
    },
    methods:{
        goback(){
            this.$router.push({path:'/bussiness'})
        },
        select(index){
            this.$emit('select',index)
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
</style>
