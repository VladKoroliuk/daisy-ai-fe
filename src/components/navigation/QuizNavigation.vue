<script setup lang="ts">
import { ref } from 'vue'
import SubNavigationLayout from './SubNavigationLayout.vue'
import CreateQuizForm from '../CreateQuizForm.vue'
import QuizzesList from './QuizzesList.vue'

const modal = ref<null | { showModal: () => null; close: () => null }>(null)
const createQuiz = () => {
  if (modal.value) modal.value.showModal()
}

const closeModal = () => {
  if (modal.value) modal.value.close()
}
</script>

<template>
  <SubNavigationLayout>
    <dialog ref="modal" id="my_modal_2" class="modal">
      <CreateQuizForm @close="closeModal" />
    </dialog>
    <ul>
      <li class="navigation-item">
        <button
          class="btn btn-wide btn-success rounded-lg text-secondary-content"
          @click="createQuiz"
        >
          Створити тест
        </button>
      </li>
      <QuizzesList />
    </ul>
  </SubNavigationLayout>
</template>
