<script setup lang="ts">
import { defineEmits, ref, reactive } from 'vue'
import { getChatService } from '@/core/services/ChatService'
import { useChatStore } from '@/stores/chat'
import { useRouter } from 'vue-router'
import { useChatTopicState } from '@/stores/chatTopic'
import ChatTopicIcon from './ChatTopicIcon.vue'

const emit = defineEmits(['close'])

const initialFormState = {
  level: 0,
  topic: ''
}
const formState = reactive(initialFormState)
const step = ref(0)
const chatService = getChatService()
const loading = ref(false)
const store = useChatStore()
const router = useRouter()
const topicStore = useChatTopicState()

const selectEducationLevel = (level: number) => {
  formState.level = level
  step.value = 1
}

const selectTopic = (topic: string) => {
  formState.topic = topic
  createChat()
}

const createChat = async () => {
  loading.value = true
  const response = await chatService.createChat(formState.level, formState.topic)
  if (response) {
    store.appendChat(response)
    router.push({ name: 'chat', params: { chatID: response.id } })
  }
  close()
  loading.value = false
}

const close = () => {
  emit('close')
  setTimeout(() => (step.value = 0), 120)
}
</script>

<template>
  <div class="modal-box">
    <template v-if="!loading">
      <template v-if="step === 0">
        <h3 class="font-bold text-lg">Оберіть рівень освіти</h3>
        <div class="level-selector">
          <button class="btn btn-success btn-outline" @click="selectEducationLevel(0)">
            Початкова школа
          </button>
          <button class="btn btn-success btn-outline" @click="selectEducationLevel(1)">
            Середня школа
          </button>
          <button class="btn btn-success btn-outline" @click="selectEducationLevel(2)">
            Старша школа
          </button>
        </div>
      </template>
      <template v-if="step === 1">
        <h3 class="font-bold text-lg">Оберить тему</h3>
        <div class="topic-items">
          <button
            v-for="topic in topicStore.topicsState"
            :key="topic.id"
            @click="selectTopic(topic.id)"
            class="bg-base-300 topic-button"
          >
            <ChatTopicIcon :topicID="topic.id" />
            {{ topic.label }}
          </button>
        </div>
      </template>
    </template>
    <template v-else>
      <span class="loading loading-spinner loading-xs"></span>
    </template>

    <button class="btn btn-circle btn-sm close-modal" @click="close">
      <mdicon name="close" />
    </button>
  </div>
</template>
<style scoped>
.modal-box {
  position: relative;
}
.level-selector {
  margin-top: 40px;
}
.level-selector button {
  width: 100%;
  margin-top: 5px;
}
.close-modal {
  position: absolute;
  right: 10px;
  top: 10px;
}
.topic-items {
  margin-top: 40px;
}
.topic-items button {
  display: flex;
  gap: 10px;
  padding: 5px 10px;
  width: 100%;
  text-align: start;
  margin-top: 5px;
  border-radius: 5px;
}
</style>
