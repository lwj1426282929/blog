<template>
  <div class="blog-list">
    <mu-row>
      <mu-col span="9">
        <div class="blog-container" v-for="(blog, index) in blogList" :key="index">
          <router-link class="blog-title" :to="computeBlogRouter(blog.id)">{{ blog.title }}</router-link>
          <div class="blog-desc">{{ blog.desc }}</div>
          <div class="blog-tag">
            <el-tag :key="index" v-for="(tag, index) in blog.tag" type="success" :class="'tag-' + tag.toLowerCase()">{{tag}}</el-tag>
          </div>
        </div>
      </mu-col>
      <mu-col span="3">
        <div class=""></div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import api from '@/service/api'
import { Tag } from 'element-ui'
export default {
  name: 'BlogList',

  components: {
    'el-tag': Tag
  },

  data () {
    return {
      blogList: []
    }
  },

  created () {
    this.getBolgList()
  },

  methods: {
    // 获取列表
    async getBolgList () {
      let res = await this.$http.get(api.blog.getList)
      this.blogList = res.data
      for (let item of this.blogList) {
        item.desc = this.delHtmlTag(item.content)
      }
    },

    // 取出HTML标签
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    },

    // 跳转页面
    computeBlogRouter (id) {
      return {
        name: 'blogView',
        params: { id }
      }
    }
  },

  filters: {
    tag (val) {
      if (!val) return
      return ''
    }
  }
}
</script>

<style lang="less" scoped>
.blog-list {
  width: 80vw;
  margin: 0 auto;
  padding-top: 100px;

  .blog-container {
    display: block;
    margin-bottom: 30px;
  }

  .blog-title {
    font-size: 24px;
    color: #333;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
      color: #42c02e;
    }
  }

  .blog-desc {
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .blog-tag {
    margin-top: 8px;

    .el-tag {
      margin-right: 5px;
    }
  }
}
</style>
