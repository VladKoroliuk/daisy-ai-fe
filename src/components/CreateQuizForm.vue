<script setup lang="ts">
import { defineEmits, ref, reactive } from 'vue'
import { getQuizService } from '@/core/services/QuizService'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'
import LevelSelector from './LevelSelector.vue'
import SubjectSelector from './SubjectSelector.vue'

const emit = defineEmits(['close'])

const initialFormState = {
  level: 0,
  subject: ''
}
const formState = reactive(initialFormState)
const step = ref(0)
const quizService = getQuizService()
const loading = ref(false)
const store = useQuizStore()
const router = useRouter()
const quizNumber = ref(5)

const selectEducationLevel = (level: number) => {
  formState.level = level
  step.value = 1
}

const selectSubject = (subject: string) => {
  formState.subject = subject
  step.value = 2
}

const createQuiz = async (e: Event) => {
  e.preventDefault()
  let topic = ''
  if (e.target) {
    // @ts-ignore
    topic = e.target[0].value
  }

  loading.value = true
  const response = await quizService.createQuiz({
    level: initialFormState.level,
    subject: initialFormState.subject,
    topic,
    count: quizNumber.value
  })
  if (response) {
    store.appendQuiz(response)
    router.push({ name: 'quiz', params: { quizID: response.id } })
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
        <SubjectSelector @select="selectSubject" />
      </template>
      <template v-if="step === 2">
        <h3 class="font-bold text-lg mb-6">Тема опитування</h3>
        <form @submit="createQuiz">
          <input
            id="email"
            type="text"
            placeholder="Введіть тему з обраного предмету"
            value=""
            class="input input-bordered w-full"
            minlength="3"
            maxlength="200"
            name="Тема опитування"
            required
          /><br />
          <h6 class="mt-4 mb-2 text-neutral-500">Кількість: {{ quizNumber }}</h6>
          <input
            type="range"
            min="1"
            max="15"
            v-model="quizNumber"
            class="range range-sm range-success"
          />
          <button type="submit" class="btn btn-success mt-3 w-full mt-5">Створити</button>
        </form>
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
