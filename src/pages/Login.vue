<script setup>
import { ref } from 'vue'
import axios from 'axios'
import qs from 'qs'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/store_user.js'



const email = ref('')
const password = ref('')
const store = useUserStore()
const router = useRouter()
const baseURL = import.meta.env.VITE_API_BASE_URL




async function handleLogin() {
	try {
		const res = await axios.post(
			`${baseURL}/auth/login`,
			qs.stringify({
				username: email.value,
				password: password.value
			}),
			{
				headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		)

		store.setToken(res.data.access_token)
		await store.fetchUser()

		if (store.user.role === 'teacher') {
			router.push('/teacher-dashboard')
		} else {
			router.push('/student-dashboard')
		}

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
