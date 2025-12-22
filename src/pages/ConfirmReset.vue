<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRouter, useRoute, RouterLink} from 'vue-router'


  const router = useRouter()
  const route = useRoute()
  const code = ref('')
  const loading = ref(false)
  const message = ref('')
  const codeInputs = ref(null)
  const baseURL = import.meta.env.VITE_API_BASE_URL
  const expiration = ref(60)
  let timer = null

  const startTimer = () => {
    if (timer) clearInterval(timer)

    expiration.value = 60

    timer = setInterval(() => {
      if (expiration.value > 0) {
        expiration.value--
      } else {
        clearInterval(timer)
      }
    }, 1000);
  }

  onMounted(() => {
    startTimer()
    const inputs = codeInputs.value.querySelectorAll('input')
    
    // Обработчик ввода
    inputs.forEach((input, index) => {
      input.addEventListener('input', async function() {
        message.value = ''

        // Переходим к следующему полю, если введено число
        if (this.value){
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
          else if (
            index == inputs.length - 1
            && expiration.value > 0
          ) {
            code.value = getCode()
            startTimer()
            try {
              const response = await fetch(`${baseURL}/auth/confirm_reset`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                  "email": route.query.email,
                  "code": code.value
                })
              });

              const data = await response.json();

              if (response.ok) {
                message.value = data.message || 'Код подтверждён!';
                setTimeout(() => {
                  router.push('/reset_password?token=' + data.token);
                }, 1000);
              } else {
                message.value = data.detail || 'Ошибка подтверждения кода';
              }

            } catch (err) {
              message.value = 'Не удалось соединиться с сервером';
              console.error(err);

            } finally {
              loading.value = false
            }
          }
        }
      });
  
      // Обработка Backspace
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
          inputs[index - 1].focus();
        }
      });

      if (index == 3) {

      }
    });
  
    // Получить полный код
    function getCode() {
      return Array.from(inputs)
        .map(input => input.value)
        .join('');
    }

  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  function onPaste(e) {
    const pastedData = (e.clipboardData || window.clipboardData).getData('text').slice(0, 4)
    const inputs = codeInputs.value.querySelectorAll('input')
    pastedData.split('').forEach((char, index) => {
      if (inputs[index]) {
        inputs[index].value = char
      }
    })

    const lastIndex = Math.min(pastedData.length, inputs.length - 1)
    inputs[lastIndex]?.focus()
  }

  async function sendCode() {
    console.log('sended')
    loading.value = true
    message.value = ''

    try {
      const response = await fetch(baseURL + "/auth/forgot_password", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": route.query.email
        })
      })

      const data = await response.json()

      if (response.status == 200) {
        startTimer()
      }
      else {
        message.value = data.detail
      }
    } catch (error) {
        message.value = 'Не удалось подключиться к серверу, проверьте соединение или попробуйте позже'
    } finally {
        loading.value = false
    }
  }
</script>

<template>
  <div class="page">
    <div class="page__card">
      <h1 class="page__title">Введите код, который мы отправили вам на почту</h1>
      <p class="warning">Если вы сообщите код кому-нибудь, ваш аккаунт могут украсть, не передавайте код никому</p>
      <form class="page__form" action="">
        <div @paste.prevent="onPaste" class="code-input" id="codeInput" ref="codeInputs">
          <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]">
          <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]">
          <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]">
          <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]">
        </div>
      </form>
      <p v-if="expiration > 0 && expiration < 60">Отправить повторно через: {{ expiration }}</p>
      <button @click="sendCode" class="btn" :disabled="expiration > 0 || loading">Отправить код повторно</button>
      <p class="error_text">{{ message }}</p>
    </div>
  </div>
</template> 


<style lang="scss">
  .btn {
    &:disabled {
      background-color: gray;
      box-shadow: none;
    }
  }

  .code-input {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 20px 0;
  }

  .code-input input {
    width: 40px;
    height: 48px;
    text-align: center;
    font-size: 20px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
  }

  .code-input input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .warning {
    font-size: 14px;
    text-align: center;
  }
</style>
