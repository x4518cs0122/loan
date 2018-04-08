<template> 
    <div class="mortgage">
        <v-header :title="title" @back="back" ></v-header>
        <detail-list :list="list" @itemHandle="itemHandle"></detail-list>
        <router-view></router-view>
    </div>
</template>

<script>
import detailList from 'base/detail-list/detail-list'
import {getMortgage} from 'api/api'
import vHeader from 'base/header/header'
import {mapMutations} from 'vuex'
 export default {
    data(){
        return{
            list:[],
            title:'抵押面签列表',
            detail:false
        }
    },
    created() {
        this._getMortgage()
    },
    methods:{
        _getMortgage(){
            getMortgage().then((res)=>{
                this.list = res.data
            })
        },
        back(){
            this.$router.back()
        },
        itemHandle(index){
            let customer = this.list[index]
            let path = ''
            if(customer.state === '待确定抵押时间'){
                path = '/mortgage/timePicker'   
            }else{
                path = 'mortgage/statusPicker'
            }
            this.$router.push({path:path})
            this.setCustomer(customer)
        },
        ...mapMutations({
            setCustomer:'SET_CUSTOMER'
        })
    },
    components: {
        detailList,
        vHeader,
    }
 }
</script>

<style lang='stylus' scoped>

 
</style>
