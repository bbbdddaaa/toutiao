import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 要想vuex 持久化state  可以封装本地储存

// vuex-persistedstate --> 持久化state
// 1. 下载
// yarn add vuex-persistedstate@3.2.1
// 2.引入
// import createPersistedState from 'vuex-persistedstate'
// 3.调用
// - plugin：[createPersistedState]

// 配置项

// key：配置项
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage:window.sessionStorage
      reduceRight({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
