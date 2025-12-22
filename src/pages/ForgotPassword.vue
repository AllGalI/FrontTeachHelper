<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'

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
      console.log(JSON.stringify({ "email": email.value }))
      const response = await fetch(baseURL + '/auth/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "email": email.value })
      })

      const data = await response.json()

      if (response.ok) {
        
        message.value = data.message || 'Письмо с ссылкой отправлено на ваш email!'
        error.value = false
        setTimeout(() => {
          router.push('/confirm_reset?email=' + email.value)
        }, 1000)

      } else if (response.status == 422) {
        message.value = data.detail[0].msg
      } else {
        message.value = data.detail || 'Что-то пошло не так'
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
  <div class="page">
    <div class="page__card">
      <h1 class="page__title">Введите email</h1>
      <p class="warning">Укажите почту на которую привязан аккаунт</p>
      <form class="page__form">
        <div class="page__field">
          <label class="page__label" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="page__input"
            placeholder="example@mail.com"
            required
          />
        </div>
        <button @click.prevent="sendResetEmail" class="btn">Отправить код</button>
      </form>
      <p v-if="expiration > 0 && expiration < 60">Отправить повторно через: {{ expiration }}</p>

      <p class="error_text">{{ message }}</p>
    </div>
  </div>
</template> 