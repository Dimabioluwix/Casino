<script setup>
</script>

<template>
  <header class="header">
    <!-- Текст-Шапки -->
    <div class="logo">memoRRRRy</div>
    <!-- Страницы-сайта -->
    <nav class="pages">
      <RouterLink :to="{ name: 'Page1' }">1</RouterLink>
      <RouterLink :to="{ name: 'Page2' }">2</RouterLink>
      <RouterLink :to="{ name: 'Page3' }">3</RouterLink>
      <RouterLink :to="{ name: 'Page4' }">4</RouterLink>
      <RouterLink :to="{ name: 'Page5' }">5</RouterLink>
    </nav>

    <!-- Что-то ещё -->
    <div class="something">
      <!-- можно добавить кнопки, авторизацию и т.п. -->
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  background: #141414;
  border-bottom: 1px solid #333;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
}

.pages {
  display: flex;
  gap: 1.2rem;
}

.pages a {
  color: #ccc;
  text-decoration: none;
  font-size: 0.95rem;
}

.pages a:hover {
  color: #fff;
}
</style>