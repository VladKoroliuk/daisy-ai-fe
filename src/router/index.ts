import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from '../views/ChatPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SigninPage from '../views/SigninPage.vue'
import AppWrapper from '@/views/AppWrapper.vue'
import ChatBody from '@/components/ChatBody.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect() {
        return { name: 'home' }
      }
    },
    {
      path: '/app',
      component: AppWrapper,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'assistant',
          name: 'home',
          component: ChatPage,
          children: [
            {
              path: ':chatID',
              name: 'chat',
              component: ChatBody
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninPage
    }
  ]
})

export default router
