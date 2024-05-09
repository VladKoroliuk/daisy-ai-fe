<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { getQuizService, type Quiz } from '@/core/services/QuizService'
import QuizzesListItem from './QuizzesListItem.vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const store = useQuizStore()
const modal = ref<null | { showModal: () => null; close: () => null }>(null)
const loading = ref<boolean>(false)
const quizService = getQuizService()
const route = useRoute()
const router = useRouter()

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
const closeModal = () => {
  modal.value?.close()
}

let idToDelete: string | null = null
const showDeleteModal = (chatID: string) => {
  modal.value?.showModal()
  idToDelete = chatID
}

const deleteQuiz = async () => {
  if (idToDelete) {
    loading.value = true
    const response = await quizService.deleteQuiz(idToDelete)
    loading.value = false
    if (response?.id) {
      store.removeQuiz(response.id)
      if (route.params.quizID === response.id) {
        router.push({ name: 'quizzes' })
      }
    }
    modal.value?.close()
  }
}
</script>
<template>
  <dialog id="modal" ref="modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Ви впевнені?</h3>
      <p class="py-4">Відновлення тесту після видалення є неможливим.</p>
      <div class="modal-action">
        <button class="btn" @click="closeModal" :disabled="loading">Відмінити</button>
        <button class="btn btn-error" @click="deleteQuiz" :disabled="loading">
          <span class="loading loading-spinner" v-if="loading"></span>Видалити
        </button>
      </div>
    </div>
  </dialog>
  <QuizzesListItem
    v-for="(group, index) in groups"
    :key="index"
    :group="group"
    @delete-quiz="showDeleteModal"
  />
</template>
