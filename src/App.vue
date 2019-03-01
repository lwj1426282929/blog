<template>
  <div id="app">
    <div class="blog-head">
    </div>
    <div>
      <router-view class="blog-body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "./style/index.less";

#app {
  width: 100%;
  height: 100%;
}

.blog-head {
  width: 100%;
  height: 60px;
  position: fixed;
  opacity: .5;
}

.blog-body {
  height: calc(100vh - 60px);
  padding-top: 60px;
}
</style>
