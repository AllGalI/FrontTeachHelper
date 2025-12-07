<script setup>
  import { ref } from 'vue';
  import { RouterView, useRouter } from 'vue-router'


  const router = useRouter()

  const email = ref('')
  const loading = ref(false)
  const message = ref('')      // успех или ошибка — одно поле
  const error = ref(false)     // чтобы менять цвет сообщения

  const baseURL = import.meta.env.VITE_API_BASE_URL

  async function sendResetEmail(){
    message.value = ''
    error.value = false
    loading.value = true

    try {
      const response = await fetch(baseURL + '/auth/send_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email.value })
      })

      const data = await response.json()

      if (response.ok) {
        message.value = data.message || 'Письмо с ссылкой отправлено на ваш email!'
        error.value = false

        setTimeout(() => {
          router.push('/')
        }, 500)
      } else {
        if (response.status == 422) {
          message.value = data.detail[0].msg
        }
        else {
          message.value = data.detail || 'Что-то пошло не так'
        }

        error.value = true
      }
    } catch (err) {
      message.value = 'Не удалось соединиться с сервером. Проверьте интернет.'
      error.value = true
      console.error(err)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="forgotPage">
    <form @submit.prevent="sendResetEmail" class="card">
      <img src="@/assets/logo.svg" alt="logo">
      <h1>Send verification link</h1>
      <p>Enter your user account's verified email address and we will send you a password reset link.</p>
      <input
        v-model="email" 
        type="email"
        class="emailField" 
        placeholder="Enter your email address"
        required
      >

      <!-- Сообщение об успехе/ошибке -->
      <div v-if="message">
        {{ message }}
      </div>

      <button 
        @click="sendResetEmail" 
        class="sendButton" 
        :disabled="loading || !email"
      >
        {{ loading ? 'Отправляем...' : 'Send password reset email' }}
      </button>
    </form>
  </div>
</template>
