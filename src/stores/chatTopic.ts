import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ChatTopic } from '@/core/entity/Topic'

export const useChatTopicState = defineStore('chatTopic', () => {
  const topicsState = ref<ChatTopic[]>([])
  const loading = ref(false)

  const setLoading = (state: boolean) => {
    loading.value = state
  }

  const setTopics = (chats: ChatTopic[]) => {
    topicsState.value = chats
  }

  return { topicsState, setTopics, setLoading, loading }
})
