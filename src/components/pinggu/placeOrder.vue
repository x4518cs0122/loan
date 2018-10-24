<template>
    <div class="placeOrder">
        <v-header title="下单" @goback="goback" @submit="submit" next="提交"></v-header>
        <rs-list>
            <ul slot="body">
                <li><rs-text label="贷款编号" :value="customer.taskId"></rs-text></li>
                <li><rs-select selectText="完成时间" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-select selectText="评估公司" :options="options.company" model="company" @selected="selected"></rs-select></li>
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
            },
            options:{
                company:[{key:0, value:'管理自定义'}]
            }
         }
     },
     methods:{
         selected(key, model) {
            this.obj[model] = key
         },
         goback(){
             this.$router.push({path:'/evaluate'})
         },
         submit(){
             this.obj.taskId = this.customer.taskId
             postEvaluateOrder(this.obj).then((res)=>{
                 if(res.status === 1){
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
