<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const formRef = ref()
// 直接解构只要初始值无需考虑响应式
const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()
const formData = ref({
  username,
  nickname,
  email,
  id
})
const formRules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称长度为 2 到 10 个非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  // 校验
  await formRef.value.validate()
  await userUpdateInfoService(formData.value)
  // 更新本地数据
  getUser()
  // 提示用户
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="100px"
    >
      <!-- 第一行 -->
      <el-form-item label="登录名称">
        <el-input v-model="formData.username" :disabled="true"></el-input>
      </el-form-item>

      <!-- 第二行 -->
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>

      <!-- 第三行 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>

      <!-- 第四行按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
