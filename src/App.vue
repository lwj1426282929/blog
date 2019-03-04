<template>
  <div id="app">
    <blog-header v-if="showHeader" />
    <router-view class="blog-body" />
  </div>
</template>

<script>
import { BlogHeader } from '@/components'

export default {
  name: 'App',

  components: {
    BlogHeader
  },

  computed: {
    showHeader () {
      return this.$route.name === 'blogList' || this.$route.name === 'blogView'
    }
  }
}
</script>

<style lang="less">
@import "./style/index.less";
@import "./assets/font/iconfont.css";

#app {
  width: 100%;
  height: 100%;
}
</style>
