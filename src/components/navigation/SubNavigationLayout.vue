<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { getAuthService } from '@/core/services/AuthService'
import { useRouter } from 'vue-router'

const router = useRouter()
const authService = getAuthService()
const userStore = useUserStore()

const logout = async () => {
  await authService.logout()
  router.push({ name: 'login' })
}
</script>
<template>
  <nav class="app-navigation">
    <slot></slot>
    <div class="app-navigation__footer">
      <div>
        {{ userStore.userState.current_user?.userData.firstname }}
        {{ userStore.userState.current_user?.userData.lastname }}
      </div>
      <button>
        <mdicon name="logout" @click="logout" />
      </button>
    </div>
  </nav>
</template>
