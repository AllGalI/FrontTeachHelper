<template>
	<RouterLink to="/" class="logo">
		<img  class="logo_img" src="@/assets/logo.png" alt="kekekke">
		<span class="first-word">Teach</span>
		<span class="second-word">Helper</span>
	</RouterLink>
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

.logo:hover{
	background-color: rgb(189, 187, 197);
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
	color: #4a5058ff;
	font-size: 20px;
	font-weight: bold
}

</style>