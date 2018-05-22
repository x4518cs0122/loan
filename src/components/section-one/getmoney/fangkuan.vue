<template>
    <div class="fangkuan">
        <v-header @back="back" @submit="submit" title="放款状态"></v-header>
        <div class="select-wrapper" @click="pop(item)">
            <span class="text">{{item.text}}</span>
            <span class="desc">{{item.status}}</span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <pop :options="item.options" ref="pop" @choosed="choosed"></pop>
    </div>
</template>

<script>
import pop from 'base/pop-up/pop-up'
import vHeader from 'base/header/header'
 export default {
     data(){
         return{
             item:{
                 text:'放款状态',
                 status:'',
                 options:['已放','未放']
             }
         }
     },
     methods:{
         pop(){
             this.$refs.pop.show()
         },
         choosed(option){
             this.item.status = option
         },
         back(){
             this.$router.back()
         },
         submit(){
             console.log(this.item.status+' has commited!')
         }
     },
     components:{
         pop,
         vHeader
     }
 }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.fangkuan
    position fixed 
    top 52px
    bottom 0
    left 0
    right 0
    overflow hidden
    background $color-background
    .select-wrapper
        select-wrapper()
    
</style>
