<script setup>
  import { onUnmounted, ref, useTemplateRef } from 'vue';

  const isOpen = ref(false);

  const menu = useTemplateRef('menuRef');
  const menuItems = ref([
    {
      'text': "About",
      "route": "/about"
    },
    {
      'text': "Billings",
      "route": "/billings"
    },
    {
      'text': "Login",
      "route": "/login"
    }
  ])

  function toggleMenu() {
    isOpen.value = !isOpen.value;
  }

  // function 

  function closeOnOutsideClick(event) {
    if (
      isOpen.value
      && !menu.value.contains(event.target)
    ) {
      isOpen.value = false;
    }
  }

  document.addEventListener('click', closeOnOutsideClick);

  onUnmounted(() => {
    document.removeEventListener('click', closeOnOutsideClick);
  })

</script>

<template>
  <nav
  class="menu"
  :class="{'menu--open': isOpen}"
  >
    <ul
      class="menu__list"
      ref="menuRef"
    >
      <li
        class="menu__item"
        v-for="item in menuItems"> {{ item.text }}
      </li>
    </ul>
  </nav>
  <footer class="nav nav__bottom">
    <div class="nav__bar" >
      <div class="nav__logo">
        <img src="@/assets/logo.svg" alt="logo" class="logo">
        <div class="logo__text">Teach Helper</div>
      </div>
      <button 
        @click.stop="toggleMenu"
        class="hamburger__button"
        ref="menuButton"
      >
        <div 
          class="hamburger__container"
          :class="{'hamburger__container--open': isOpen}"
        >
          <div class="hamburger__item-top"></div>
          <div class="hamburger__item-middle"></div>
          <div class="hamburger__item-bottom"></div>
        </div>
      </button>        
    </div>
  </footer>
</template>