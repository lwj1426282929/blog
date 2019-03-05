<template>
  <div class="blog-edit">
    <div class="blog-edit-title">
      <mu-text-field v-model="blog_title" :placeholder="placeholder" color="#42c02e" full-width @focus="clearPlaceholder" @blur="appendPlaceholder"></mu-text-field>
      <mu-button class="blog-btn-publish" round color="#42c02e" @click="submit" v-loading="publishing">发布</mu-button>
      <mu-button class="blog-btn-cancle" flat round color="#42c02e" @click="cancle">取消</mu-button>
    </div>

    <mavon-editor ishljs code-style="atom-one-dark" v-if="editor === 'markdown'" v-model="markdown_content" @change="change" />

    <quill-editor :options="option" v-else v-model="content_quill" />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import api from '@/service/api'
import { mapState } from 'vuex'

export default {
  name: 'BlogEdit',

  components: {
    mavonEditor,
    quillEditor
  },

  data () {
    return {
      editor: '',
      placeholder: '请输入文章标题...',
      blog_title: '',
      content_quill: '',
      content_markdown: '',
      markdown_content: '',
      option: {
        placeholder: '开始编辑...'
      },
      publishing: true
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.userInfo
    })
  },

  created () {
    if (this.$route.params.id !== 'new') {
      this.getBolg(this.$route.params.id)
    } else {
      this.editor = this.user.editor
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
        this.markdown_content = res.markdown_content
      } else {
        this.content_quill = res.content
      }
    },

    // 提交
    submit () {
      if (!this.blog_title) {
        return this.$alert('请输入文章标题', '提示')
      }
      if ((this.editor === 'markdown' && !this.content_markdown) || (this.editor === 'quill' && !this.content_quill)) {
        return this.$alert('请输入文章内容', '提示')
      }
      this.publish()
    },

    // 发布
    async publish () {
      this.publishing = true
      if (this.$route.params.id === 'new') { // 新增
        let blog = {
          title: this.blog_title,
          blog_type: this.editor,
          author: this.user.name
        }
        blog.content = this.editor === 'markdown' ? this.content_markdown : this.content_quill
        blog.markdown_content = this.editor === 'markdown' ? this.markdown_content : ''
        await this.$http.post(api.blog.add, blog)
      } else { // 更新
        let blog = {
          id: this.$route.params.id,
          title: this.blog_title
        }
        blog.content = this.editor === 'markdown' ? this.content_markdown : this.content_quill
        blog.markdown_content = this.editor === 'markdown' ? this.markdown_content : ''
        await this.$http.put(api.blog.update, blog)
      }
      this.publishing = false
    },

    // 取消
    cancle () {
      this.$confirm('是否确定取消?  取消之后不会保存您所编辑的文字', '提示').then(({ result, value }) => {
        if (result) {
          this.$router.push({ name: 'blogList' })
        }
      })
    },

    // markdown编辑
    change (value, render) {
      this.content_markdown = render.toString()
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
      right: -140px;
    }
    .blog-btn-cancle {
      position: absolute;
      bottom: 30px;
      right: -240px;
      border: 1px solid #42c02e;
      border-radius: 50px;
    }
  }

  .quill-editor {
    width: 85%;
    margin: 0 auto;

    .ql-container.ql-snow {
      height: calc(100vh - 150px);
    }
  }

  .markdown-body {
    height: calc(100vh - 110px);
  }
}
</style>
