<script setup lang="ts">
import { watch, ref, onMounted, nextTick } from 'vue'
import MessageItem from '@/components/MessageItem.vue'
import { useRoute } from 'vue-router'
import { getChatService } from '@/core/services/ChatService'
import type { MessageProps } from '@/core/services/ChatService'
import TypingDots from '@/components/ui/TypingDots.vue'

const route = useRoute()
const message = ref('')
const chatID = ref('')
const messages = ref<MessageProps[]>([])
const chatLine = ref(null)
const typingStatus = ref(false)
const currentTopic = ref('')

const chatService = getChatService()

const loadChat = async (id: string) => {
  chatID.value = id
  const response = await chatService.loadChat(id)
  messages.value = response.messages.sort((a, b) => (a.sequenceIndex || 0) - (b.sequenceIndex || 0))
  currentTopic.value = response.chatData.topicID
  nextTick(() => {
    scrollDown()
  })
}

watch(route, () => loadChat(route.params.chatID as string))

onMounted(async () => {
  await loadChat(route.params.chatID as string)
})

const sendMessage = async () => {
  if (!message.value) return

  const userMessage: MessageProps = {
    chatID: chatID.value,
    content: message.value,
    id: String(new Date()),
    role: 'user',
    sequenceIndex: null
  }
  addMessage(userMessage)
  const m = message.value
  message.value = ''
  typingStatus.value = true
  const response = await chatService.sendMessage(chatID.value, m)
  addMessage(response[1])
  typingStatus.value = false
}

const scrollDown = () => {
  // @ts-ignore
  chatLine.value.scrollTop = chatLine.value.scrollHeight
}

const addMessage = (message: MessageProps) => {
  messages.value.push(message)
  nextTick(() => {
    scrollDown()
  })
}
</script>

<template>
  <div class="chat__content">
    <div class="chat__line" ref="chatLine">
      <MessageItem
        v-for="message in messages"
        :key="message.id"
        :topic="currentTopic"
        :content="message.content"
        :role="message.role"
      />
    </div>
    <div class="chat__controls">
      <div class="mb-4" v-if="typingStatus">
        <TypingDots />
      </div>
      <div class="message-input-block">
        <textarea
          v-model="message"
          rows="2"
          class="w-full bg-inherit textarea textarea-bordered"
          placeholder="Ваш запит"
          @keypress.enter="sendMessage"
        ></textarea>
        <button class="btn btn-ghost" @click="sendMessage" :disabled="typingStatus">
          <mdicon name="send" />
        </button>
      </div>
    </div>
  </div>
</template>
