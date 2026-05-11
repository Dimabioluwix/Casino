<script setup>
import { computed, ref } from 'vue'
import { balance, changeBalance } from '../composables/useUsers.js'

const currentNumber = ref(Math.random() * 100)
const gamesPlayed = ref(0)
const resultMessage = ref('Угадай: следующее число будет больше или меньше?')
const lastResult = ref('')

const roundedNumber = computed(function () {
  return Math.round(currentNumber.value)
})

function play(guess) {
  const bet = 100

  if (balance.value < bet) {
    resultMessage.value = 'Недостаточно средств! Пополните баланс.'
    lastResult.value = 'lose'
    return
  }

  const nextNumber = Math.random() * 100
  const isHigher = nextNumber > currentNumber.value

  if ((guess === 'more' && isHigher) || (guess === 'less' && !isHigher)) {
    changeBalance(bet)
    resultMessage.value = 'Победа! +100 ₽. Выпало ' + Math.round(nextNumber)
    lastResult.value = 'win'
  } else {
    changeBalance(-bet)
    resultMessage.value = 'Проигрыш! -100 ₽. Выпало ' + Math.round(nextNumber)
    lastResult.value = 'lose'
  }

  currentNumber.value = nextNumber
  gamesPlayed.value++
}

function playMore() {
  play('more')
}

function playLess() {
  play('less')
}
</script>

<template>
  <div class="game-page">
    <div class="game-card">
      <h2 class="game-title">Больше / Меньше</h2>

      <div class="number-display">
        <span class="number">{{ roundedNumber }}</span>
      </div>

      <div class="actions">
        <button class="btn-game btn-more" @click="playMore">
          Больше (100 ₽)
        </button>
        <button class="btn-game btn-less" @click="playLess">
          Меньше (100 ₽)
        </button>
      </div>

      <div class="result" :class="lastResult">
        <p class="result-text">{{ resultMessage }}</p>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="stat-label">Баланс</span>
          <span class="stat-value" :class="{ low: balance <= 0 }">{{ balance }} ₽</span>
        </div>
        <div class="stat">
          <span class="stat-label">Игр сыграно</span>
          <span class="stat-value">{{ gamesPlayed }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-page {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
}

.game-card {
  background: #1a1a2e;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.game-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffd700;
}

.number-display {
  margin-bottom: 2rem;
}

.number {
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #00e676, #00c853);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-game {
  flex: 1;
  padding: 0.9rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  transition: transform 0.15s, opacity 0.2s;
}

.btn-game:hover {
  opacity: 0.9;
}

.btn-game:active {
  transform: scale(0.96);
}

.btn-more {
  background: linear-gradient(135deg, #1b5e20, #2e7d32);
}

.btn-less {
  background: linear-gradient(135deg, #b71c1c, #c62828);
}

.result {
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  transition: background 0.3s;
}

.result.win {
  background: rgba(0, 230, 118, 0.1);
}

.result.lose {
  background: rgba(255, 68, 68, 0.1);
}

.result-text {
  font-size: 1rem;
  font-weight: 600;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #00e676;
}

.stat-value.low {
  color: #ff4444;
}
</style>
