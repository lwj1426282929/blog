<template>
  <div>
    <mavon-editor code-style="atom-one-dark" v-model="context" @save="save" @imgAdd="imgAdd" @imgDel="imgDel" />

    <quill-editor v-model="content" :options="option" />

    <div class="markdown-container" v-html="html" />

    <div class="ql-snow ql-container">
      <div class="ql-editor" v-html="content" />
    </div>
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
  name: 'HelloWorld',

  components: {
    mavonEditor,
    quillEditor
  },

  data () {
    return {
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

<style scoped>
.markdown-container {
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}

.pull-left,
.pull-right {
  float: left;
  width: 50%;
  height: 100%;
  border: 1px solid;
  box-sizing: border-box;
}
</style>
