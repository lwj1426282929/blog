<template>
  <div class="blog-edit">
    <mavon-editor v-if="editor === 'markdown'"
                  code-style="atom-one-dark"
                  v-model="content_markdown" />

    <quill-editor v-else
                  v-model="content_quill"
                  :options="option" />
    <button @click="submit">提交</button>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import api from '@/service/api'

export default {
  name: 'BlogEdit',

  components: {
    mavonEditor,
    quillEditor
  },

  data () {
    return {
      editor: 'quill',
      content_quill: '',
      content_markdown: '',
      option: {
        placeholder: '开始编辑...'
      }
    }
  },

  created () {
    this.getBolg(this.$route.params.id)
  },

  methods: {
    // 获取文章内容
    async getBolg (id) {
      let res = await this.$http.get(api.blog.getById, { params: { id } })
      this.editor = res.blog_type
      if (this.editor === 'markdown') {
        this.content_markdown = res.content
      } else {
        this.content_quill = res.content
      }
    },

    // 提交
    async submit () {
      let blog = {
        id: this.$route.params.id,
        title: '123',
        content: this.content_quill || this.content_markdown,
        markdown_content: this.editor
      }
      let res = await this.$http.put(api.blog.update, blog)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.blog-edit {
  width: 60%;
  margin: 0 auto;
}
</style>
