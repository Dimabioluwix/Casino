<script setup>
import { ref } from 'vue'
import { balance, changeBalance } from '../composables/useUsers.js'

const symbols = ['🥛', '🧀', '🧈', '🍦', '🥤', '🍶']
const reels = ref(['🥛', '🧀', '🧈'])
const spinning = ref(false)
const resultMessage = ref('')
const lastResult = ref('')

function getRandomSymbol() {
  const index = Math.floor(Math.random() * symbols.length)
  return symbols[index]
}

function spin() {
  const bet = 50

  if (balance.value < bet) {
    resultMessage.value = 'Недостаточно средств!'
    lastResult.value = 'lose'
    return
  }

  if (spinning.value) return

  spinning.value = true
  changeBalance(-bet)
  resultMessage.value = ''

  let spins = 0
  const interval = setInterval(function () {
    reels.value = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
    spins++

    if (spins >= 15) {
      clearInterval(interval)
      spinning.value = false
      checkWin()
    }
  }, 80)
}

function checkWin() {
  if (reels.value[0] === reels.value[1] && reels.value[1] === reels.value[2]) {
    changeBalance(500)
    resultMessage.value = 'ДЖЕКПОТ! +500 ₽!'
    lastResult.value = 'win'
  } else if (reels.value[0] === reels.value[1] || reels.value[1] === reels.value[2]) {
    changeBalance(100)
    resultMessage.value = 'Совпадение! +100 ₽'
    lastResult.value = 'win'
  } else {
    resultMessage.value = 'Не повезло, попробуй ещё!'
    lastResult.value = 'lose'
  }
}
</script>

<template>
  <div class="slots-page">
    <div class="slots-card">
      <h2 class="slots-title">Молочные Слоты</h2>

      <div class="reels" :class="{ spinning: spinning }">
        <div class="reel" v-for="(symbol, index) in reels" :key="index">
          {{ symbol }}
        </div>
      </div>

      <button class="spin-btn" :disabled="spinning" @click="spin">
        {{ spinning ? 'Крутится...' : 'Крутить (50 ₽)' }}
      </button>

      <div v-if="resultMessage" class="result" :class="lastResult">
        {{ resultMessage }}
      </div>

      <div class="balance-display">
        Баланс: <strong>{{ balance }} ₽</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slots-page {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
}

.slots-card {
  background: #1a1a2e;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.slots-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 2rem;
}

.reels {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.reel {
  width: 90px;
  height: 90px;
  background: #12121f;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border: 2px solid rgba(255, 215, 0, 0.15);
  transition: border-color 0.3s;
}

.spinning .reel {
  border-color: rgba(255, 215, 0, 0.5);
  animation: pulse 0.15s infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

.spin-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  transition: transform 0.15s, opacity 0.2s;
  margin-bottom: 1.5rem;
}

.spin-btn:hover:not(:disabled) {
  transform: scale(1.02);
}

.spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result {
  padding: 0.75rem;
  border-radius: 10px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.result.win {
  background: rgba(0, 230, 118, 0.12);
  color: #00e676;
}

.result.lose {
  background: rgba(255, 68, 68, 0.1);
  color: #ff6b6b;
}

.balance-display {
  color: #888;
  font-size: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.balance-display strong {
  color: #00e676;
}
</style>
