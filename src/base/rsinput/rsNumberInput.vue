<template>
    <div>
        <rs-input 
            :placeholder="placeholder" 
            :inputText="inputText" 
            :model="model"
            :value="valuetoString"
            :tips="tips"
            :required="required"
            @input="input"
            message="请输入数字"
            :validation="commonValidations.numberValidation"
        ></rs-input>
    </div>
</template>

<script type='text/ecmascript-6'>
import rsInput from './rsinput'
import {commonValidations} from '@/utils/Const.js'
  export default {
    props:{
        model:{
            type:String,
            default:''
        },
        inputText:{
            type:String,
            default:''
        },
        tips:{
            type:String,
            default:''
        },
        value:{
            type: Number,
            default: null
        },
        placeholder:{
            type: String,
            defult:''
        },
        required:{
            type:Boolean,
            default: true
        }
    },
    data () {
      return {
          commonValidations:commonValidations
      }
    },
    components:{rsInput},
    methods:{
        input(value, model) {
            if(/^[0-9]+(\.[0-9]*)?$/.test(value) || value === ''){
                this.$emit('input',parseFloat(value), model)   
            }
        }
    },
    computed: {
        valuetoString() {
            if(!this.value){
                return 
            }
            let value = this.value.toString() || ''
            return value 
        }
    }
  }
</script>

<style lang='stylus' scoped>
@import "~common/stylus/variable"
.warning
    font-size: $font-size-small
    color: $color-warning
    margin-left: 110px

</style>