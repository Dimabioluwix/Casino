<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { balance, changeBalance } from '../composables/useUsers.js'

const route = useRoute()
const router = useRouter()

const allCases = [
  { id: 1, name: 'Молочный Стандарт', price: 150, emoji: '🥛', color: 'blue',
    prizes: [
      { name: 'Молоко 1л', value: 50, emoji: '🥛', chance: 40 },
      { name: 'Кефир', value: 100, emoji: '🥤', chance: 30 },
      { name: 'Йогурт', value: 200, emoji: '🍦', chance: 20 },
      { name: 'Сыр Гауда', value: 400, emoji: '🧀', chance: 10 }
    ]
  },
  { id: 2, name: 'Сырный Премиум', price: 350, emoji: '🧀', color: 'gold',
    prizes: [
      { name: 'Сыр Российский', value: 100, emoji: '🧀', chance: 35 },
      { name: 'Пармезан', value: 300, emoji: '🧀', chance: 30 },
      { name: 'Бри', value: 500, emoji: '🧀', chance: 25 },
      { name: 'Рокфор', value: 900, emoji: '🧀', chance: 10 }
    ]
  },
  { id: 3, name: 'Йогуртовый Люкс', price: 500, emoji: '🍦', color: 'purple',
    prizes: [
      { name: 'Йогурт простой', value: 150, emoji: '🍦', chance: 35 },
      { name: 'Греческий', value: 400, emoji: '🍦', chance: 30 },
      { name: 'Смузи', value: 700, emoji: '🥤', chance: 25 },
      { name: 'Желато', value: 1200, emoji: '🍨', chance: 10 }
    ]
  },
  { id: 4, name: 'Масляный VIP', price: 1000, emoji: '🧈', color: 'red',
    prizes: [
      { name: 'Масло сливочное', value: 300, emoji: '🧈', chance: 35 },
      { name: 'Масло топлёное', value: 800, emoji: '🧈', chance: 30 },
      { name: 'Сливки', value: 1500, emoji: '🥛', chance: 25 },
      { name: 'Золотое масло', value: 3000, emoji: '✨', chance: 10 }
    ]
  },
  { id: 5, name: 'Кефирный Элит', price: 250, emoji: '🥤', color: 'green',
    prizes: [
      { name: 'Кефир 1%', value: 80, emoji: '🥤', chance: 40 },
      { name: 'Ряженка', value: 200, emoji: '🥛', chance: 30 },
      { name: 'Айран', value: 350, emoji: '🥤', chance: 20 },
      { name: 'Тан', value: 600, emoji: '🥤', chance: 10 }
    ]
  },
  { id: 6, name: 'Сметанный Голд', price: 750, emoji: '🍶', color: 'gold',
    prizes: [
      { name: 'Сметана 15%', value: 200, emoji: '🍶', chance: 35 },
      { name: 'Сметана 25%', value: 500, emoji: '🍶', chance: 30 },
      { name: 'Крем-фреш', value: 900, emoji: '🍶', chance: 25 },
      { name: 'Маскарпоне', value: 1800, emoji: '🧀', chance: 10 }
    ]
  }
]

const caseId = computed(function () {
  return Number(route.params.id)
})

const currentCase = computed(function () {
  return allCases.find(function (c) { return c.id === caseId.value }) || null
})

const isOpening = ref(false)
const wonPrize = ref(null)
const errorMessage = ref('')

function pickPrize(prizes) {
  const roll = Math.random() * 100
  let cumulative = 0
  for (let i = 0; i < prizes.length; i++) {
    cumulative += prizes[i].chance
    if (roll <= cumulative) {
      return prizes[i]
    }
  }
  return prizes[prizes.length - 1]
}

function openCase() {
  if (!currentCase.value) return
  errorMessage.value = ''

  if (balance.value < currentCase.value.price) {
    errorMessage.value = 'Недостаточно средств! Пополните баланс.'
    return
  }

  isOpening.value = true
  wonPrize.value = null
  changeBalance(-currentCase.value.price)

  setTimeout(function () {
    const prize = pickPrize(currentCase.value.prizes)
    wonPrize.value = prize
    changeBalance(prize.value)
    isOpening.value = false
  }, 2000)
}

