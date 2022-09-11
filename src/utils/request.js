import axios from 'axios'

import store from '@/store'
// 配置axios
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store

    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    console.log(error)
  }
)

export default request
