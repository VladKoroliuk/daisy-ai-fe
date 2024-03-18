<script setup lang="ts">
import { getAuthService } from '@/core/services/AuthService'
import { useRouter } from 'vue-router'
import { getChatService } from '@/core/services/ChatService'
import { useChatStore } from '@/stores/chat'
import { useChatTopicState } from '@/stores/chatTopic'
import NavigationButton from './navigation/NavigationButton.vue'
import { getQuizService } from '@/core/services/QuizService'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const auth = getAuthService()
const response = await auth.refresh()
const chatTopicStore = useChatTopicState()

if (!response.success) {
  router.push({ name: 'login' })
} else {
  const chatStore = useChatStore()
  const chatService = getChatService()
  const quizService = getQuizService()
  const quizStore = useQuizStore()
  const topics = await chatService.getTopics()
  const chats = await chatService.getChats()
  const quizzes = await quizService.getQuizzes()
  chatStore.setChats(chats)
  chatTopicStore.setTopics(topics)
  quizStore.setQuizzes(quizzes)
}
</script>
<template>
  <div class="app">
    <nav>
      <div class="logo">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 10L12 6L20 10L12 14L4 10Z"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 10V14"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 12V17C7 17 7.45455 19 12 19C16.5455 19 17 17 17 17V12"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <ul class="nav-list">
        <li>
          <NavigationButton :to="{ name: 'home' }" text="Чат"
            ><template #icon>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12C4 7.58172 7.58172 4 12 4V4C16.4183 4 20 7.58172 20 12V17.0909C20 17.9375 20 18.3608 19.8739 18.6989C19.6712 19.2425 19.2425 19.6712 18.6989 19.8739C18.3608 20 17.9375 20 17.0909 20H12C7.58172 20 4 16.4183 4 12V12Z"
                  stroke="#3c404d"
                  stroke-width="2"
                />
                <path
                  d="M9 11L15 11"
                  stroke="#3c404d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 15H15"
                  stroke="#3c404d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg> </template
          ></NavigationButton>
        </li>
        <li>
          <NavigationButton :to="{ name: 'quizzes' }" text="Тест"
            ><template #icon>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 7L13 7" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                <path d="M9 15L12 15" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                <path d="M9 11L15 11" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                <path
                  d="M19 11V9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3H11C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H12"
                  stroke="#33363F"
                  stroke-width="2"
                />
                <circle cx="17.5" cy="17.5" r="2.5" stroke="#33363F" stroke-width="2" />
                <path
                  d="M21 21L19.5 19.5"
                  stroke="#33363F"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg> </template
          ></NavigationButton>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </div>
</template>
<style scoped>
.app {
  display: grid;
  grid-template-columns: 80px 1fr;
  min-height: 100vh;
}

.app > nav {
  border-right: 1px solid rgb(214, 214, 214);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 20px;
}
.logo {
  background-color: hsl(158 64% 52%);
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
  align-items: center;
  border-radius: 8px;
}
.nav-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
