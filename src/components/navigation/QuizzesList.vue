<script lang="ts" setup>
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import type { Quiz } from '@/core/services/QuizService'
import QuizzesListItem from './QuizzesListItem.vue'

const store = useQuizStore()

const groups = computed<Quiz[][]>(() => {
  const subjects: Set<string> = new Set(store.quizState.map((q) => q.topic.id))
  const groups: Quiz[][] = new Array(subjects.size)
  let index = 0
  for (let sub of subjects) {
    const group: Quiz[] = store.quizState.filter((q) => q.topic.id == sub)
    groups[index] = group
    index++
  }
  return groups
})
</script>
<template>
  <QuizzesListItem v-for="(group, index) in groups" :key="index" :group="group" />
</template>
