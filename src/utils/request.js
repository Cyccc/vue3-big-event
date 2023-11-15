import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const request = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 3000
})

request.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

request.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    // TODO 3. 处理业务失败
    ElMessage.error(res.data.message || 'server error')
    return Promise.reject(res.data) // 错误抛出

    // TODO 4. 摘取核心响应数据
  },
  (err) => {
    // TODO 5. 处理401错误(权限不足)
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 错误默认情况
    ElMessage.error(err.response.data.message || 'server error')
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
