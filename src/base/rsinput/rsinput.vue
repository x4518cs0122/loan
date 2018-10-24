<template>
    <div class="input-wrapper" >
        <label class="text" :for="inputText">{{inputText}}</label>
        <input type="text" 
            :placeholder="placeholder" 
            :id="inputText" 
            v-model="currentValue">
        <span class="tips" v-if="tips">{{tips}}</span>
    </div>
</template>

<script type='text/ecmascript-6'>
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
            type:String,
            default: ''
        }
    },
    data () {
      return {
          currentValue:this.value
      }
    },
    created () {
        this.$watch('currentValue',(newValue) =>{
            this.$emit('input', newValue, this.model)
        })
    },
    computed: {
        placeholder() {
            return `请输入${this.inputText}`
        }
    },
    // watch:{
    //     value(newVal) {
    //         this.currentValue = newVal
    //     }
    // }
  }
</script>

<style lang='stylus' scoped>
.input-wrapper
    height 18px
    line-height 18px
    padding 15px 20px 15px 0
    margin-left: 20px
    display flex
    background $color-white
    font-size $font-size-medium
    border-bottom 1px solid  $color-border
    .text
        flex 0 0 90px
    input 
        flex 1
        outline none
    .tips
        flex 0 0 30px
</style>