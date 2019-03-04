<template>
  <div class="blog-edit">
    <div class="blog-edit-title">
      <mu-text-field v-model="blog_title" :placeholder="placeholder" color="#42c02e" full-width @focus="clearPlaceholder" @blur="appendPlaceholder"></mu-text-field>
      <mu-button class="blog-btn-publish" round color="#42c02e" @click="submit">发布</mu-button>
    </div>

    <mavon-editor code-style="atom-one-dark" v-if="editor === 'markdown'" v-model="content_markdown" />

    <quill-editor :options="option" v-else v-model="content_quill" />
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
      placeholder: '请输入文章标题...',
      blog_title: '',
      content_quill: '',
      content_markdown: '',
      option: {
        placeholder: '开始编辑...'
      }
    }
  },

  created () {
    if (this.$route.params.id !== 'new') {
      this.getBolg(this.$route.params.id)
    }
  },

  methods: {
    // 清除placeholder
    clearPlaceholder () {
      this.placeholder = ''
    },

    // 显示placeholder
    appendPlaceholder () {
      this.placeholder = '请输入文章标题...'
    },

    // 获取文章内容
    async getBolg (id) {
      let res = await this.$http.get(api.blog.getById, { params: { id } })
      this.editor = res.blog_type
      this.blog_title = res.title
      if (this.editor === 'markdown') {
        this.content_markdown = res.content
      } else {
        this.content_quill = res.content
      }
    },

    // 提交
    submit () {
      if (!this.blog_title) {
        return this.$alert('请输入文章标题', '提示')
      }
      if (!this.content_markdown || !this.content_quill) {
        return this.$alert('请输入文章内容', '提示')
      }
      this.publish()
    },

    // 发布
    async publish () {
      if (this.$route.params.id === 'new') { // 新增
        let blog = {
          title: this.blog_title,
          content: this.content_quill || this.content_markdown,
          blog_type: 'markdown'
        }
        await this.$http.post(api.blog.add, blog)
      } else { // 更新
        let blog = {
          id: this.$route.params.id,
          title: this.blog_title,
          content: this.content_quill || this.content_markdown
        }
        await this.$http.put(api.blog.update, blog)
      }
    }
  }
}
</script>

<style lang="less">
.blog-edit {
  padding: 10px 0;

  .blog-edit-title {
    width: 60%;
    margin: 0 auto;
    position: relative;

    .mu-text-field-input {
      height: 50px;
      text-align: center;
      font-size: 30px;
      &::-ms-input-placeholder,
      &::-webkit-input-placeholder,
      &::-moz-placeholder {
        text-align: center !important;
        font-size: 30px !important;
        color: red;
      }
    }

    .blog-btn-publish {
      position: absolute;
      bottom: 30px;
      right: -200px;
    }
  }

  .quill-editor {
    width: 85%;
    margin: 0 auto;

    .ql-container.ql-snow {
      height: calc(100vh - 200px);
    }
  }
}
</style>
