<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { getAuthService } from '@/core/services/AuthService'
import { useRouter } from 'vue-router'
import DaisyButton from '@/components/ui/DaisyButton.vue'
import { useLoading } from '@/composables/useLoading'

const auth = getAuthService()
const router = useRouter()
const { runAction: runSubmit, loading: submitLoading } = useLoading(onSubmit, onError)

const formState = reactive({
  email: 'example@mail.com',
  password: 'changeme',
  firstName: 'Vlad',
  lastName: 'Koroliuk'
})

const formRules = computed(() => ({
  email: { email },
  password: { required },
  firstName: { required },
  lastName: { required }
}))

const v = useVuelidate(formRules, formState)

async function onSubmit(e: Event) {
  e.preventDefault()
  const isFormCorrect = await v.value.$validate()
  if (isFormCorrect) {
    const response: any = await auth.signup({
      email: formState.email,
      password: formState.password,
      firstName: formState.firstName,
      lastName: formState.lastName
    })
    if (response.success) {
      router.push({ name: 'home' })
    } else {
      throw new Error(response.response?.data?.message || response.response.statusText)
    }
  }
}

function onError(error: Error) {
  console.log(error.message)
}
</script>
<template>
  <div class="form-page">
    <div class="form-block">
      <h2>Реєстрація</h2>
      <form @submit="runSubmit">
        <input
          v-model="formState.email"
          type="email"
          placeholder="Email"
          class="input input-bordered w-full"
        />
        <input
          v-model="formState.firstName"
          type="text"
          placeholder="Ім'я"
          class="input input-bordered w-full"
        />
        <input
          v-model="formState.lastName"
          type="text"
          placeholder="Прізвище"
          class="input input-bordered w-full"
        />
        <input
          v-model="formState.password"
          type="password"
          placeholder="Пароль"
          class="input input-bordered w-full"
        />
        <div>
          <div class="input-errors" v-for="error of v.$errors" :key="error.$uid">
            <span class="error-msg">{{ error.$message }}</span>
          </div>
        </div>
        <DaisyButton label="Продовжити" :loading="submitLoading"></DaisyButton>
      </form>
      <div class="form-block__bottom-links">
        <RouterLink class="link" :to="{ name: 'login' }">Увійти</RouterLink>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/forms.css"></style>
