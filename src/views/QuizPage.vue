<script setup lang="ts">
import QuizNavigation from '@/components/navigation/QuizNavigation.vue'
</script>

<template>
  <main class="app-container">
    <QuizNavigation />
    <div class="content-container">
      <div class="quiz-page-wrapper">
        <RouterView></RouterView>
      </div>
    </div>
  </main>
</template>
<style scoped>
.quiz-page-wrapper {
  padding: 20px;
}
</style>
