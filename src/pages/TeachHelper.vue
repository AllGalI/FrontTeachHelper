<script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  // localStorage.setItem('authToken', 'lslsl')
  const token = localStorage.getItem('authToken')
  // localStorage.clear()
  console.log(token)
  if (token) {
    console.log(true)
  } else {
    console.log(false)
  }

</script>

<template>
  <!-- <div  class="teach-helper-app"> -->
  <div v-if="!token" class="teach-helper-app">
    <div class="header">
      <div class="header-logo">
        <svg class="header-logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.172l-4.172-4.172-1.414 1.414L9 19 21 7l-1.414-1.414z"/>
        </svg>
        <span class="header-logo-text">Teach Helper</span>
      </div>
      <nav class="header-nav">
        <a href="#" class="header-nav-link">About</a>
        <a href="#" class="header-nav-link">Features</a>
        <a href="#" class="header-nav-link">Pricing</a>
        <a href="#" class="header-nav-link">Contact</a>
      </nav>
      <button @click="router.push('/signup')" class="header-signup-btn">Sign Up</button>
    </div>

    <main class="main-content">
      <div class="main-text-block">
        <h1 class="main-title">Simplify Your Teaching with Teach Helper</h1>
        <p class="main-subtitle">The ultimate tool for teachers to check homework efficiently and accurately</p>
        <button class="main-cta-btn" @click="router.push('/signup')">Get Started</button>
      </div>
    </main>
  </div>
  <div v-else class="teach-helper-app">
    <div class="header">
      <div class="row">
        <div class="header-logo">
          <svg class="header-logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.172l-4.172-4.172-1.414 1.414L9 19 21 7l-1.414-1.414z"/>
          </svg>
          <span class="header-logo-text">Teach Helper</span>
        </div>
          <RouterLink>Works</RouterLink>
          <RouterLink>Tasks</RouterLink>
          <RouterLink>Students</RouterLink>
        </div>
        <button>Profile</button>
    </div>
  </div>
</template>


<style scoped>
.teach-helper-app {
  width: 100%;
  min-height: 100vh;
  background: "src/assets/1200px-Elegant_Background-18.jpg";
  color: #333;
}

/* --- Хедер --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #ddd;
  position: sticky; /* Опционально: для фиксации хедера */
  top: 0;
  z-index: 10;
}

.header-logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #1a73e8;
  margin-right: 30px;
}

.header-logo-icon {
  width: 30px;
  height: 30px;
  fill: #1a73e8;
  margin-right: 10px;
}

.header-nav {
  display: flex;
  gap: 30px;
}

.header-nav-link {
  color: #555;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.header-nav-link:hover {
  color: #1a73e8;
}

.header-signup-btn {
  background-color: #1a73e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header-signup-btn:hover {
  background-color: #145cb3;
}

/* --- Основной Контент --- */
.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main-text-block {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  padding: 40px 60px;
  border-radius: 10px;
  max-width: 800px;
}

.main-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 20px;
  color: #333;
}

.main-subtitle {
  font-size: 20px;
  margin: 0 0 40px;
  color: #666;
}

.main-cta-btn {
  background-color: #1a73e8;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;
}

.main-cta-btn:hover {
  background-color: #145cb3;
}

/* --- Медиа-запросы для адаптивности --- */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 20px;
  }

  .header-nav {
    margin-top: 15px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
  
  .header-logo {
    margin-bottom: 10px;
    margin-left: 20px;
  }

  .header-signup-btn {
    margin-top: 15px;
  }

  .main-title {
    font-size: 36px;
  }

  .main-text-block {
    padding: 20px;
    margin: 20px;
  }
}
</style>