<template>
  <div class="blog-edit">

    <input class="blog-edit-title"
           type="text"
           :placeholder="placeholder"
           v-model="blog_title"
           @focus="clearPlaceholder"
           @blur="appendPlaceholder" />

    <mavon-editor v-if="editor === 'markdown'"
                  code-style="atom-one-dark"
                  v-model="content_markdown" />

    <quill-editor v-else
                  v-model="content_quill"
                  :options="option" />

    <div class="blog-edit-foot">
      <div class="blog-btn blog-btn-publish"
           @click="submit">发布</div>
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
    async submit () {
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
  padding: 70px 10px 0px 10px;
  .blog-edit-title {
    margin: 0 auto;
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 30px;
    border: 0 none;

    &::-ms-input-placeholder,
    &::-webkit-input-placeholder,
    &::-moz-placeholder {
      text-align: center;
      font-size: 30px;
    }

    &:focus {
      outline: none;
    }
  }

  .quill-editor {
    width: 70%;
    margin: 0 auto;

    .ql-container.ql-snow {
      height: calc(100vh - 250px);
    }
  }

  .blog-edit-foot {
    width: 70%;
    height: 40px;
    margin: 0 auto;

    .blog-btn-publish {
      float: right;
      background: burlywood;
    }
  }
}
</style>
