import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { CurrentUser } from '@/core/entity/CurrentUser'

export const useUserStore = defineStore('user', () => {
  const userState = reactive<{ current_user: CurrentUser | null }>({ current_user: null })
  const isLoggedIn = computed(() => {
    if (!(userState.current_user instanceof CurrentUser)) {
      return false
    }
    return !!userState.current_user.access_token
  })
  return { userState, isLoggedIn }
})
