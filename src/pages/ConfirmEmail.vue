<script setup>
  import { ref } from 'vue';
  import { useRouter, useRoute, RouterLink} from 'vue-router'


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

<style scoped lang="scss">

@use '@/styles/_mixins.scss';

.forgotPage {
	@include mixins.column;
		width: 350px;
		height: 100%;
		align-items: center;
		justify-content: center;
}

.card {
	@include mixins.column;
	@include mixins.center;

	padding: 2rem 1rem;
	border-radius: 1rem;
	box-shadow: 0 0 4px rgb(211, 205, 205);
}

.placeholder {
	height: 60px;
}

img {
	height: 48px;
	width: 48px;
}

h1{
	cursor: default;
	font-size: 1.25rem
}

h2 {
	cursor: default;
	font-size: 1rem
}

p {
	cursor: default;
	font-size: 0.9rem;
	text-align: center;
}

.emailFieldBlock {
	@include mixins.column;
	width: 100%;
}

.sendButton {
	@include mixins.fieldRectangle;
	@include mixins.row;
	@include mixins.center;

	color: var(--color-white);

	background-color: var(--color-primary);

	&:hover {
		cursor: pointer;
		background: 
		linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), 
		var(--color-primary);
	}

	&:active {
		background: none;
		background-color: var(--color-primary-dark)
	}

}

.emailField {
	@include mixins.fieldRectangle;	

	padding-left: 5px;

	&:hover {
		background-color: #e5eaf0;
	}

	&:focus {
		outline: 1px solid var(--color-primary);
	}
}

</style>

<!-- https://www.freeconvert.com/svg-converter/download -->      