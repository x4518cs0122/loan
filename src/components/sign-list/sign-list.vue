<template>
  <div class="sign-list">
    <v-header @back="back" :title="title"></v-header>
    <div class="scroll">
      <detail-list :list='list' @itemHandle='select'></detail-list>
    </div>  
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import vHeader from 'base/header/header'
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
