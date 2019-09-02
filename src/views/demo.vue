<template>
<input type="text" id="test" v-model="date" class="ipt" @click="getDate" >
</template>

js方法：
<script>
import laydate from '../mock/laydate.js'
  export  default {
    data(){
      return {
        data:[]
      }
    },
    methods:{
     getDate () {
       debugger
       console.log(0)
       laydate.render({
          elem: '#test',
          done: (value) => {
            this.date = value
          }
        })
     }
    }
  }
</script>