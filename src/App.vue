<script setup>
// import { useRoute, useRouter } from 'vue-router'
// import { useUserStore } from '@/stores/modules/user'
// 之前方法在setup中不可用
// const goList = () => {
//   this.$router.push('/list')
// }

// 新方法(需要导入):
// const router = useRouter()
// const route = useRoute()

// const goList = () => {
//   console.log(router, route)
//   router.push('/list')
// }

// const userStore = useUserStore()
// 中文化配置
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div>
    <!-- 全局中文化配置 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
    <!-- $router跳转在模板中可以兼容 -->
    <!-- <el-button @click="$router.push('/home')">home</el-button> -->
    <!-- 函数要注意this的指向(undefined) -->
    <!-- <el-button @click="goList">list</el-button> -->
    <!-- <el-button @click="userStore.setToken('sijanefinaneifhieignghei')">login</el-button> -->
    <!-- <el-button @click="userStore.setToken('')">logout</el-button> -->
    <!-- <p>{{ userStore.token }}</p> -->
  </div>
</template>

<style scoped></style>
