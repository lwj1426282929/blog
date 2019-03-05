<template>
  <div id="app">
    <blog-header v-if="showHeader" />
    <router-view class="blog-body" />
  </div>
</template>

<script>
import { BlogHeader } from '@/components'
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    BlogHeader
  },

  computed: {
    showHeader () {
      return this.$route.name === 'blogList' || this.$route.name === 'blogView'
    },

    ...mapState({
      user: state => state.user.userInfo
    })
  },

  created () {
    this.$store.dispatch('user/setUser', {
      name: '赖维健',
      age: 25,
      sex: '男',
      editor: 'quill'
    })
  },

  mounted () {
    console.log(this.user)
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
