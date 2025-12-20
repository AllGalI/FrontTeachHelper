<script setup>
  import { ref } from 'vue';
  import { useRouter} from 'vue-router'

  const router = useRouter()
  const firstPay = 99

</script>

<template>
  <div class="homepage column">
    <div class="header-local">
      <img class="header-local__logo" src="@/assets/logo.svg" alt="logo">
    </div>

    <section class="hero-section">
      <div class="hero-section__badge">Первый месяц за {{ firstPay }} ₽</div>
      <h1 class="hero-section__title">Платформа для помощи учителям</h1>
      <p class="hero-section__subtitle">AI-помощник для мгновенной проверки заданий и экономии вашего времени</p>
      <button class="hero-section__button" @click="router.push('/signup')">
        Зарегистрироваться
      </button>
    </section>

    <section class="content-block">
      <h2 class="content-block__title">Проверяйте работы с комфортом</h2>
      
      <div class="feature-card">
        <h3 class="feature-card__title">Забудьте про мессенджеры</h3>
        <p class="feature-card__text">Больше не нужно собирать сотни фото в WhatsApp. Все работы в одном структурированном окне.</p>
        <div class="video-placeholder"><span>▶ Фото-демонстрация</span></div>
      </div>

      <div class="feature-card">
        <h3 class="feature-card__title">Умная проверка ИИ</h3>
        <p class="feature-card__text">ИИ сам найдёт ошибки, выделит их и предложит комментарий. Вам остаётся только утвердить результат.</p>
        <div class="video-placeholder"><span>▶ Как работает AI</span></div>
      </div>

      <div class="feature-card">
        <h3 class="feature-card__title">Проверяйте сочинения по готовым критериям либо отдайте работу на проверку ИИ</h3>
        <p class="feature-card__text">Вы выбираете тип работы, а TeachHelper подставляет официальные критерии. Остаётся только выставить баллы и добавить комментарии - результат считается автоматически и прозрачен для ученика и родителя.</p>
        <div class="video-placeholder"><span>▶ Как работает AI</span></div>
      </div>
    </section>

    <section class="content-block content-block--alt">
      <h2 class="content-block__title">Всё под рукой</h2>
      <div class="image-mockup">
        <p>Интерфейс списка работ</p>
      </div>

      <div class="grid-two-col">
        <div class="mini-card">
          <h4>Ученики</h4>
          <p>Группируйте детей по классам и уровням</p>
        </div>
        <div class="mini-card">
          <h4>Статистика</h4>
          <p>Автоматические отчеты по успеваемости</p>
        </div>
      </div>
    </section>

    <section class="pricing-banner">
      <h2 class="pricing-banner__title">Один сервис вместо десяти</h2>
      <div class="service-tags">
        <span>GDocs</span> <span>GDrive</span> <span>Forms</span> <span>Word</span> <span>Excel</span>  <span>ChatGPT</span> <span>Telegram</span> <span>Яндекс Диск</span> <span>Paint</span> <span>WhatsApp</span>
      </div>
      <p class="pricing-banner__price">Всего за 899 руб/месяц</p>
      <button class="hero-section__button" @click="router.push('/signup')">Начать сейчас</button>
    </section>
  </div>
</template>

<style lang="scss">


  .homepage {
    height: 100%;
    width: 100%;
    display: flex;
  	flex-direction: column;
    margin: auto;
    margin-bottom: 70px;
    padding: var(--spacing-m);
    padding-top: var(--app-padding-top);

  }


  .header-local {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--app-padding-top);

    &__logo {
      position: absolute;
      top: 5px;
      right: 50%;
      height: 50px;
      width: 50px;

      transform: translateX(50%);
    }
  }

  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    max-width: 400px;
    margin: 20px auto;
    padding: 48px 24px;
    
    background-color: var(--color-primary-bg);
    border-radius: 32px;
    font-family: 'Inter', -apple-system, sans-serif;

    &__badge {
      display: inline-block;
      padding: 8px 16px;
      margin-bottom: 20px;
      
      background-color: var(--color-badge-bg);
      color: var(--color-accent-blue);
      
      font-size: 14px;
      font-weight: 700;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    &__title {
      margin: 0 0 16px 0;
      
      color: var(--color-accent-blue);
      font-size: 32px;
      font-weight: 800;
      line-height: 1.1;
    }

    &__subtitle {
      margin: 0 0 32px 0;
      
      color: var(--color-text-muted);
      font-size: 18px;
      line-height: 1.4;
    }

    &__button {
      width: 100%;
      padding: 18px;
      
      background-color: var(--color-accent-orange);
      color: #ffffff;
      
      border: none;
      border-radius: 16px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      
      /* Плавность для UX */
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 8px 20px var(--color-button-shadow);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px var(--color-button-shadow);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .content-block {
    padding: 40px 20px;
    
    &__title {
      color: var(--color-accent-blue);
      font-size: 24px;
      margin-bottom: 24px;
      text-align: center;
    }
  }

  .feature-card {
    background: var(--color-white);
    padding: 24px;
    border-radius: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(26, 35, 126, 0.05);

    &__title {
      color: var(--color-accent-blue);
      font-size: 18px;
      margin-bottom: 10px;
    }

    &__text {
      color: var(--color-text-muted);
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 15px;
    }
  }

  .video-placeholder {
    background: #f0f4f8;
    height: 160px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent-blue);
    font-weight: 600;
    border: 1px dashed var(--color-badge-bg);
  }

  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 20px 0;
    
    span {
      background: var(--color-badge-bg);
      // color: var(--color-accent-blue);
      color:white;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .pricing-banner {
    background: var(--color-accent-blue);
    color: white;
    margin: 20px;
    padding: 40px 24px;
    border-radius: 24px;
    text-align: center;

    &__title { font-size: 22px; margin-bottom: 10px; }
    &__price { font-size: 28px; font-weight: 800; margin: 20px 0; }
  }

  .grid-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .mini-card {
    background: white;
    padding: 15px;
    border-radius: 15px;
    h4 { margin: 0 0 5px 0; color: var(--color-accent-blue); }
    p { font-size: 12px; color: var(--color-text-muted); margin: 0; }
  }
   



  .btn {
    border: none;
    padding: 5px 10px;
    height: 50px;

    font-size: 15px;
    font-weight: bold;
    color: white;
  }

  .btn--rounded {
    border-radius: 5px;
    background-color: var(--secondary);
  }
</style>


<!-- 
<script setup>
  import { ref } from 'vue';
  import { useRouter} from 'vue-router'

  const router = useRouter()
  const firstPay = 99

</script>

<template>
  <div class="column">
    <header class="header">
      <img class="logo-home" src="@/assets/logo.svg" alt="Teach Helper Logo">
    </header>


  </div>
</template>
<style lang="scss">




  .column {
    background-color: #f8fbff; /* Очень светлый фон для всей страницы */
    min-height: 100vh;
  }

  .header {
    padding: 20px;
    display: flex;
    justify-content: center;
    .logo-home { height: 40px; }
  }


</style> -->
