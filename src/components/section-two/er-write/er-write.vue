<template>
  <div class="sign-list">
    <v-header title="二手房整件输机列表" @back="back"></v-header>
    <div class="scroll">
      <detail-list :list='list' @itemHandle='select'></detail-list>
    </div>  
    <router-view></router-view>
  </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import vHeader from 'base/header/header'
import {getEvaluate} from 'api/api'
import {mapMutations} from 'vuex'
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
     vHeader
   },
   created(){
       this._getEvaluate()
   },
   methods:{
      _getEvaluate(){
        getEvaluate().then((res)=>{
            this.list = res.data
        })
     },
     back(){
       this.$router.back()
     },
     select(index){
        let customer = this.list[index]
        this.setCustomer(customer)      
        this.$router.push({path:'/erWrite/progress'})
     },
     ...mapMutations({
        setCustomer:'SET_CUSTOMER'
     })
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
