<template>
  <div class="blog-article">
    <div class="ql-snow ql-container">
      <div class="ql-editor" v-html="html" />
    </div>
    <mu-button class="pull-right" flat color="#42c02e" @click="editBlog">编辑文章</mu-button>
  </div>
</template>

<script>
import api from '@/service/api'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'Article',

  data () {
    return {
      html: ''
    }
  },

  created () {
    this.getBolg(this.$route.params.id)
  },

  methods: {
    // 获取文章内容
    async getBolg (id) {
      let res = await this.$http.get(api.blog.getById, { params: { id } })
      this.html = res.content
    },

    // 编辑文章
    editBlog () {
      this.$router.push({ name: 'blogEdit', params: { id: this.$route.params.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.blog-article {
  width: 80%;
  margin: 0 auto;
  padding-top: 70px;
  .ql-container.ql-snow {
    border: 0 none;
  }
}
</style>
