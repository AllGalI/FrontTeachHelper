<script scoped>
import AppHeader from "@/components/AppHeader.vue"

</script>

<template>
	<div class="header_container">
		<AppHeader />
	</div>
	<div class='container'>
		<!-- <router-view /> -->
			<div class="agitation_block">
				<div class="roboto h1">Simplify Your Teaching with Teach Helper</div>
				<div class="roboto h2">The ultimate tool for teachers to check homework efficiently and accurately</div>
				<RouterLink to="/signup" class="start_button ">
					<span class="roboto h2">Start work</span>
				</RouterLink>
			</div>
	</div>
</template>

<style scoped>
.agitation_block {
	max-width: 1200px;
	width: 100%;
	height: 587px;
	border-radius: 20px;
	background-image: url("src/assets/1200px-Elegant_Background-18.jpg");

	display: flex;
	flex-direction: column;
	/* justify-content: space-between; */
	align-items: center;
	gap: 20px;

	padding: 40px 200px 30px;
	box-sizing: border-box;
	/* width: 640px;
	height: 761px; */
}

.roboto {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
	;
	text-align: center;
}
.h1 {
	font-size: 75px;
	font-weight: bold;
	
}

.h2 {
	font-size: 30px;
}

.start_button {
	width: 300px;
	height: 100px;
	color: white;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	text-decoration: none;
	
	border-radius: 20px;
	background: linear-gradient(to right, #2174e2, #06b6d4, #2174e2, #06b6d4);
	background-size: 600%;
	transition: background-position 0.9s ease;
}

.start_button:hover {
  background-position: right center; /* создаёт эффект движения градиента */
}
</style>