<template>
    <div class="bank-status">
        <v-header :title="title" :next="next" @back="back"></v-header>
    </div>
</template>
<script>
import vHeader from 'base/header/header'
export default {
  data(){
    return{
      title:'分行审批',
      next:'提交'
    }
  },
  methods:{
    back(){
      this.$router.back()
    }
  },
  components:{
    vHeader
  }
}
</script>
<style lang="stylus" scoped>

</style>
