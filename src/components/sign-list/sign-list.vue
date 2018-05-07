<template>
  <div class="sign-list">
    <app-title :title="title" @back="back"></app-title>
    <div class="scroll">
      <detail-list :list='list' @itemHandle='select'></detail-list>
    </div>  
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import appTitle from 'base/header/header'
 export default {
   props:{
       title:{
           type:String,
           default:''
       },
       list:{
           type:Array,
           default:()=>{
                return []
           }
       }
    },
   components: {
     detailList,
     appTitle
   },
   methods:{
     back(){
       this.$router.back()
     },
     select(index){
         this.$emit('select',index)
     }
   }
 }
</script>

<style lang='stylus' scoped>
.scroll
  position absolute 
  top 54px
  bottom 0
  left 0
  right 0
  overflow hidden
 
</style>
