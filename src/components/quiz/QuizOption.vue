<script lang="ts" setup>
import type { QuizSectionOption } from '@/core/services/QuizService'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ option: QuizSectionOption; isActive: boolean }>()
const emit = defineEmits<{
  setActive: [id: string]
}>()

const setActive = () => {
  emit('setActive', props.option.id)
}
</script>
<template>
  <li class="quiz-option" :class="{ 'quiz-option_active': props.isActive }" @click="setActive">
    <div>
      <span class="quiz-option__text">{{ props.option.text }}</span>
    </div>
    <input type="checkbox" :checked="props.isActive" class="checkbox checkbox-info" />
  </li>
</template>
<style scoped>
.quiz-option {
  display: flex;
  border: 1px solid rgb(184, 184, 184);
  justify-content: space-between;
  padding: 10px 15px;
  border-radius: 5px;
  max-width: 360px;
  cursor: pointer;
  margin-bottom: 10px;
}
.quiz-option span {
  font-weight: 500;
}
.quiz-option input {
  border: 1px solid rgb(184, 184, 184);
}
.quiz-option_active {
  background-color: hsl(198 93% 60%);
  border: 1px solid white;
  outline: 1px solid hsl(198, 86%, 77%);
  outline-offset: -5px;
}
.quiz-option_active input {
  background-image: linear-gradient(-45deg, transparent 65%, hsl(var(--chkbg)) 65.99%),
    linear-gradient(45deg, transparent 75%, hsl(var(--chkbg)) 75.99%),
    linear-gradient(-45deg, hsl(var(--chkbg)) 40%, transparent 40.99%),
    linear-gradient(45deg, hsl(var(--chkbg)) 30%, white 30.99%, white 40%, transparent 40.99%),
    linear-gradient(-45deg, white 50%, hsl(var(--chkbg)) 50.99%);
}
.quiz-option_active input {
  border: 1px solid white;
}
.quiz-option_active span {
  color: white;
}
.quiz-option__text {
  color: rgb(73, 73, 73);
}
</style>
