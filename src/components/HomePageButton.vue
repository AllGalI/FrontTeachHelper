<template>
	<div class="logo">
		<img 
			class="logo_img"
			src="/src/assets/logo.png"
			alt="Logo"></img>
			<span class="first-word">Teach</span>
			<span class="second-word">Helper</span>
	</div>
</template>

<style scoped>
.logo{
	display: flex;
	gap: 5px;
	align-items: center;
}

.logo_img{
	height: 30px;
	width: 30px;
}
.first-word{
	color: #1a73e8;
	font-weight: bold
}
.second-word{
	color: #4a5058ff;
	font-weight: bold
}

</style>