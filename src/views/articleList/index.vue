<template>
  <div class="markdown-container" v-html="html" />
</template>

<script>
import axios from 'axios'
export default {
  name: 'Article',

  data () {
    return {
      html: ''
    }
  },

  created () {
    let id = this.$route.params.id
    console.log(id)
    axios.get('/blog', { params: { id } }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.markdown-container {
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
