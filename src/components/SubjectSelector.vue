<script setup lang="ts">
import { useChatTopicState } from '@/stores/chatTopic'
import { defineEmits } from 'vue'
import ChatTopicIcon from './ChatTopicIcon.vue'

const emit = defineEmits<{
  select: [topicID: string]
}>()

const topicStore = useChatTopicState()
const selectTopic = (topic: string) => {
  emit('select', topic)
}
</script>

<template>
  <div>
    <h3 class="font-bold text-lg">Оберіть предмет</h3>
    <div class="topic-items">
      <button
        v-for="topic in topicStore.topicsState"
        :key="topic.id"
        @click="selectTopic(topic.id)"
        class="bg-base-200 topic-button"
      >
        <ChatTopicIcon :topicID="topic.id" />
        {{ topic.label }}
      </button>
    </div>
  </div>
</template>
<style scoped>
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
