<script setup>
</script>

<template>
	<div id="app">
		<header>
			<nav>
			<router-link to="/login">Вход</router-link>
			<router-link to="/registration">Регистрация</router-link>
			</nav>
		</header>
		<router-view />
	</div>
</template>

<style scoped>
nav {
	display: flex;
	gap: 1rem;
}
</style>