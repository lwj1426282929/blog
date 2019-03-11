import axios from 'axios'
import {
  Notification
} from 'element-ui'


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
  if (response.status === 200 && response.data.success) return response.data
  Notification.error({
    title: '错误',
    dangerouslyUseHTMLString: true,
    message: '<p><strong>代码：</strong> 404</p><p>' + response.data.message + '</p>'
  })
}, error => {
  console.log(error)
  // Notification.error({
  //   title: '错误',
  //   dangerouslyUseHTMLString: true,
  //   message: '<p><strong>代码：</strong> 404</p><p>' + response.data.message + '</p>'
  // })
  return Promise.reject(error)
})

export default instance
