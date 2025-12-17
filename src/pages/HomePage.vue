<script setup>
  import { ref } from 'vue';
  import { useRouter} from 'vue-router'

  const router = useRouter()
  const firstPay = 99

</script>

<template>
  <div class="column">
    <div class="header2">
      <img class="logo_home" src="@/assets/logo.svg" alt="logo">
    </div>

    <div class="banner">
      <h3>Платформа для помощи учителям</h3>
      <p>Помогаем сохранить ваше время</p>
      <button class="btn btn--rounded" @click="router.push('/signup')">
        Зарегистрироваться
      </button>
      <p>Первый месяц за {{ firstPay }} ₽</p>

      <p>AI помошник для проверки заданий</p>
    </div>
    <div class="banner banner--main">
      <h3>Платформа для помощи учителям</h3>
      <p>Помогаем сохранить ваше время</p>
      <button class="btn btn--rounded" @click="router.push('/signup')">
        Зарегистрироваться
      </button>
      <p>Первый месяц за {{ firstPay }} ₽</p>

      <p>AI помошник для проверки заданий</p>
    </div>
    <div class="banner">
      <h1>Проверяйте работы с удобвствами</h1>
      <div>
        <h2>Больше не нужно пересылать фото в мессенджерах</h2>
        <p>Проверяйте в одном месте</p>
        <div>
          Видео с тем как это делается
        </div>
      </div>
      <div>
        <h2>Проверяйте сочинения по готовым критериям либо отдайте работу на проверку ИИ</h2>
        <p>Вы выбираете тип работы, а TeachHelper подставляет официальные критерии. Остаётся только выставить баллы и добавить комментарии - результат считается автоматически и прозрачен для ученика и родителя.</p>
        <div>
          Видео с тем как это делается
        </div>
      </div>
      <div>
        <h2>Либо отдайте работу на проверку ИИ</h2>
        <p>Отправте работу на проверку, а ИИ сам найдёт ошибки выделит их и напишет комментарии к ошибкам</p>
        <div>
          Видео с тем как это делается
        </div>
      </div>
    </div>
    <div class="banner">
      <h1>Храните материалы для заданий в одном месте</h1>
      <div>
        Фото с примером(На нём скрин списка работ и детальной работы)
      </div>
      <div>
        <div>
          <h2>Ученики</h2>
          <p>Распределяйте их по группам</p>
          <div>Фото пример</div>
        </div>
        <div>
          <h2>Ученики</h2>
          <p>Распределяйте их по группам</p>
          <div>Фото пример</div>
        </div>
        <div>
          <h2>Статистика учеников</h2>
          <p>Данные с успеваемостью ваших учеников автоматически генерируются в таблицы</p>
          <p>Следите за прогрессом ваших детей</p>
          <div>Фото пример</div>
        </div>
      </div>
    </div>
    <div>
      <h1>Заменим много сервисов</h1>
      <p>на один за 899 руб/месяц</p>
      <div>GDocs GDrive Яндекс.Диск GForms Paint GClass Word Excel ChatGPT</div>
      <!-- <p>«Больше никаких pdf в гугл-диске, тестов в гугл-формах и закладок в браузере. Теперь всё хранится на одной платформе»</p> -->
    </div>
    <!-- <div>
      <h1>Выберете свою версию</h1>
      <div class="row">
        <div class="column">
          <h2>Репетитору/Учителю</h2>
          <ul>
            <li>— Безлимитное облачное хранилище</li>
            <li>— Создание групп и распределение учеников</li>
            <li>— Проверка работ по фото, тексту, аудио</li>
            <li>— Автоматический подсчет баллов по критериям-- Безлимитное кол-во учеников</li>
          </ul>
        </div>
        <div class="column"></div>
          <h2>Корпоративная версия</h2>
          <ul>
            <li>— Онлайн-школам, репетиторским центрам</li>
            <li>— Встраивается в любую обучающую платформу</li>
            <li>— Многократно ускоряет работу проверяющих</li>
            <li>— Добавляйте сотрудников и контролируйте их  </li>
            <li>— Вся методическая работа в одном месте</li>
            Бесплатно обучим ваших сотрудников
            Бессрочный демо-период
          </ul>
      </div>
    </div> -->
</div>
</template>

<style lang="scss">

  .banner {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px;

    padding: 8px;
    
    background-position: center;
    background-size: cover;

    
    &--main {
      min-height: 100vh;
      background: linear-gradient(
        var(--primary), var(--secondary)
      );
    }
  }



  .header2 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--app-padding-top);
    background-color: white;
  }
  .logo_home {
    position: absolute;
    top: 5px;
    right: 50%;
    height: 50px;
    width: 50px;

    transform: translateX(50%);
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
