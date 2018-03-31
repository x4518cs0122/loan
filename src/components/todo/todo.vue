<template>
  <div class="todo">
      <Nav :title="待办事项"></Nav>
      <div class="content">
          <detaiLList :list="todos"></detaiLList>
      </div>
      <tab></tab>
  </div>
</template>
<script>
import {getTodo} from 'api/todo'
import {ERR_OK} from 'api/config'
import Nav from 'components/nav/nav'
import tab from 'components/tab/tab'
import detaiLList from 'base/detail-list/detail-list'

export default {
  data(){
      return{
          todos:[]
      }
  },
  created () {
    this._getTodo()  
  },
  methods:{
      _getTodo(){
          getTodo().then((res)=>{
              if(res.errno === ERR_OK){
                  this.todos = res.data
              }
          })
      }
  },
  components: {
      detaiLList,
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


