const user = {
  namespaced: true,

  state: {
    userInfo: {}
  },

  getters: {
    getUserInfo (state) {
      if (Object.keys(state.userInfo).length) {
        return state.userInfo
      } else {
        return JSON.parse(sessionStorage.getItem('user'))
      }
    }
  },

  mutations: {
    SET_USER: (state, item) => {
      state.userInfo = item
    }
  },

  actions: {
    setUser: (context, item) => {
      context.commit('SET_USER', item)
    }
  }
}

export default user
