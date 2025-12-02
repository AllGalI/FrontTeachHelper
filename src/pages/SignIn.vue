<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const email = ref('')
  const password = ref('')

  const message = ref('')
  const loading = ref(false)

  const baseURL = import.meta.env.VITE_API_BASE_URL
  const router = useRouter()
  async function signIn() {
    message.value = ''
    loading.value = true

    try {
      console.log
      const formData = new URLSearchParams();
      formData.append('username', email.value);
      formData.append('password', password.value);
      console.log(formData.toString())

      const response = await fetch(baseURL + "/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      })

      const data = await response.json()
      console.log(data)
      localStorage.setItem('authToken', data.token)

      if (response.ok) {
        setTimeout(() => {
            router.push('/')
          }, 500
        )
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
	<div class="signinPage">
		<span class="formHeader">Sign in to TextHelper</span>
		<form @submit.prevent="signIn" class="signInForm">
			<label class="placeholder" for="email">Email</label>
			<input v-model="email" type="email" name="email" class="reg_card_field" required>
			<label class="formRow placeholder" for="password">
				<span>Password</span>
				<RouterLink class="forgotLink" to="/forgot_password">Forgot password?</RouterLink>
			</label>
			<input v-model="password" type="password" name="password" class="reg_card_field" required>
			<button class="placeholder oauth2Button sinInButton" :disabled="loading">Sign in</button>
			<!-- <div class="authentication-divider">or</div> -->
			<!-- <button class="oauth2Button">
				<img class="oauth2ButtonImage" src="@/assets/gmail.jpg" alt="gmail">
				Continue with Google
			</button>
			<button class="oauth2Button">
				<img class="oauth2ButtonImage" src="@/assets/mail.jpg" alt="mail">
				Continue with Mail
			</button> -->
			<div class="row placeholder signinRow">
				<span>New to TextHelper?</span>
				<RouterLink class="forgotLink" to="/signup">Create an account</RouterLink>
			</div>
			
			
		</form>
	</div>
</template>


<style scoped>

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