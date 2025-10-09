<template>
	<header class="header row">
		<RouterLink to="/" class="logo">
			<img  class="logo_img" src="@/assets/logo.png" alt="kekekke">
			<span class="first-word">Teach</span>
			<span class="second-word">Helper</span>
		</RouterLink>
		<div class="row">
			<RouterLink to="/about" class="header-nav-link">About</RouterLink>
			<RouterLink to="/features" class="header-nav-link">Features</RouterLink>
			<RouterLink to="/pricing" class="header-nav-link">Pricing</RouterLink>
		</div>
	</header>
</template>

<style scoped>
.logo {
	display: flex;
	gap: 5px;
	align-items: center;
	margin: 6px;
	padding: 5px;
	text-decoration: none;
	border-radius: 5px;

	transition: background-color 0.4s;
}

.logo_img{
	height: 30px;
	width: 30px;
}

.first-word{
	color: #1a73e8;
	font-size: 20px;
	font-weight: bold
}

.second-word{
	color: var(--color-gray-cool);
	font-size: 20px;
	font-weight: bold
}


.header-nav-link {
  color: black; 
  text-decoration: none; /* Важно: убираем подчеркивание */
	font-size: 19px;
	font-weight: 500;
	margin-left: 10px;

	transition: color 0.3s;
}

.row .header-nav-link:first-child {
  margin-left: 0;
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

</style>