<template>
  <div id="app">
    <div class="blog-head">
      <div class="blog-head-container">
        <div class="blog-logo"><span>Lwj</span>  blog</div>
      </div>
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

.blog-head {
  width: 100%;
  height: 60px;
  position: fixed;
  border: 1px solid;

  .blog-head-container {
    width: 90%;
    height: 40px;
    margin: 10px auto;
    border: 1px solid;
    overflow: hidden;

    .blog-logo {
      display: inline-block;
      padding: 0 5px;
      font-family: "dryades";
      line-height: 40px;
      font-size: 20px;
      letter-spacing: 3px;
      background: #375531;
      color: #d7e5c4;
      font-weight: 700;
      & span {
        font-size: 30px;
      }
    }
  }
}
.blog-body {
  padding-top: 70px;
}

@font-face {
  font-family: "dryades";
  src: url("../static/font/Dryades.otf");
}
</style>
