<script setup lang="ts">
import QuizSection from './quiz/QuizSection.vue'
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import type { Quiz, QuizSection as QuizSectionType } from '@/core/services/QuizService'
import { getQuizService } from '@/core/services/QuizService'
import AppLoading from '@/components/ui/AppLoading.vue'
import QuizStats from '@/components/QuizStats.vue'

const route = useRoute()
const quizStore = useQuizStore()
const quizService = getQuizService()

const currentQuizID = ref<null | string>(null)
const currentQuiz = ref<Quiz | null>(null)
const currentSection = ref(0)
const answers = reactive<Record<string, string>>({})
const loading = ref(false)
const isQuizCompleted = ref(false)

const setupQuiz = (id: string) => {
  currentQuizID.value = id
  const quiz = quizStore.quizState.find((q) => q.id == id)
  if (quiz) {
    if (quiz.sections[0].currentOption) {
      isQuizCompleted.value = true
      for (const key in answers) {
        delete answers[key]
      }
      quiz.sections.forEach((s) => {
        answers[s.id] = s.currentOption || ''
      })
    }
    currentQuiz.value = quiz
  }
}

const updateQuiz = () => {
  currentSection.value = 0
  isQuizCompleted.value = false
  setupQuiz(route.params.quizID as string)
}

onMounted(() => updateQuiz())

const sections = computed<QuizSectionType[]>(() => currentQuiz.value?.sections || [])

const nextSection = () => {
  if (currentSection.value + 1 == sections.value.length) {
    finishTest()
    return
  }
  currentSection.value = currentSection.value + 1
}
const prevSection = () => {
  if (currentSection.value == 0) {
    return
  }
  currentSection.value = currentSection.value - 1
}

watch(
  () => route.params.quizID,
  () => updateQuiz()
)

const currentSectionID = computed(() => {
  return sections.value[currentSection.value].id
})

const selectOption = (optionID: string) => {
  answers[currentSectionID.value] = optionID
}

const canMoveNext = computed(() => {
  return !!answers[currentSectionID.value]
})

const finishTest = async () => {
  loading.value = true
  await saveTestResults()
  loading.value = false
  updateQuiz()
}

const saveTestResults = async () => {
  const quiz = await quizService.saveResults(answers)
  const quizzes = await quizService.getQuizzes()
  quizStore.setQuizzes(quizzes)
  return quiz
}

const redoTest = async () => {
  if (currentQuizID.value) {
    await quizService.clearOptions(currentQuizID.value)
    window.location.reload()
  }
}
</script>
<template>
  <template v-if="!loading">
    <div class="quiz" v-if="!isQuizCompleted">
      <h3 class="title" v-if="currentQuiz && sections.length">
        <img src="@/assets/icons/ai.png" />
        Тест: {{ currentQuiz?.topic.label }}
      </h3>
      <template v-if="currentQuiz && sections.length">
        <div class="quiz-progress-block">
          <progress
            class="progress progress-info w-70 quiz-progress"
            :value="currentSection + 1"
            :max="sections.length"
          ></progress>
          <span>{{ currentSection + 1 }}/{{ sections.length }}</span>
        </div>
        <h5>З теми: {{ currentQuiz.subTopic }}</h5>
        <QuizSection
          :section="sections[currentSection]"
          :active-option="answers[currentSectionID]"
          @next="nextSection"
          @prev="prevSection"
          @select="selectOption"
        >
          <div class="tooltip tooltip-info" data-tip="Попередній тест">
            <button @click="prevSection">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 6L9 12L15 18" stroke="#222222" />
              </svg>
            </button>
          </div>
          <div class="tooltip tooltip-info" data-tip="Наступний тест">
            <button @click="nextSection" :disabled="!canMoveNext">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6L15 12L9 18" stroke="#222222" />
              </svg>
            </button></div
        ></QuizSection>
        <button class="next-button" @click="nextSection" :disabled="!canMoveNext">Далі</button>
      </template>
    </div>
    <div v-else>
      <QuizStats v-if="currentQuiz" :quiz="currentQuiz" :answers="answers" @redo="redoTest" />
    </div>
  </template>
  <template v-else>
    <AppLoading />
  </template>
</template>
<style>
.quiz-progress {
  height: 15px;
  background-color: rgb(219, 219, 219);
}
.title {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
}
.title > img {
  width: 30px;
}
.quiz-progress-block {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
}
.quiz-progress-block span {
  font-size: 15px;
  color: gray;
}
.quiz {
  width: 360px;
  margin: 0 auto;
}
.quiz h5 {
  font-size: 15px;
  color: gray;
}
.next-button {
  width: 100%;
  background: linear-gradient(164deg, rgba(58, 191, 248, 1) 8%, rgba(0, 255, 111, 1) 96%);
  padding: 8px 0;
  border-radius: 8px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
}
.next-button[disabled] {
  background: rgb(209, 209, 209);
}
.quiz-question {
  margin-top: 10px;
  color: rgb(65, 65, 65);
}
.progress {
  transition: 0.2s;
}
</style>
