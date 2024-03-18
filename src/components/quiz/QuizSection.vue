<script lang="ts" setup>
import type { QuizSection } from '@/core/services/QuizService'
import QuizOption from './QuizOption.vue'
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps<{ section: QuizSection; activeOption: string | undefined }>()
const selectedOption = ref<null | string>(null)
const emit = defineEmits<{
  select: [id: string]
}>()

const selectOption = (id: string) => {
  selectedOption.value = id
  emit('select', id)
}
</script>

<template>
  <div>
    <div class="section-header">
      <p class="quiz-question">
        {{ props.section.question }}
      </p>
      <div class="section-controls">
        <slot></slot>
      </div>
    </div>

    <ul class="list">
      <QuizOption
        v-for="opt in props.section.options"
        @set-active="selectOption"
        :key="opt.id"
        :option="opt"
        :is-active="props.activeOption == opt.id"
      />
    </ul>
  </div>
</template>
<style scoped>
.list {
  margin-top: 30px;
}
.section-header {
  display: flex;
  justify-content: space-between;
}
.section-controls {
  min-width: 50px;
}
</style>
