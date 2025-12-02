<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const e_field = ref('')
  const p_field = ref('')
  const userType = ref('')

  const message = ref('')
  const loading = ref(false)

  async function signUp(event) {
    if (!event.target.checkValidity()) return;

    message.value = ''
    loading.value = true
  
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL

      const response = await fetch(baseURL + "/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": e_field.value,
          "password": p_field.value,
          "role": userType.value
          })
      })
      
      const data = await response.json()

      if (response.ok) {
        setTimeout(() => {
            router.push("/validate_email")
          },1000
        )
      } else {
        if (response.status == 422) {
          message.value = data.detail[0].msg
        }
        else {
          message.value = data.detail || 'Что-то пошло не так'
        }
      }
    } catch (err) {
      message.value = 'Не удалось соединиться с сервером. Проверьте интернет.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
	<div class="reg_page">
		<div class="side sideLeft">
			<span class="sideLeftText">Create your account</span>
		</div>
		<div class="side sideRight">
			<div class="signinRow">
				<span>Already have an account?</span>
				<RouterLink to="/signin" class="signinButton">Sign in →</RouterLink> 
			</div>
			<form @submit.prevent="signUp" class="reg_card">
				<h2>Sign up for TeachHelper</h2>

				<label for="email">Email</label>
				<input v-model="e_field" type="email" class="reg_card_field" placeholder="Email" required>

				<label for="password">Password</label>
				<input v-model="p_field" type="password" class="reg_card_field" name="password" placeholder="Password" required>

				<label for="userType">Who are you?</label>
				<select 
            v-model="userType"
						id="user-type-select" 
						name="userType" 
						class="reg_card_field" 
						required
				>
						<option value="" disabled selected>Choose user type</option>
						
						<option value="teacher">Teacher</option>
						<option value="student">Student</option>
				</select>
        <!-- <button @submit="signUp" class="oauth2Button submitButton">Sign Up</button> -->
				<input 
          type="submit"
          class="oauth2Button submitButton"
          value="Sign Up"
          :disabled="loading"
          >

        <div v-if="message">{{ message }}</div>
			</form>
		</div>
	</div>
</template>


<style scoped>
input {
	margin-bottom: 16px;
}

select {
	margin-bottom: 4px;
}


.reg_page {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
}

.side {
	height: 100%;
	width: 50%;
	box-sizing: border-box;
}

.sideLeft {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80px;
	
  background-image: linear-gradient(to top, rgb(57, 125, 165, 0.8), rgb(59, 151, 121, 0.8), rgb(57, 125, 165, 0.8));
}

.sideLeftText {
	color: rgb(242, 243, 234);
	font-size: 2rem;
	font-weight: 500
}

.sideRight {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.signinRow {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	padding: 16px 48px;
	box-sizing: border-box;
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


.oauth2ButtonImage {
	width: 20px;
	height: 20px;
	border-radius: 5px;
}

.submitButton {
	color: white;
	/* background-color: var(--color-primary); */

	background: linear-gradient(to right, var(--color-primary), #06b6d4);
  background-size: 450%;
	transition: background-position 0.9s ease;
	
}

.submitButton:hover {
  background-position: right center; /* создаёт эффект движения градиента */
}

.signinButton {
	color: black
}



.reg_card {
	width: 500px;
	height: 800px;
	margin: 0 77px;
	padding: 0 24px 40px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
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
</style>