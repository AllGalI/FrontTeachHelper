<script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'

  const baseURL = import.meta.env.VITE_API_BASE_URL

  const passField = ref(null);
  const repeatField = ref(null);
  const passEye = ref(null);
  const repeatEye = ref(null);

  // Состояние видимости пароля
  const isPassVisible = ref(false);
  const isRepeatVisible = ref(false);

  function togglePasswordVisibility(fieldRef, isVisibleRef) {
    if (fieldRef.value) {
      isVisibleRef.value = !isVisibleRef.value;
      fieldRef.value.type = isVisibleRef.value ? 'text' : 'password';
    }
  }

  // Обработчики кликов
  function handlePassEyeClick() {
    togglePasswordVisibility(passField, isPassVisible);
    updateEyeIcon(passEye, isPassVisible.value);
  }

  function handleRepeatEyeClick() {
    togglePasswordVisibility(repeatField, isRepeatVisible);
    updateEyeIcon(repeatEye, isRepeatVisible.value);
  }

  // Обновление иконки глаза
  function updateEyeIcon(eyeRef, isVisible) {
    console.log(isVisible)
    if (eyeRef.value) {
      eyeRef.value.src = isVisible 
        ? baseURL + 'assets/icon-eye.png'
        : baseURL + 'assets/icon-close-eye.png';
    }
  }

  const router = useRouter()
  const route = useRoute()
  const password = ref('')
  const passwordConfirm = ref('')

  const loading = ref(false)
  const message = ref('')      // успех или ошибка — одно поле


  function validate() {
    let isValid = true

    if (password.value.length < 8) {
      message.value = 'Пароль должен быть длинной не менее 8 символов'
      return false
    }

    if (password.value != passwordConfirm.value) {
      message.value = 'Пароли не совпадают'
      isValid = false
    }
    return isValid
  }

  async function resetPassword(){
    message.value = ''
    if (!validate()) return
    loading.value = true

    try {
      const response = await fetch(baseURL + '/auth/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 
          "token": route.query.token,
          "password": password.value
        })
      })

      const data = await response.json()

      if (response.ok) {
        message.value = data.message || 'Письмо с ссылкой отправлено на ваш email!'

        setTimeout(() => {
          router.push('/signin')
        }, 1000)

      } else if (response.status == 422) {
        message.value = data.detail[0].msg
      } else {
        message.value = data.detail || 'Что-то пошло не так'
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
      <h1 class="page__title">Новый пароль</h1>
      <p class="warning">Введите новый пароль</p>
      <form class="page__form">
        <div class="page__field">
          <label class="page__label" for="email">Password</label>
          <div style="position: relative;">
            <input
              v-model="password"
              class="page__input"
              type="password"
              id="password"
              ref="passField"
              required=""
            >
            <img 
              class="eye_icon" 
              :src="isPassVisible
                ? 'src/assets/icon-eye.png'
                : 'src/assets/icon-close-eye.png'"
              @click.prevent="handlePassEyeClick"
              alt=""
              ref="passEye"
            >
          </div>
        </div>
        <div class="page__field">
          <label class="page__label" for="passwordConfirm">
            Повторите пароль
          </label>
          <div style="position: relative;">
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              class="page__input"
              ref="repeatField"
              required
            />
           <img 
              class="eye_icon" 
              :src="isRepeatVisible
                ? 'src/assets/icon-eye.png'
                : 'src/assets/icon-close-eye.png'"
              @click.prevent="handleRepeatEyeClick"
              alt=""
              ref="repeatEye"
            >
          </div>
        </div>
        <button @click.prevent="resetPassword" class="btn" :disabled="loading" >Обновить пароль</button>
      </form>
      <p class="error_text">{{ message }}</p>
    </div>
  </div>
</template> 