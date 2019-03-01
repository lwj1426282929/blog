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
  border-bottom: 1px solid #ccc;
}

.blog-body {
  padding-top: 60px;
}
</style>
