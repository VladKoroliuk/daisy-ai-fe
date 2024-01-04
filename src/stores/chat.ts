import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ChatProps } from '@/core/entity/Chat'

export const useChatStore = defineStore('chat', () => {
  const chatState = ref<ChatProps[]>([])
  const chatLoading = ref(false)

  const setLoading = (loading: boolean) => {
    chatLoading.value = loading
  }

  const setChats = (chats: ChatProps[]) => {
    chatState.value = chats
  }

  const appendChat = (chat: ChatProps) => {
    chatState.value.push(chat)
  }

  return { chatState, setChats, setLoading, appendChat }
})
