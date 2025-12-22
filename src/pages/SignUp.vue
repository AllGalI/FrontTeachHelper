<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router';


  const router = useRouter()
  const registered = ref(false)
  const server_error = ref('')
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const form = reactive({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirm: '',
    role: '',
  })

  const errors = reactive({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirm: '',
    role: '',
  })

  const validate = () => {
    let isValid = true

    // очищаем старые ошибки
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })

    // роль
    if (!form.role) {
      errors.role = 'Выберите роль'
      isValid = false
    }

    if (!form.first_name) {
      errors.first_name = 'Заполните имя'
      isValid = false
    }

    if (!form.last_name) {
      errors.last_name = 'Заполните фаиилию'
      isValid = false
    }

    // email
    if (!form.email) {
      errors.email = 'Введите email'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Некорректный email'
      isValid = false
    }

    // пароль
    if (!form.password) {
      errors.password = 'Введите пароль'
      isValid = false
    } else if (form.password.length < 8) {
      errors.password = 'Минимум 8 символов'
      isValid = false
    }

    // подтверждение пароля
    if (!form.passwordConfirm) {
      errors.passwordConfirm = 'Повторите пароль'
      isValid = false
    } else if (form.password !== form.passwordConfirm) {
      errors.passwordConfirm = 'Пароли не совпадают'
      isValid = false
    }

    return isValid
  }

  async function onSubmit () {
    if (!validate()) return
    try {

      const response = await fetch(baseURL + "/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": form.email,
          "first_name": form.first_name,
          "last_name": form.last_name,
          "password": form.password,
          "role": form.role,
        })
      })

      const data = await response.json()

      if (response.status == 200) {
        registered.value = true
      }
      else if (response.status == 409) {
        router.push('/confirm_email?email=' + form.email)
      }
      else {
        server_error.value = data.detail
      }
    } catch (error) {
        server_error.value = 'Не удалось подключиться к серверу, проверьте соединение или попробуйте позже'
    }
  }
</script>


<template>
  <div class="alert" :class="{ 'alert--show': registered }">
    <h3>На вашу почту отпралено сообщение</h3>
    <p>Подтвердите вашу почту</p>
    <button @click="router.push('/signin')" class="btn">ok</button>
  </div>

  <div class="alert" :class="{ 'alert--show': server_error.length != 0 }">
    <p>{{ server_error }}</p>
    <button @click="server_error = ''" class="btn">ok</button>
  </div>
  
  <div class="page" :class="{ 'no-click': registered | server_error.length != 0}">
    <div class="page__card">
      <h1 class="page__title">Регистрация</h1>
      <p class="page__subtitle">
        Создайте аккаунт, используя электронную почту
      </p>

      <form class="page__form" @submit.prevent="onSubmit">
        <div class="page__field">
          <label class="page__label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="page__input"
            placeholder="example@mail.com"
            required
          />
        </div>

        <div class="page__field">
          <label class="page__label" for="first_name">Имя</label>
          <input
            id="first_name"
            v-model="form.first_name"
            class="page__input"
            placeholder="Имя"
            required
          />
        </div>

        <div class="page__field">
          <label class="page__label" for="last_name">Фамилия</label>
          <input
            id="last_name"
            v-model="form.last_name"
            class="page__input"
            placeholder="Фамилия"
            required
          />
        </div>
        

        <div class="page__field">
          <label class="page__label" for="password">Пароль</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="page__input"
            placeholder="Минимум 8 символов"
            required
          />
        </div>

        <div class="page__field">
          <label class="page__label" for="passwordConfirm">
            Повторите пароль
          </label>
          <input
            id="passwordConfirm"
            v-model="form.passwordConfirm"
            type="password"
            class="page__input"
            required
          />
          <span v-if="errors.passwordConfirm" class="error_text">
            {{ errors.passwordConfirm }}
          </span>
        </div>

        <div class="page__field">
          <div class="page__roles">
            <button
              type="button"
              class="page__role"
              :class="{ 'page__role--active': form.role === 'student' }"
              @click="form.role = 'student'"
            >
              <span class="page__role-title">Ученик</span>
              <span class="page__role-desc">Готовлюсь к экзаменам</span>
            </button>

            <button
              type="button"
              class="page__role"
              :class="{ 'page__role--active': form.role === 'teacher' }"
              @click="form.role = 'teacher'"
            >
              <span class="page__role-title">Учитель</span>
              <span class="page__role-desc">Создаю и веду занятия</span>
            </button>
          </div>
          <span v-if="errors.role" class="error_text">
            {{ errors.role }}
          </span>
        </div>

        <button class="page__button" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <p class="page__footer">
        Уже есть аккаунт?
        <a href="#" @click="router.push('/signin')" class="page__link">Войти</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss">

  .no-click, .no-click * {
    pointer-events: none;
    background-color: white;
    filter: blur(5px);

  }

  .alert {
    // height: clamp(188px, 188px, 300px);
    width: clamp(80vw, 360px, 360px);
    opacity: 0;
    user-select: none;
    pointer-events: none;

    max-width: 360px;
    position: fixed;
    z-index: 100;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 40%);
    
    padding: var(--spacing-l);

    color: var(--color-accent-blue);
    background-color: var(--color-primary-bg);
    border-radius: 32px;
    border: none;

    transition: transform .1s;

    &--show {
      opacity: 1;
      user-select: all;
      pointer-events: all;
      transform: translate(-50%, 50%)
    }
  }

</style>
