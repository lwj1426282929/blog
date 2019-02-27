<template>
  <div class="article-edit">
    <mavon-editor v-if="editor = 'markdown'" code-style="atom-one-dark" v-model="context" @save="save" @imgAdd="imgAdd" @imgDel="imgDel" />

    <quill-editor v-else v-model="content" :options="option" />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'ArticleEdit',

  components: {
    mavonEditor,
    quillEditor
  },

  data () { 
    return {
      editor: 'markdown',
      context: '',
      html: '',
      content: '',
      option: {
        placeholder: '开始编辑...'
      }
    }
  },

  methods: {
    // 保存
    save (value, render) {
      this.html = render.toString()
      console.log(this.html)
    },

    // 添加图片
    imgAdd (name, file) {
      console.log(name)
      console.log(file)
    },

    // 删除图片
    imgDel (name) {
      console.log(name)
    }
  }
}
</script>

<style lang="less" scoped>
.article-edit {
}
</style>
