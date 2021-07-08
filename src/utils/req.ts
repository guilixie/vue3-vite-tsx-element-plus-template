import axios from 'axios'
import { ElMessage } from 'element-plus'
// import store from '@/store'
import { getFileNameFormHeader, downloadByStream } from './index'

const PREFIX = import.meta.env.VITE_APP_API_PREFIX as string

const instance = axios.create({
  baseURL: PREFIX,
  timeout: 60 * 1000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // if (store.getters.token) {
    // 	// let each request carry token
    // 	// ['X-Token'] is a custom headers key
    // 	// please modify it according to the actual situation
    // 	config.headers['X-Token'] = store.getters.token
    // }
    // if (config.params.filters) {
    // 	for (let key in config.params.filters) {
    // 		// 如果过滤器里面的字段是空字符串，那么就不上传，要不然会影响后台查询
    // 		if (config.params.filters[key] === '') {
    // 			delete config.params.filters[key]
    // 		}
    // 	}
    // }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 如果是,直接下载
    if (response.headers['content-type'].indexOf('octet-stream') !== -1) {
      const filename = getFileNameFormHeader(response.headers['content-disposition']) // iso-8859-1
      downloadByStream(response.data, filename)
      return Promise.resolve({ stream: response.data, filename })
    }
    // 对响应数据做点什么
    if (response.status !== 200) {
      ElMessage({
        message: response.data.error || '未知错误',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      return response.data.data
    }
  },
  //错误处理
  function (error) {
    // 对响应错误做点什么
    ElMessage.error(error.response.data.error)
    console.log('错误原因：' + error.response.data.error)
    return Promise.reject(error.response.data.message)
  }
)

export default instance