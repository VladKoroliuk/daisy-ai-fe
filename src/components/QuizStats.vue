<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
import type { Quiz } from '@/core/services/QuizService'

const props = defineProps<{
  answers: Record<string, string>
  quiz: Quiz
}>()
const emit = defineEmits(['redo'])

const getCorrectAnswerID = (sectionID: string) => {
  const section = props.quiz.sections.find((s) => s.id == sectionID)
  if (!section) return ''
  const correctOption = section.options.find((o) => o.isCorrect)
  if (!correctOption) return ''
  return correctOption.id
}
const redo = () => {
  emit('redo')
}

const correctNumber = computed(() => {
  let correct = 0
  props.quiz.sections.forEach((s) => {
    if (s.currentOption == getCorrectAnswerID(s.id)) {
      correct++
    }
  })
  return correct
})

const correctStat = computed(() => {
  return Math.round((correctNumber.value / props.quiz.sections.length) * 100)
})
</script>
<template>
  <div class="quiz">
    <h3 class="title flex justify-between">
      <div class="title">
        <img src="@/assets/icons/ai.png" />
        Тест: {{ props.quiz.topic.label }}
      </div>
      <button class="btn btn-active btn-accent btn-sm" @click="redo">Перепройти тест</button>
    </h3>
    <div class="stats">
      <div
        class="radial-progress bg-white text-success"
        style="--size: 10rem"
        :style="{ '--value': correctStat }"
        role="progressbar"
      >
        {{ correctStat }}%
      </div>
    </div>
    <div class="quizzes-container">
      <div class="quizzes">
        <div
          class="collapse collapse-arrow"
          v-for="section in props.quiz.sections"
          :key="section.id"
        >
          <input type="radio" name="my-accordion-2" :checked="true" />
          <div class="collapse-title">
            <svg
              v-if="getCorrectAnswerID(section.id) != section.currentOption"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#e83339"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#e83339"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                stroke="#33e84b"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            {{ section.question }}
          </div>
          <div class="collapse-content">
            <ul>
              <li v-for="opt in section.options" :key="opt.id">
                <div
                  class="mark"
                  :class="{
                    mark_correct: getCorrectAnswerID(section.id) == opt.id,
                    mark_wrong:
                      props.answers[section.id] == opt.id &&
                      getCorrectAnswerID(section.id) != opt.id
                  }"
                >
                  <svg
                    v-if="getCorrectAnswerID(section.id) == opt.id"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <svg
                    v-else-if="
                      props.answers[section.id] == opt.id &&
                      getCorrectAnswerID(section.id) != opt.id
                    "
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                {{ opt.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.quiz {
  width: 900px;
  max-width: 100%;
  /* max-height: calc(100vh - 100px);
  overflow-y: auto; */
}
@media (max-width: 1320px) {
  .quiz {
    width: 100%;
  }
}
.stats {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.quizzes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.quizzes-container {
  margin-top: 40px;
  max-height: 700px;
  overflow-y: auto;
}
@media (max-height: 1080px) {
  .quizzes-container {
    max-height: 600px;
  }
}
@media (max-height: 980px) {
  .quizzes-container {
    max-height: 500px;
  }
}
.collapse {
  background-color: rgb(241, 241, 241);
}
.radial-progress {
  font-size: 30px;
  font-weight: bold;
}
.collapse-content li {
  color: rgb(77, 77, 77);
  display: flex;
  padding-left: 30px;
}
.collapse-title {
  display: flex;
  gap: 10px;
}
.mark {
  width: 20px;
  height: 20px;
  background-color: rgb(212, 212, 212);
  border-radius: 50%;
  margin-right: 5px;
  display: grid;
  place-items: center;
}
.mark_correct {
  background-color: #33e84b;
}
.mark_wrong {
  background-color: #e83339;
}
</style>
