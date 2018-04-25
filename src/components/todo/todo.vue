<template>
  <div class="todo">
      <Nav :title="title"></Nav>
      <div class="content">
          <detai-list :list="todos"></detai-list>
      </div>
      <tab></tab>
  </div>
</template>
<script>
import {getTodo} from 'api/todo'
import {ERR_OK} from 'api/config'
import Nav from 'components/nav/nav'
import tab from 'components/tab/tab'
import detaiList from 'base/detail-list/detail-list'

export default {
  data(){
      return{
          todos:[],
          title:'待办事项'
      }
  },
  created () {
    this._getTodo()  
  },
  methods:{
      _getTodo(){
          getTodo().then((res)=>{     
            console.log(res)     
            this.todos = res.data
          })
      }
  },
  components: {
      detaiList,
      tab,
      Nav
  }
}
</script>
<style lang="stylus" scoped>
    .content
        position absolute 
        top 52px
        bottom 77px
        left 0
        right 0
        overflow hidden
        
</style>


