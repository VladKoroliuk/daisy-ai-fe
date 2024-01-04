<script setup lang="ts">
import { getAuthService } from '@/core/services/AuthService'
import { useRouter } from 'vue-router'
import { getChatService } from '@/core/services/ChatService'
import { useChatStore } from '@/stores/chat'
import { useChatTopicState } from '@/stores/chatTopic'

const router = useRouter()
const auth = getAuthService()
const response = await auth.refresh()
const chatTopicStore = useChatTopicState()

if (!response.success) {
  router.push({ name: 'login' })
} else {
  const chatStore = useChatStore()
  const chatService = getChatService()
  const topics = await chatService.getTopics()
  const chats = await chatService.getChats()
  chatStore.setChats(chats)
  chatTopicStore.setTopics(topics)
}
</script>
<template>
  <slot></slot>
</template>
