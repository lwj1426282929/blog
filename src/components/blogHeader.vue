<template>
  <div>
    <mu-appbar class="blog-head" z-depth="1">
      <mu-row class="blog-head-container">
        <div class="logo" />
        <mu-col class="blog-head-right">
          <mu-flex class="flex-wrapper" style="height: 60px; padding: 5px 0;" justify-content="end">
            <mu-avatar style="cursor: pointer;" @click="open = true">
              <img src="https://muse-ui.org/img/uicon.ac3913bf.jpg">
            </mu-avatar>
            <!-- <div class="blog-login-btn">登录</div> -->
            <mu-button style="margin-left: 20px;" color="#42c02e" round large @click="editBlog">写文章</mu-button>
          </mu-flex>
        </mu-col>
      </mu-row>
    </mu-appbar>

    <mu-drawer :open.sync="open" :docked="false" right>
      <mu-list>
        <mu-form :model="user" label-width="100">

        </mu-form>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
export default {
  name: 'BlogHeader',

  data () {
    return {
      open: false,
      user: {}
    }
  },

  methods: {
    // 写文章
    editBlog () {
      this.$router.push({ name: 'blogEdit', params: { id: 'new' } })
    }
  }
}
</script>

<style lang="less" scoped>
.blog-head {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  background: #fff;

  .blog-head-container {
    width: 80%;
    margin: 0 auto;
  }

  .logo {
    margin: 10px;
    width: 60px;
    height: 60px;
    background: url("../assets/img/logo.png") no-repeat center center;
    background-size: contain;
  }

  .blog-head-right {
    height: 100%;
    margin: 10px 0;
  }

  .blog-setting {
    margin-right: 20px;
    &:hover {
      color: #42c02e;
    }
    .icon-setting {
      font-size: 30px;
    }
  }

  .blog-login-btn {
    display: inline-block;
    width: 109px;
    height: 44px;
    font-size: 15px;
    line-height: 44px;
    border: 1px solid #42c02e;
    border-radius: 50px;
    text-align: center;
    color: #42c02e;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover {
      background: rgba(66, 192, 46, 0.1);
    }
  }
}
</style>
