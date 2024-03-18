<script setup lang="ts">
import { defineEmits, ref, reactive } from 'vue'
import { getChatService } from '@/core/services/ChatService'
import { useChatStore } from '@/stores/chat'
import { useRouter } from 'vue-router'
import LevelSelector from './LevelSelector.vue'
import SubjectSelector from './SubjectSelector.vue'

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
        <LevelSelector @select="selectEducationLevel" />
      </template>
      <template v-if="step === 1">
        <SubjectSelector @select="selectTopic" />
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
.close-modal {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
