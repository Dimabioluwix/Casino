<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ name: 'Page1' })
}
</script>

<template>
  <div class="not-found">
    <div class="not-found-card">
      <span class="emoji">&#128126;</span>
      <h1 class="title">404</h1>
      <p class="desc">Такой страницы не существует</p>
      <button class="home-btn" @click="goHome">На главную</button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.not-found-card {
  text-align: center;
}

.emoji {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.title {
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ffd700, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.desc {
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.home-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.2s;
}

.home-btn:hover {
  transform: scale(1.05);
}
</style>
