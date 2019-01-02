<template>
    <div class="placeOrder">
        <v-header title="下单" @goback="goback" @submit="submit" next="提交"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.id"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="评估公司" valueType="1" model="company" @selected="selected"></rs-select></li>
            </ul>
        </rs-list>
    </div>
</template>

<script>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsText from 'base/rstext/rstext'
import rsSelect from 'base/rsselect/rsselect'
import {mapGetters} from 'vuex'
import {postEvaluateOrder} from 'api/api'
 export default {
     data(){
         return{
             obj:{
                time:'',
                company:''
            }
         }
     },
     methods:{
         selected(id, model) {
             if(model === 'time'){
                 this.obj[model] = new Date(id).getTime()
                 return
             }
            this.obj[model] = parseInt(id)
         },
         goback(){
             this.$router.push({path:'/evaluate'})
         },
         submit(){
             this.obj.orderId = this.customer.id
             postEvaluateOrder(this.obj).then((res)=>{
                 if(res.result){
                     this.goback()
                 }
             })
         }
     },
     computed:{
         ...mapGetters([
             'customer'
         ])
     },
     components: {
         vHeader,
         rsList,
         rsText,
         rsSelect
     }
 }
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable'
.placeOrder
    position fixed 
    top 0
    bottom 0
    left 0
    right 0
    overflow auto
    background $color-background
 
</style>
