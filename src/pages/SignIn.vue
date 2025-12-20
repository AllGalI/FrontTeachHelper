<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const password_field = ref(null)
  const passwordHidden = ref(true)
  const baseURL = import.meta.env.VITE_API_BASE_URL

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
    console.log(password_field.type)
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
            router.push('/')
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
          <label class="page__label" for="email">Password</label>
          <div class="password_box">
            <input v-model="form.password" class="page__input" type="password" id="password" placeholder="password" ref="password_field">
            <img 
              class="icon" :src="passwordHidden? 'src/assets/icon-close-eye.png': 'src/assets/icon-eye.png'" 
              @click.prevent="togglePassword"
              alt="">
          </div>
        </div>

        <button @click.prevent="signIn" class="page__button" type="submit">
          Войти 
        </button>

      </form>
    </div>
	</div>
</template>


<style scoped>
  /* .password__icon {
    height: 100%;
    position: relative;
    right: 12px;
  } */
  .page__input {
    width: 100%;
  }

  .password_box {
    width: 100%;
    height: 44px;
    position: relative;
  }



  .icon {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    height: 18px;
    width: 18px;
  }



.signinPage {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;



}

.forgotLink {
	text-decoration: none;
	font-size: small;
	transition: text-decoratoin 0.2s;
}

.forgotLink:hover {
	text-decoration: underline
}


.signinRow {
	justify-content: center;
	font-size: small;
}

.placeholder {
	margin-top: 16px !important;
}

.signInForm {
	width: 384px;
	height: 600px;
	display: flex;
	flex-direction: column;
}

.formHeader {
	font-size: 20px;
	font-weight: 600;
}

.formRow {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

}

.reg_card_field {
	width: 100%;
	height: 39px;
	
	border: 1px solid var(--color-gray-cool);
	border-radius: 5px;
	box-sizing: border-box;
	padding-left: 10px;
}

.authentication-divider {
	width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0; /* отступ сверху/снизу */
	margin: 20px 0 8px
}

.authentication-divider::before {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ccc; 
  margin-right: 10px;
}
.authentication-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ccc; 
  margin-left: 10px;
}

.authentication-divider span {
  color: #888; /* цвет текста */
  font-weight: 500;
}

.oauth2Button {
	width: 100%;
	height: 35px;
	margin-top: 8px;
	background-color: #eff2f5;
	border: 1px solid var(--color-gray-cool);
	border-radius: 5px;
	padding: 0 0;


	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 5px;

	transition: background-color 0.3s;
}


.oauth2Button:hover {
	background-color: #e5eaf0;
}

.sinInButton {
	color: var(--color-white);
	text-decoration: none;

	background-color: var(--color-primary);
}

.sinInButton:hover {
	background-color: #1862bd;

}


.oauth2ButtonImage {
	width: 20px;
	height: 20px;
	border-radius: 5px;
}

</style>