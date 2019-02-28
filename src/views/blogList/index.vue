<template>
  <div class="blog-list">
    <router-link class="blog-container"
                 v-for="(blog, index) in blogList"
                 :to="computeBlogRouter(blog.id)"
                 :key="index">
      <div class="blog-head">{{ blog.title }}</div>
    </router-link>
  </div>
</template>

<script>
import api from '@/service/api'
export default {
  name: 'BlogList',

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
      this.blogList = await this.$http.get(api.blog.getList)
      for (let item of this.blogList) {
        let content = this.delHtmlTag(item.content)
        console.log(content)
      }
    },

    // 提取文本
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
  }
}
</script>

<style lang="less" scoped>
.blog-list {
  width: 60%;
  margin: 0 auto;
  border-radius: 5px;
}
</style>
