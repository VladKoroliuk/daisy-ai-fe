<script setup lang="ts">
import { ref } from 'vue'
import ChatNavigationItem from '@/components/navigation/ChatNavigationItem.vue'
import { useChatStore } from '@/stores/chat'
import { useChatTopicState } from '@/stores/chatTopic'
import { getChatService } from '@/core/services/ChatService'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const modal = ref<null | { showModal: () => null; close: () => null }>(null)
const loading = ref<boolean>(false)
const route = useRoute()
const router = useRouter()

const store = useChatStore()
const topicsStore = useChatTopicState()
const chatService = getChatService()

const getChatName = (topicID: string) => {
  const topic = topicsStore.topicsState.find((t) => t.id == topicID)
  if (topic) {
    return topic.label
  }
  return 'Error'
}

const closeModal = () => {
  modal.value?.close()
}

let idToDelete: string | null = null
const showDeleteModal = (chatID: string) => {
  modal.value?.showModal()
  idToDelete = chatID
}

const deleteChat = async () => {
  if (idToDelete) {
    loading.value = true
    const response = await chatService.deleteChat(idToDelete)
    loading.value = false
    if (response?.id) {
      store.removeChat(response.id)
      if (route.params.chatID === response.id) {
        router.push({ name: 'home' })
      }
    }
    modal.value?.close()
  }
}
</script>

<template>
  <div>
    <dialog id="modal" ref="modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Ви впевнені?</h3>
        <p class="py-4">Відновлення вмісту чату після видалення є неможливим.</p>
        <div class="modal-action">
          <button class="btn" @click="closeModal" :disabled="loading">Відмінити</button>
          <button class="btn btn-error" @click="deleteChat" :disabled="loading">
            <span class="loading loading-spinner" v-if="loading"></span>Видалити
          </button>
        </div>
      </div>
    </dialog>
    <ChatNavigationItem
      v-for="chat in store.chatState"
      :key="chat.id"
      :id="chat.id"
      :topicID="chat.topicID"
      :label="getChatName(chat.topicID)"
      @deleteChat="showDeleteModal"
    />
  </div>
</template>
