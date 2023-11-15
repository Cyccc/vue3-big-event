// pinia 独立管理
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 数据统一导出管理
// import { useUserStore } from './modules/user'
// export { useUserStore }
export * from './modules/user' // 此语法等同于上面两句
