<template>
  <div class="blog-article"></div>
</template>

<script>
import api from '../../service/api.js'

export default {
  name: 'Article',

  created () {
    this.getBolg(this.$route.params.id)
  },

  methods: {
    // 获取文章内容
    async getBolg (id) {
      this.blog = await this.$http.get(api.blog.getById, { params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
