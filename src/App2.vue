<script setup>
  import Footer from './components/Footer.vue';

  const firstPay = 99
</script>

<template>
  <div class="app" id="app">
    <div class="banner">
      <h1>Платформа для помощи учителям</h1>
      <p>Помогаем сохранить ваше время</p>
      <button>
        Зарегистрироваться
      </button>
      <p>Первый месяц за {{ firstPay }} ₽</p>

      <p>AI помошник для проверки заданий</p>

    </div>
    <Footer />
  </div>
</template>

<style>

.banner {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;

  padding: 8px;
  
  background-image: url("src/assets/1200px-Elegant_Background-18.jpg");
  background-position: center;
  background-size: cover;
}


</style>
