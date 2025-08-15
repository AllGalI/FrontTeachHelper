<script setup>
import { ref } from 'vue'
import axios from 'axios'


const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const fullName = ref('')
const userRole = ref('student')
const baseURL = import.meta.env.VITE_API_BASE_URL


async function handleRegistration() {
  try {
	if (password.value !== confirmPassword.value) {
		alert('Пароли не совпадают!')
		return
	}
	const res = await axios.post(`${baseURL}/auth/register`, {
		email: email.value,
		password: password.value,
		full_name: fullName.value,
		role: userRole.value
	})
    console.log('Ответ сервера:', res.data)
  } catch (err) {
    console.error('Ошибка входа', err)
  }
}
</script>

<template>
  <div class="registrate-page" style="max-width:1230px; margin:auto; padding-top:50px;">
	<h2>Регистрация</h2>
		<el-form @submit.prevent="handleRegistration">
		<el-form-item label="Email">
			<el-input v-model="email" type="email" placeholder="Введите email" />
		</el-form-item>

		<el-form-item label="Полное имя">
			<el-input v-model="fullName" placeholder="Введите полное имя" />
		</el-form-item>

		<el-form-item label="Тип пользователя">
			<el-radio-group v-model="userRole">
				<el-radio label="student">Ученик</el-radio>
				<el-radio label="teacher">Учитель</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item label="Пароль">
			<el-input v-model="password" type="password" placeholder="Введите пароль" />
		</el-form-item>

		<el-form-item label="Повторите пароль">
			<el-input v-model="confirmPassword" type="password" placeholder="Повторите пароль" />
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="handleRegistration" style="width:100%">Зарегистрироваться</el-button>
		</el-form-item>
		</el-form>
	</div>
</template>
