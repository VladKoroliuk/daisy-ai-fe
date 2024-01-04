<script setup lang="ts">
import { defineProps } from 'vue'
import ChatTopicIcon from './ChatTopicIcon.vue'

const props = defineProps({
  content: {
    required: true,
    type: String
  },
  topic: {
    required: false,
    default: ''
  },
  role: {
    required: true,
    type: String
  }
})
</script>
<template>
  <div class="message-item">
    <div class="message-item__avatar-block">
      <div class="avatar">
        <div class="w-8 rounded">
          <ChatTopicIcon :topicID="props.topic" v-if="role === 'ASSISTANT'" />
          <img v-else src="../assets/icons/user.png" />
        </div>
      </div>
    </div>
    <div class="message-item__content-block">
      <p v-html="props.content"></p>
    </div>
  </div>
</template>
