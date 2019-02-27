import axios from 'axios'


const instance = axios.create({
  responseType: 'json'
})

// 请求拦截器
instance.interceptors.request.use(config => {
  config.headers.token = '123'
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
}, error => {
  return Promise.reject(error)
})

// 返回拦截器
instance.interceptors.response.use(response => {
  if (response.status === 200) return response.data
}, error => {
  return Promise.reject(error)
})

export default instance
