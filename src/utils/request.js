import axios from 'axios'
// 配置axios
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
