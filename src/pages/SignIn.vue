<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const password_field = ref(null)
  const passwordHidden = ref(true)
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const loading = ref(false)
  const message = ref('')

  const form = reactive({
    email: '',
    password: '',
  })
  
  const errors = reactive({
    email: '',
    password: ''
  })

  function togglePassword() {
    passwordHidden.value = !passwordHidden.value
    password_field.value.type = passwordHidden.value? 'password': 'text'
  }

  function validate() {
    let isValid = true

    Object.keys(errors).forEach(key => {
      errors[key] = ''
    });

    if (!form.email) {
      errors.email = 'Заполните почту'
      isValid = false
    }

    if (!form.email) {
      errors.email = 'Введите пароль'
      isValid = false
    }

    return isValid
  }

  async function signIn() {
    console.log('start')
    if (!validate) return

    message.value = ''
    loading.value = true

    try {
      const formData = new URLSearchParams();
      formData.append('username', email.value);
      formData.append('password', password.value);

      const response = await fetch(baseURL + "/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('authToken', data.token)

        setTimeout(() => {
            router.push('/works')
          }, 500
        )
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
	<div class="page">
    <div class="page__card">
      <h1 class="page__title">Sign in to TextHelper</h1>
      <form class="page__form" action="">
        <div class="page__field">
          <label class="page__label" for="email">Email</label>
          <input v-model="form.email" class="page__input" type="email" id="email" placeholder="example@mail.ru">
        </div>
        <div class="page__field">
          <div class="relativ_box">
            <label class="page__label" for="email">Password</label>
            <RouterLink class="forgotLink" to="/forgot_password">Forgot password?</RouterLink>
            <div class="relativ_box">
              <input
                v-model="form.password"
                class="page__input"
                type="password"
                id="password"
                placeholder="password"
                ref="password_field"
              >
              <img 
                class="eye_icon" :src="passwordHidden? 'src/assets/icon-close-eye.png': 'src/assets/icon-eye.png'" 
                @click.prevent="togglePassword"
                alt="">
            </div>
          </div>
        </div>

        <button 
          @click.prevent="signIn"
          class="page__button"
          type="submit" :disabled="loading"
        >
          Войти 
        </button>
        <div>{{ message }}</div>
  			<div class="row signinRow">
  				<span>Нет аккаунта?</span>
  				<RouterLink to="/signup">Зарегистрироваться</RouterLink>
  			</div>
      </form>
    </div>
	</div>
</template>


<style scoped>
  .relativ_box {
    position: relative;
  }

  .forgotLink {
    position: absolute;
    right: 0;
  	text-decoration: none;
  	font-size: small;
  	transition: text-decoratoin 0.2s;
  }

  .forgotLink:hover {
  	text-decoration: underline
  }

</style>