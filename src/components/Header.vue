<script setup>
import { balance, addMoney, removeMoney } from '../composables/useUsers.js';

</script>

<template>
  <header class="header">
    <div class="logo">memoRRRRy</div>

    <nav class="pages">
      <RouterLink :to="{ name: 'Page1' }">Главная</RouterLink>
      <RouterLink :to="{ name: 'Page2' }">Больше меньше</RouterLink>
      <RouterLink :to="{ name: 'Page3' }">Ставки</RouterLink>
      <RouterLink :to="{ name: 'Page4' }">Слоты</RouterLink>
      <RouterLink :to="{ name: 'Page5' }">Live Casino</RouterLink>
      <RouterLink :to="{ name: 'caseCard' }">Live Casino</RouterLink>
    </nav>

    <div class="user-block">
      <div class="balance">{{ balance }}₽</div>
      <div class="controls">
        <button @click="addMoney" class="btn-add">+</button>
        <button @click="removeMoney" class="btn-sub">−</button>
      </div>
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
  color: white;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.pages {
  display: flex;
  gap: 1.2rem;
}

.pages a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.9rem;
  transition: 0.3s;
}

.pages a:hover {
  color: #4caf50;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 15px;
}

.balance {
  color: #4caf50;
  font-size: 1.2rem;
  font-weight: bold;
}

button {
  background: #333;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

button:hover {
  background: #444;
}
</style>
