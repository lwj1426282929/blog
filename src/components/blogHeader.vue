<template>
  <div>
    <mu-appbar class="blog-head" z-depth="1">
      <mu-row class="blog-head-container">
        <router-link class="logo" :to="{ name: 'blogList' }" />
        <mu-col class="blog-head-right">
          <mu-flex class="flex-wrapper" style="height: 60px; padding: 8px 0;" justify-content="end">
            <mu-avatar style="cursor: pointer;" v-if="user.name" @click="open = !open">
              <img src="https://muse-ui.org/img/uicon.ac3913bf.jpg">
            </mu-avatar>
            <mu-button class="blog-login-btn" v-else>登录</mu-button>
            <mu-button style="margin-left: 20px;" color="#42c02e" round large @click="editBlog">写文章</mu-button>
          </mu-flex>
        </mu-col>
      </mu-row>
    </mu-appbar>

    <mu-drawer :open.sync="open" right class="blog-drawer">
      <mu-row gutter class="user-info">
        <mu-avatar size="80">
          <img src="https://muse-ui.org/img/uicon.ac3913bf.jpg">
        </mu-avatar>
        <mu-col>
          <mu-row class="user-name">{{ user.name }}</mu-row>
          <mu-flex class="user-age-sex">
            <mu-flex span="12" fill>{{ user.sex }}</mu-flex>
            <mu-flex span="12" fill>{{ user.age + '岁' }}</mu-flex>
          </mu-flex>
          <mu-row class="user-address">{{ user.address }}</mu-row>
        </mu-col>
      </mu-row>

      <mu-list>
        <mu-list-item>
          <mu-list-item-action>
            编辑器
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-flex>
              <mu-radio color="#42c02e" v-model="user.editor" value="markdown" label="Markdown" />
              <mu-radio color="#42c02e" v-model="user.editor" value="quill" label="Quill" />
            </mu-flex>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider />
      </mu-list>
      <mu-button flat color="#42c02e" class="blog-close-btn" @click="open = false">关闭</mu-button>
    </mu-drawer>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BlogHeader',

  data () {
    return {
      open: false
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.userInfo
    })
  },

  methods: {
    // 写文章
    editBlog () {
      if (this.user.editor === 'markdown') {
        this.$router.push({ name: 'blogEditMarkdown', params: { id: 'new' } })
      } else {
        this.$router.push({ name: 'blogEditQuill', params: { id: 'new' } })
      }
    }
  },

  watch: {
    user: {
      handler (val) {
        console.log(val.editor)
      },
      immediate: true,
      deep: true
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
    width: 80vw;
    margin: 0 auto;
  }

  .logo {
    display: block;
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

.blog-drawer {
  text-align: center;
  .user-info {
    padding: 10px;
    background: #e9eef3;

    .mu-avatar {
      margin: 0 10px;
    }

    .user-name {
      font-size: 28px;
      font-weight: 500;
    }
    .user-age-sex,
    .user-address {
      font-size: 12px;
      color: #999;
      padding-top: 5px;
    }
  }

  .blog-close-btn {
    width: 220px;
    border: 1px solid #42c02e;
    margin: 20px auto;
  }
}
</style>
