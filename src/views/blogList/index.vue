<template>
  <div class="blog-list">
    <mu-row>
      <mu-col span="3">
        <div class="grid-cell">1</div>
      </mu-col>
      <mu-col span="6" style="border: 1px solid;">
        <router-link class="blog-container" v-for="(blog, index) in blogList" :to="computeBlogRouter(blog.id)" :key="index">
          <div>{{ blog.title }}</div>
        </router-link>
      </mu-col>
      <mu-col span="3">
        <div class="grid-cell">2</div>
      </mu-col>
    </mu-row>
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
  }
}
</script>

<style lang="less" scoped>
.blog-list {
  padding: 70px 20px 20px 20px;
}
</style>
