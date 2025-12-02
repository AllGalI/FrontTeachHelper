<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/store_user.js'


const router = useRouter()

const email = ref('')
const password = ref('')
const baseURL = import.meta.env.VITE_API_BASE_URL



async function handleLogin() {
	try {
		let response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          "username": email.value,
          "password": password.value
        })
      }
		)

    data = await response.json()
    console.log(data)

    response = await fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      headers: {
        'Athorization': data.token
      },
    })

    // data = await response.json()
    // console.log(data)


		

		// if (store.user.role === 'teacher') {
		// 	router.push('/teacher-dashboard')
		// } else {
		// 	router.push('/student-dashboard')
		// }

	} catch (err) {
		console.error('Ошибка входа', err)
	}

}
</script>

<template>
<div class="login-page" style="max-width:1230px; margin:auto; padding-top:50px;">
	<h2>Вход</h2>
		<el-form @submit.prevent="handleLogin">
			<el-form-item label="Email">
				<el-input v-model="email" type="email" placeholder="Введите email" />
			</el-form-item>

			<el-form-item label="Пароль">
				<el-input v-model="password" type="password" placeholder="Введите пароль" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="handleLogin" style="width:100%">Войти</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
