<template>
  <div class="alert" :class="{ 'alert--show': registered }">
    <h3>На вашу почту отпралено сообщение</h3>
    <p>Подтвердите вашу почту</p>
    <button @click="router.push('/signin')" class="btn">ok</button>
  </div>

  <div class="alert" :class="{ 'alert--show': request_error }">
    <p>{{ server_error }}</p>
    <button @click="request_error = false" class="btn">ok</button>
  </div>
  
  <div class="page register" :class="{ 'no-click': registered | request_error}">
    <div class="register__card">
      <h1 class="register__title">Регистрация</h1>
      <p class="register__subtitle">
        Создайте аккаунт, используя электронную почту
      </p>

      <form class="register__form" @submit.prevent="onSubmit">
        <div class="register__field">
          <label class="register__label" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="register__input"
            placeholder="example@mail.com"
            required
          />
        </div>

        <div class="register__field">
          <label class="register__label" for="first_name">Имя</label>
          <input
            id="first_name"
            v-model="form.first_name"
            class="register__input"
            placeholder="Имя"
            required
          />
        </div>

        <div class="register__field">
          <label class="register__label" for="last_name">Фамилия</label>
          <input
            id="last_name"
            v-model="form.last_name"
            class="register__input"
            placeholder="Фамилия"
            required
          />
        </div>
        

        <div class="register__field">
          <label class="register__label" for="password">Пароль</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="register__input"
            placeholder="Минимум 8 символов"
            required
          />
        </div>

        <div class="register__field">
          <label class="register__label" for="passwordConfirm">
            Повторите пароль
          </label>
          <input
            id="passwordConfirm"
            v-model="form.passwordConfirm"
            type="password"
            class="register__input"
            required
          />
        </div>

        <div class="input_container">
          <div class="register__roles">
            <button
              type="button"
              class="register__role"
              :class="{ 'register__role--active': form.role === 'student' }"
              @click="form.role = 'student'"
            >
              <span class="register__role-title">Ученик</span>
              <span class="register__role-desc">Готовлюсь к экзаменам</span>
            </button>

            <button
              type="button"
              class="register__role"
              :class="{ 'register__role--active': form.role === 'teacher' }"
              @click="form.role = 'teacher'"
            >
              <span class="register__role-title">Учитель</span>
              <span class="register__role-desc">Создаю и веду занятия</span>
            </button>
          </div>
          <span v-if="errors.role" class="error_text">
            {{ errors.role }}
          </span>
        </div>

        <button class="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <p class="register__footer">
        Уже есть аккаунт?
        <a href="#" @click="router.push('/signin')" class="register__link">Войти</a>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router';


  const router = useRouter()
  const registered = ref(false)
  const request_error = ref(false)
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
    try {
      if (!validate()) return

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
      console.log(data)
      
      if (response.status == 200) {
        registered.value = true
      }
      else {
        request_error.value = true
        server_error.value = data.detail
        console.log(data)
      }
    } catch (error) {
        request_error.value = true
        server_error.value = 'Не удалось подключиться к серверу, проверьте соединение или попробуйте позже'
    }
  }
</script>

<style lang="scss">
  .register {
    &__card {
      width: 100%;
      max-width: 360px;
      background-color: var(--color-card-bg);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 24px var(--color-badge-bg);

    }

    &__title {
      margin-bottom: 8px;
      font-size: 24px;
      font-weight: 600;
      color: var(--color-accent-blue);
      text-align: center;
    }

    &__subtitle {
      margin-bottom: 24px;
      font-size: 14px;
      color: var(--color-text-muted);
      text-align: center;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    &__label {
      font-size: 12px;
      color: var(--color-accent-blue);
    }

    &__input {
      height: 44px;
      padding: 0 12px;
      border-radius: 10px;
      border: 1px solid var(--color-badge-bg);
      font-size: 14px;
      color: var(--color-accent-blue);
      background-color: var(--color-white);

      &:focus {
        outline: none;
        border-color: var(--color-accent-blue);
      }

      &::placeholder {
        color: var(--color-text-muted);
      }
    }

    &__button {
      margin-top: 8px;
      height: 48px;
      border-radius: 12px;
      border: none;
      background-color: var(--color-accent-orange);
      color: var(--color-white);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 6px 16px var(--color-button-shadow);

      &:active {
        transform: translateY(1px);
      }
    }

    &__footer {
      margin-top: 20px;
      font-size: 13px;
      text-align: center;
      color: var(--color-text-muted);
    }

    &__link {
      color: var(--color-accent-blue);
      text-decoration: none;
      font-weight: 500;
    }

    &__roles {
      display: flex;
      gap: 12px;
    }

    &__role {
    flex: 1;
    padding: 14px 12px;
    border-radius: 12px;
    border: 1px solid var(--color-badge-bg);
    background-color: var(--color-white);
    text-align: left;
    cursor: pointer;

    &--active {
      border-color: var(--color-accent-orange);
      background-color: var(--color-badge-bg);
    }
    }

    &__role-title {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-accent-blue);
    }

    &__role-desc {
      display: block;
      margin-top: 4px;
      font-size: 11px;
      color: var(--color-text-muted);
    }
  }

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


  .error_text {
    font-size: 12px;
    color: var(--color-accent-orange);
  }

  .input_container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
