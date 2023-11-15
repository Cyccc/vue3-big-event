import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }

    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      setToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