function openAgain() {
  wonPrize.value = null
  errorMessage.value = ''
  openCase()
}

function goBack() {
  router.push({ name: 'Page1' })
}
</script>

<template>
  <div class="case-open-page">
    <div v-if="!currentCase" class="not-found-card">
      <h2>Кейс не найден</h2>
      <button class="back-btn" @click="goBack">На главную</button>
    </div>

    <div v-else class="case-card-open">
      <button class="back-link" @click="goBack">&larr; Назад к кейсам</button>

      <div class="case-hero" :class="'bg-' + currentCase.color">
        <span class="hero-emoji" :class="{ spinning: isOpening }">{{ currentCase.emoji }}</span>
      </div>

      <h2 class="case-title">{{ currentCase.name }}</h2>
      <p class="case-cost">Стоимость: {{ currentCase.price }} &#8381;</p>

      <div class="prizes-list">
        <h3 class="prizes-title">Возможные призы:</h3>
        <div class="prize-row" v-for="prize in currentCase.prizes" :key="prize.name">
          <span class="prize-emoji">{{ prize.emoji }}</span>
          <span class="prize-name">{{ prize.name }}</span>
          <span class="prize-value">{{ prize.value }} &#8381;</span>
          <span class="prize-chance">{{ prize.chance }}%</span>
        </div>
      </div>

      <div v-if="errorMessage" class="error-banner">{{ errorMessage }}</div>

      <div v-if="wonPrize" class="win-banner">
        <span class="win-emoji">{{ wonPrize.emoji }}</span>
        <div class="win-text">
          <strong>Вы выиграли: {{ wonPrize.name }}!</strong>
          <span class="win-value">+{{ wonPrize.value }} &#8381;</span>
        </div>
      </div>

      <div class="action-buttons">
        <button
          v-if="!wonPrize"
          class="open-btn"
          :disabled="isOpening"
          @click="openCase"
        >
          {{ isOpening ? 'Открывается...' : 'Открыть кейс (' + currentCase.price + ' ₽)' }}
        </button>
        <button v-else class="open-btn" @click="openAgain">
          Открыть ещё раз ({{ currentCase.price }} &#8381;)
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-open-page {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}

.not-found-card {
  text-align: center;
  padding: 3rem;
}

.case-card-open {
  width: 100%;
  max-width: 520px;
  background: #1a1a2e;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.back-link {
  background: none;
  border: none;
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: block;
}

.back-link:hover {
  color: #ffd700;
}

.case-hero {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.hero-emoji {
  font-size: 4rem;
  display: block;
  transition: transform 0.3s;
}

.hero-emoji.spinning {
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.bg-blue { background: linear-gradient(135deg, #2563eb, #3b82f6); }
.bg-gold { background: linear-gradient(135deg, #d97706, #f59e0b); }
.bg-purple { background: linear-gradient(135deg, #7c3aed, #a855f7); }
.bg-red { background: linear-gradient(135deg, #dc2626, #ef4444); }
.bg-green { background: linear-gradient(135deg, #059669, #10b981); }

.case-title {
  text-align: center;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.case-cost {
  text-align: center;
  color: #00e676;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.prizes-list {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.prizes-title {
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
}

.prize-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.prize-row:last-child {
  border-bottom: none;
}

.prize-emoji {
  font-size: 1.2rem;
}

.prize-name {
  flex: 1;
  font-size: 0.9rem;
}

.prize-value {
  color: #00e676;
  font-weight: 600;
  font-size: 0.9rem;
}

.prize-chance {
  color: #666;
  font-size: 0.8rem;
  width: 40px;
  text-align: right;
}

.error-banner {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.75rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
}

.win-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 230, 118, 0.1);
  border: 1px solid rgba(0, 230, 118, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.win-emoji {
  font-size: 2.5rem;
}

.win-text {
  display: flex;
  flex-direction: column;
}

.win-text strong {
  color: #fff;
}

.win-value {
  color: #00e676;
  font-size: 1.2rem;
  font-weight: 700;
}

.action-buttons {
  text-align: center;
}

.open-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.15s, opacity 0.2s;
}

.open-btn:hover:not(:disabled) {
  transform: scale(1.02);
}

.open-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  margin-top: 1rem;
}
</style>
