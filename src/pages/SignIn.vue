<script setup>
</script>

<template>
	<div class="signinPage">
		<span class="formHeader">Sign in to TextHelper</span>
		<form action="" class="signInForm">
			<label class="placeholder" for="email">Email</label>
			<input type="email" name="email" class="reg_card_field">
			<label class="formRow placeholder" for="password">
				<span>Password</span>
				<RouterLink class="forgotLink" to="/password_reset">Forgot password?</RouterLink>
			</label>
			<input type="password" name="password" class="reg_card_field">
			<RouterLink class="placeholder oauth2Button sinInButton ">Sign in</RouterLink>
			<div class="authentication-divider">or</div>
			<button class="oauth2Button">
				<img class="oauth2ButtonImage" src="@/assets/gmail.jpg" alt="gmail">
				Continue with Google
			</button>
			<button class="oauth2Button">
				<img class="oauth2ButtonImage" src="@/assets/mail.jpg" alt="mail">
				Continue with Mail
			</button>
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