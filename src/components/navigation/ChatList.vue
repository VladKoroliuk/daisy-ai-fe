<script setup lang="ts">
import ChatNavigationItem from '@/components/navigation/ChatNavigationItem.vue'
import { useChatStore } from '@/stores/chat'
import { useChatTopicState } from '@/stores/chatTopic'

const store = useChatStore()
const topicsStore = useChatTopicState()

const getChatName = (topicID: string) => {
  const topic = topicsStore.topicsState.find((t) => t.id == topicID)
  if (topic) {
    return topic.label
  }
  return 'Error'
}
</script>

<template>
  <div>
    <ChatNavigationItem
      v-for="chat in store.chatState"
      :key="chat.id"
      :id="chat.id"
      :topicID="chat.topicID"
      :label="getChatName(chat.topicID)"
    />
  </div>
</template>
