<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import type { Quiz } from '@/core/services/QuizService'
import ChatTopicIcon from '../ChatTopicIcon.vue'

const props = defineProps<{ group: Quiz[] }>()
const emit = defineEmits<{
  deleteQuiz: [id: string]
}>()

const deleteQuiz = (event: Event, id: string) => {
  event.preventDefault()
  emit('deleteQuiz', id)
}
</script>

<template>
  <li class="navigation-item">
    <div class="collapse collapse-arrow">
      <input type="radio" name="my-accordion-2" :checked="true" />
      <div class="collapse-title">
        <div class="collapse-header">
          <ChatTopicIcon :topicID="props.group[0].topic.id" />
          {{ props.group[0].topic.label }}
        </div>
      </div>
      <div class="collapse-content">
        <RouterLink
          v-for="quiz in props.group"
          :key="quiz.id"
          :to="{ name: 'quiz', params: { quizID: quiz.id } }"
        >
          <a class="quiz-button"
            >{{ quiz.subTopic }}
            <button class="delete-chat-button" @click.stop="deleteQuiz($event, quiz.id)">
              <mdicon style="color: rgb(161, 161, 161)" name="delete" size="24"></mdicon></button
          ></a>
        </RouterLink>
      </div>
    </div>
  </li>
</template>
<style>
.collapse_ {
  padding: 0;
  display: flex;
  align-items: center;
}
.collapse-header {
  display: flex;
  height: 30px;
  gap: 10px;
  align-items: center;
}
.quiz-button {
  display: block;
  width: 100%;
  background-color: rgb(243, 241, 241);
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px 9px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
}
.quiz-button:hover .delete-chat-button {
  display: block;
}
.quiz-button:hover {
  background-color: rgb(236, 236, 236);
}
.collapse-title {
}
</style>
