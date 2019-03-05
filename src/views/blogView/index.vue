<template>
  <div class="blog-article">
    <h1 class="blog-title">{{ blog.title }}</h1>
    <p class="align-right">{{ introduce }}</p>
    <mavonEditor ishljs code-style="atom-one-dark" v-show="false"></mavonEditor>

    <div class="ql-snow ql-container" v-if="blog.blog_type === 'quill'">
      <div class="ql-editor" v-html="blog.content" />
    </div>

    <div class="markdown-body" v-else>
      <div v-html="blog.content"></div>
    </div>

    <mu-flex justify-content="end" style="padding-bottom: 20px;">
      <mu-flex justify-content="center" v-if="showOpreat">
        <mu-button flat color="#f44336" @click="dele">删除文章</mu-button>
        <mu-button flat color="#42c02e" @click="editBlog">编辑文章</mu-button>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import api from '@/service/api'
import moment from 'moment'
import { mapState } from 'vuex'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'Article',

  components: {
    mavonEditor
  },

  data () {
    return {
      blog: {},
      introduce: ''
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.userInfo
    }),

    showOpreat () {
      return this.user.name === this.blog.author
    }
  },

  created () {
    this.getBolg(this.$route.params.id)
  },

  methods: {
    // 获取文章内容
    async getBolg (id) {
      this.blog = await this.$http.get(api.blog.getById, { params: { id } })
      this.introduce = '作者：' + this.blog.author + '\xa0\xa0\xa0\xa0\xa0\xa0更新时间：' + moment(this.blog.update_time).format('YYYY-MM-DD HH:mm:ss')
    },

    // 编辑文章
    editBlog () {
      this.$router.push({ name: 'blogEdit', params: { id: this.$route.params.id } })
    },

    // 点击删除
    dele () {
      this.$confirm('是否确定删除?  删除之后文章将不会恢复', '提示').then(({ result, value }) => {
        if (result) {
          this.deleBlog()
        }
      })
    },

    // 删除文章
    async deleBlog () {
      let data = {
        id: this.$route.params.id
      }
      await this.$http.delete(api.blog.delete, { data })
    }

  }
}
</script>

<style lang="less" scoped>
.blog-article {
  width: 60%;
  margin: 0 auto;
  padding-top: 70px;

  .blog-title {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
  }
  .ql-container.ql-snow {
    border: 0 none;
  }
}
</style>
