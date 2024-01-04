<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateChatForm from '../CreateChatForm.vue'
import ChatList from './ChatList.vue'
import { getAuthService } from '@/core/services/AuthService'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'

const modal = ref<null | { showModal: () => null; close: () => null }>(null)
const authService = getAuthService()
const router = useRouter()
const store = useChatStore()
const userStore = useUserStore()

const openModal = () => {
  if (modal.value) modal.value.showModal()
}

const closeModal = () => {
  if (modal.value) modal.value.close()
}

const logout = async () => {
  await authService.logout()
  router.push({ name: 'login' })
}

onMounted(() => {
  if (store.chatState.length == 0) {
    openModal()
  }
})
</script>

<template>
  <nav class="app-navigation">
    <dialog ref="modal" id="my_modal_1" class="modal">
      <CreateChatForm @close="closeModal" />
    </dialog>
    <ul>
      <li class="navigation-item">
        <button class="btn btn-primary w-full" @click="openModal">Створити новий чат</button>
      </li>
      <ChatList />
    </ul>
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
