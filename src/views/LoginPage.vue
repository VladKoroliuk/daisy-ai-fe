<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed, ref } from 'vue'
import { getAuthService } from '@/core/services/AuthService'
import { useRouter } from 'vue-router'
import DaisyButton from '@/components/ui/DaisyButton.vue'
import { useLoading } from '@/composables/useLoading'

const auth = getAuthService()
const router = useRouter()
const { runAction: runSubmit, loading: submitLoading } = useLoading(onSubmit, onError)
const serverError = ref('')

const formState = reactive({
  email: '',
  password: ''
})

const formRules = computed(() => ({
  email: { email },
  password: { required }
}))

const v = useVuelidate(formRules, formState)

async function onSubmit(e: Event) {
  e.preventDefault()
  const isFormCorrect = await v.value.$validate()
  if (isFormCorrect) {
    const response: any = await auth.signin(formState.email, formState.password)
    if (response.success) {
      router.push({ name: 'home' })
    } else {
      throw new Error(response.response?.data?.message || response.response.statusText)
    }
  }
}

function onError(error: Error) {
  console.log(error.message)
  serverError.value = error.message
}
</script>
<template>
  <div class="form-page">
    <div class="form-block">
      <h2>Увійти</h2>
      <form @submit="runSubmit">
        <input
          v-model="formState.email"
          type="email"
          placeholder="Email"
          class="input input-bordered w-full"
          required
        />
        <input
          v-model="formState.password"
          type="password"
          placeholder="Пароль"
          class="input input-bordered w-full"
          required
        />
        <div>
          <div class="input-errors" v-for="error of v.$errors" :key="error.$uid">
            <span class="error-msg">{{ error.$message }}</span>
          </div>
          <span class="error-msg">{{ serverError }}</span>
        </div>
        <DaisyButton label="Увійти" :loading="submitLoading"></DaisyButton>
      </form>
      <div class="form-block__bottom-links">
        <RouterLink class="link" :to="{ name: 'signin' }">Реєстрація</RouterLink>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/forms.css"></style>
