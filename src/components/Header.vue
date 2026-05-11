<script setup>
import { useRouter } from 'vue-router'
import { balance, addMoney, removeMoney } from '../composables/useUsers.js'
import { currentUser, isAdmin, logout } from '../composables/useAuth.js'

const router = useRouter()

function handleLogout() {
  logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'Page1' }" class="logo">
      memoRRRRy
    </RouterLink>

    <nav class="nav">
      <RouterLink :to="{ name: 'Page1' }" class="nav-link">Главная</RouterLink>
      <RouterLink :to="{ name: 'Page2' }" class="nav-link">Больше/Меньше</RouterLink>
      <RouterLink :to="{ name: 'Page3' }" class="nav-link">Ставки</RouterLink>
      <RouterLink :to="{ name: 'Page4' }" class="nav-link">Слоты</RouterLink>
    </nav>

    <div class="user-area">
      <div class="wallet">
        <span class="balance">{{ balance }} &#8381;</span>
        <div class="wallet-controls">
          <button class="btn-wallet btn-add" @click="addMoney">+</button>
          <button class="btn-wallet btn-sub" @click="removeMoney">&minus;</button>
        </div>
      </div>

      <div class="user-info">
        <span class="user-name">{{ currentUser?.name }}</span>
        <span v-if="isAdmin" class="admin-badge">ADMIN</span>
      </div>

      <button class="logout-btn" @click="handleLogout">Выйти</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  background: linear-gradient(180deg, #12121f 0%, #0d0d1a 100%);
  border-bottom: 1px solid rgba(255, 215, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 1.2rem;
}

.nav-link {
  color: #888;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #ffd700;
  background: rgba(255, 215, 0, 0.08);
}

.user-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wallet {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.balance {
  color: #00e676;
  font-size: 1rem;
  font-weight: 700;
}

.wallet-controls {
  display: flex;
  gap: 3px;
}

.btn-wallet {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  transition: background 0.2s, transform 0.1s;
}

.btn-wallet:active {
  transform: scale(0.92);
}

.btn-add {
  background: #1b5e20;
}

.btn-add:hover {
  background: #2e7d32;
}

.btn-sub {
  background: #b71c1c;
}

.btn-sub:hover {
  background: #c62828;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.user-name {
  color: #ccc;
  font-size: 0.85rem;
  font-weight: 600;
}

.admin-badge {
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.06);
  color: #888;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.35rem 0.8rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: color 0.2s, border-color 0.2s;
}

.logout-btn:hover {
  color: #ef4444;
  border-color: #ef4444;
}
</style>
