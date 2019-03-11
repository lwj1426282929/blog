<template>
  <div class="blog-edit">
    <div class="blog-edit-title">
      <mu-text-field v-model="blog_title" :placeholder="placeholder" color="#42c02e" full-width @focus="clearPlaceholder" @blur="appendPlaceholder"></mu-text-field>
      <mu-button class="blog-btn-publish" round color="#42c02e" @click="submit" :disabled="publishing">{{ publishText }}</mu-button>
      <mu-button class="blog-btn-cancle" flat round color="#42c02e" @click="cancle">取消</mu-button>
    </div>
    <div class="blog-edit-tags">
      <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" :class="'tag-' + tag.toLowerCase()">{{tag}}</el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
      <el-button v-else class="button-new-tag" size="small" :disabled="dynamicTags.length > 4" @click="showInput">+ New Tag</el-button>
    </div>

    <quill-editor :options="option" v-model="content_quill" />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import api from '@/service/api'
import { mapState } from 'vuex'
import { Message, Tag, Input, Button } from 'element-ui'

export default {
  name: 'QuillEdit',

  components: {
    quillEditor,
    'el-tag': Tag,
    'el-input': Input,
    'el-button': Button
  },

  data () {
    return {
      placeholder: '请输入文章标题...',
      blog_title: '',
      content_quill: '',
      option: {
        placeholder: '开始编辑...'
      },
      publishing: false,
      publishText: '发布',
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
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
      this.blog_title = res.data.title
      this.dynamicTags = res.data.tag
      this.content_quill = res.data.content
    },

    // 提交
    submit () {
      if (!this.blog_title) {
        return this.$alert('请输入文章标题', '提示')
      }
      if (!this.content_quill) {
        return this.$alert('请输入文章内容', '提示')
      }
      this.publish()
    },

    // 发布
    async publish () {
      this.publishing = true
      this.publishText = '发布中'
      if (this.$route.params.id === 'new') { // 新增
        let blog = {
          title: this.blog_title,
          blog_type: 'quill',
          author: this.user.name,
          tag: this.dynamicTags
        }
        blog.content = this.content_quill
        let res = await this.$http.post(api.blog.add, blog)
        if (res.success) {
          this.success()
        }
      } else { // 更新
        let blog = {
          id: this.$route.params.id,
          title: this.blog_title,
          tag: this.dynamicTags
        }
        blog.content = this.content_quill
        let res = await this.$http.put(api.blog.update, blog)
        if (res.success) {
          this.success()
        }
      }
      this.publishing = false
      this.publishText = '发布'
    },

    // 取消
    cancle () {
      this.$confirm('是否确定取消?  取消之后不会保存您所编辑的文字', '提示').then(({ result, value }) => {
        if (result) {
          this.$router.push({ name: 'blogList' })
        }
      })
    },

    // 发布成功
    success () {
      Message.success('发布成功!')
      setTimeout(() => {
        this.$router.push({ name: 'blogList' })
      }, 3000)
    },

    // 删除标签
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    // 添加标签
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 输入标签
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
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
      height: 40px;
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
    height: calc(100vh - 150px);
  }

  .blog-edit-tags {
    margin-bottom: 10px;
    width: 80vw;
    text-align: right;

    .el-tag + .el-tag {
      margin-left: 10px;
    }

    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
}
</style>
