<script setup>
  import { ref } from 'vue';
  import { useRouter, RouterLink} from 'vue-router'


  const router = useRouter()
  const currentRoute = router.currentRoute.value;
  const token = currentRoute.query.token;

  const loading = ref(false)
  const message = ref('')

  const baseURL = import.meta.env.VITE_API_BASE_URL

  async function confirmEmail(){
    message.value = ''
    loading.value = true

    try {
      console.log({ token: token })
      const response = await fetch(baseURL + '/auth/confirm_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ token: token })
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        message.value = data.message || 'Письмо с ссылкой отправлено на ваш email!'

        setTimeout(() => {
          router.push('/login')
        }, 500)
      } else {
        if (response.status == 422) {
          message.value = data.detail[0].msg
        }
        else {
          message.value = data.detail || 'Что-то пошло не так'
        }
      }
    } catch (err) {
      message.value = 'Не удалось соединиться с сервером. Проверьте интернет.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="forgotPage">
    <div class="card">
      <RouterLink to="/validate_email" style="align-self: flex-start;">← Back</RouterLink>
      <img src="@/assets/logo.svg" alt="logo">
      <h1>Confirm your Email</h1>
      <p>After confirmation you can use your account</p>


      <button 
        @click="confirmEmail" 
        class="sendButton" 
        :disabled="loading"
      >
        {{ loading ? 'Отправляем...' : 'Confirm email' }}
      </button>
      <div v-if="message">{{ message }}</div>
    </div>
  </div>
</template> 
