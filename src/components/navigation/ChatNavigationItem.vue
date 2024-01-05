<script setup lang="ts">
import { defineProps } from 'vue'
import ChatTopicIcon from '../ChatTopicIcon.vue'
import { getChatService } from '@/core/services/ChatService'

const props = defineProps<{ label: string; id: string; topicID: string }>()
const chatService = getChatService()

const deleteChat = (event: Event) => {
  event.preventDefault()
  chatService.deleteChat(props.id)
}
</script>
<template>
  <li class="navigation-item">
    <RouterLink
      class="chat-link"
      activeClass="active-link"
      :to="{ name: 'chat', params: { chatID: props.id } }"
    >
      <div>
        <ChatTopicIcon :topicID="props.topicID" />
        <span class="chat-label">{{ props.label }}</span>
      </div>
      <button class="delete-chat-button" @click.stop="deleteChat($event)">
        <mdicon style="color: rgb(161, 161, 161)" name="delete" size="24"></mdicon>
      </button>
    </RouterLink>
  </li>
</template>
<style>
.active-link {
  background-color: rgb(236, 236, 236);
}

.chat-link {
  display: flex;
  justify-content: space-between;
}

.chat-link > div {
  display: flex;
  gap: 10px;
}

.delete-chat-button {
  display: none;
}
.chat-link:hover .delete-chat-button {
  display: block;
}

.chat-label {
  text-wrap: nowrap;
}
</style>
