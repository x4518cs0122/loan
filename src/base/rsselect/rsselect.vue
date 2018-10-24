<template>
    <div>
        <div class="select-wrapper" @click="pop">
            <span class="text">{{selectText}}</span>
            <span class="desc">{{currentOption}}</span>
            <span class="icon">
                <span class="fa fa-chevron-right" aria-hidden="true"></span>
            </span>
        </div>
        <select-list :options='options' @choosed="choosed" ref="selectList"></select-list>
        <date-picker ref="datePicker" @submit="submit"></date-picker>
    </div>
</template>

<script type='text/ecmascript-6'>
import selectList from 'base/pop-up/pop-up'
import datePicker from 'base/datePicker/datePicker'
  export default {
    props:{
      selectText:{
          type:String,
          default:''
      },
    //   options格式为对象，至少包含两个属性key和value，其中key为实际值，value为显示值
      options:{
          type:Array,
          default: () =>{
              return []
          }
      },
      model:{
          type:String,
          default:''
      },
      isDate:{
          type:Boolean,
          default:false
      }
    },
    data () {
      return {
          currentOption:''
      }
    },
    components:{selectList, datePicker},
    methods:{
        choosed(item) {
            this.currentOption = item.value
            this.$emit('selected', item.key, this.model)
        },
        submit(date) {
            this.currentOption = date
            this.$emit('selected', date, this.model)
        },
        pop() {
            if(this.isDate){
                this.$refs.datePicker.toggleList()
                return
            }
            if(this.options.length === 0){
                this.$emit('clicked')
                return
            }
            this.$refs.selectList.show()
        }
    }
  }
</script>

<style lang='stylus' scoped>
.select-wrapper
    height 18px
    line-height 18px
    padding 15px 20px
    display flex
    font-size $font-size-medium
    background $color-white
    border-bottom 1px solid  $color-border
    .text
        flex 1
    .desc
        flex 0 0 122px
        text-align right
        padding-right 20px
        color $color-theme
    .icon
        flex 0 0 16px
        color $color-icon-right
        font-size $font-size-medium-x

</style>