<script setup>
import HomePageButton from "@/components/HomePageButton.vue"
</script>

<template>
	<div id="app">
		<div class='container'>
			<header class="header row">
					<HomePageButton />
					<nav class="row">
						<RouterLink to="/about" class="header-nav-link">About</RouterLink>
						<RouterLink to="/features" class="header-nav-link">Features</RouterLink>
						<RouterLink to="/pricing" class="header-nav-link">Pricing</RouterLink>
						<RouterLink to="/signin" class="sign-btn">Sign In</RouterLink>
						<RouterLink to="/join" class="sign-btn">Sign Up</RouterLink>
					</nav>
			</header>
		</div>
		<!-- <router-view /> -->
	</div>
</template>

<style scoped>

.row{
	display: flex;
	flex-direction:	row;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
}

.header {
	width: 100%;
}

.header-nav-link {
  color: black; 
  text-decoration: none; /* Важно: убираем подчеркивание */
	font-size: 19px;
	font-weight: 500;

	transition: color 0.3s;
}

.header-nav-link:hover {
	color: var(--color-primary);
	transform: translateY(1px)

}

.sign-btn {
	background-color: var(--color-primary);
	color: white;
	text-decoration: none;
	font-size: 16px;
	padding: 10px 20px;
	border: none;
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 0.4s;
}

.sign-btn:hover {
  background-color:var(--color-primary-dark); /* Более темный синий при наведении */
}

</style>