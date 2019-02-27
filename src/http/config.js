import axios from 'axios'

const instance = axios.create({
  responseType: 'json'
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = '123'
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default instance
