<template>
    <div class="erjiedan">
        <v-header :back="back" title="二手房接单" @goback="goback"></v-header>
        <rs-list>
            <ul slot="body">
                <li class="list-header"> 
                    <p>借款人基本信息</p>
                </li>
                <li><rs-select selectText="完成时间" :options="time" model="time" @selected="selected" :isDate="true"></rs-select></li>
                <li><rs-input @input="rsinput" inputText="姓名" model="name"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="联系方式" model="phone"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="工作单位"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="单位电话"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="月均收入"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="联系地址"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="户口所在地"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="证件名称"></rs-input></li>
                <li class="no-border"><rs-input @input="rsinput" inputText="证件号码"></rs-input></li>
                <li class="list-header"> 
                    <p>借款人配偶基本信息</p>
                </li>
                <li><rs-input @input="rsinput" inputText="配偶姓名" model="name"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="联系方式" model="phone"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="工作单位"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="单位电话"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="证件名称"></rs-input></li>
                <li><rs-input @input="rsinput" inputText="证件号码"></rs-input></li>
            </ul>
        </rs-list>
    </div>     
</template>

<script type='text/ecmascript-6'>
import vHeader from 'components/header/header'
import rsList from 'base/rslist/rslist'
import rsInput from 'base/rsinput/rsinput'
import rsSelect from 'base/rsselect/rsselect'
  export default {
    data () {
      return {
          currentindex : 1,
          time:[{key:1,value:'2029'},{key:2,value:'20292'}],
          dataInfo:{}
      }
    },
    components:{vHeader, rsList, rsSelect, rsInput},
    computed:{
        back() {
            return this.currentindex === 1 ? '返回':'上一页'
        },      
    },
    methods:{
        selected(key, model) {
            this.dataInfo[model] = key
        },
        goback() {
            if(this.currentindex === 1){
                console.log(this.dataInfo)
                this.$router.back()
                return
            }
            this.currentindex--
            console.log()
        },
        rsinput(value, model) {
            this.dataInfo[model] = value
        }
    },
    created () {
        
    }
  }
</script>

<style lang='stylus' scoped>

</style>