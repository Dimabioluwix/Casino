<script setup>
import { ref } from 'vue'
import { balance, changeBalance } from '../composables/useUsers.js'

const betAmount = ref(50)
const chosenSide = ref('')
const diceResult = ref(null)
const resultMessage = ref('')
const lastResult = ref('')
const isRolling = ref(false)

const betOptions = [50, 100, 250, 500]

function selectBet(amount) {
  betAmount.value = amount
}

function chooseSide(side) {
  chosenSide.value = side
}

function rollDice() {
  if (!chosenSide.value) {
    resultMessage.value = 'Выберите чёт или нечёт!'
    lastResult.value = 'lose'
    return
  }

  if (balance.value < betAmount.value) {
    resultMessage.value = 'Недостаточно средств!'
    lastResult.value = 'lose'
    return
  }

  if (isRolling.value) return

  isRolling.value = true
  changeBalance(-betAmount.value)
  resultMessage.value = ''
  diceResult.value = null

  let rolls = 0
  const interval = setInterval(function () {
    diceResult.value = Math.floor(Math.random() * 6) + 1
    rolls++

    if (rolls >= 12) {
      clearInterval(interval)
      isRolling.value = false

      const isEven = diceResult.value % 2 === 0
      const guessedCorrectly = (chosenSide.value === 'even' && isEven) || (chosenSide.value === 'odd' && !isEven)

      if (guessedCorrectly) {
        const win = betAmount.value * 2
        changeBalance(win)
        resultMessage.value = 'Победа! +' + win + ' ₽!'
        lastResult.value = 'win'
      } else {
        resultMessage.value = 'Проигрыш! -' + betAmount.value + ' ₽'
        lastResult.value = 'lose'
      }
    }
  }, 80)
}

const diceEmojis = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
</script>

<template>
  <div class="bets-page">
    <div class="game-card">
      <h2 class="game-title">Кости: Чёт / Нечёт</h2>

      <div class="dice-display">
        <span class="dice" :class="{ rolling: isRolling }">
          {{ diceResult ? diceEmojis[diceResult] : '🎲' }}
        </span>
      </div>

      <div class="bet-selector">
        <p class="label">Ставка:</p>
        <div class="bet-options">
          <button
            v-for="opt in betOptions"
            :key="opt"
            class="bet-chip"
            :class="{ active: betAmount === opt }"
            @click="selectBet(opt)"
          >
            {{ opt }} ₽
          </button>
        </div>
      </div>

      <div class="side-selector">
        <p class="label">Ваш выбор:</p>
        <div class="side-options">
          <button
            class="side-btn"
            :class="{ active: chosenSide === 'even' }"
            @click="chooseSide('even')"
          >
            Чёт
          </button>
          <button
            class="side-btn"
            :class="{ active: chosenSide === 'odd' }"
            @click="chooseSide('odd')"
          >
            Нечёт
          </button>
        </div>
      </div>

      <button class="roll-btn" :disabled="isRolling" @click="rollDice">
        {{ isRolling ? 'Бросается...' : 'Бросить кости' }}
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
.bets-page {
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
  color: #ffd700;
  margin-bottom: 2rem;
}

.dice-display {
  margin-bottom: 2rem;
}

.dice {
  font-size: 5rem;
  display: inline-block;
  transition: transform 0.2s;
}

.dice.rolling {
  animation: shake 0.1s infinite;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
}

.label {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.bet-selector {
  margin-bottom: 1.5rem;
}

.bet-options {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.bet-chip {
  padding: 0.5rem 1rem;
  background: #12121f;
  border: 1px solid #2a2a3e;
  border-radius: 10px;
  color: #aaa;
  font-weight: 600;
  font-size: 0.85rem;
  transition: border-color 0.2s, color 0.2s;
}

.bet-chip.active {
  border-color: #ffd700;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.08);
}

.side-selector {
  margin-bottom: 1.5rem;
}

.side-options {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.side-btn {
  flex: 1;
  max-width: 140px;
  padding: 0.7rem;
  background: #12121f;
  border: 1px solid #2a2a3e;
  border-radius: 12px;
  color: #aaa;
  font-weight: 700;
  font-size: 0.95rem;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.side-btn.active {
  border-color: #00e676;
  color: #00e676;
  background: rgba(0, 230, 118, 0.08);
}

.roll-btn {
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

.roll-btn:hover:not(:disabled) {
  transform: scale(1.02);
}

.roll-btn:disabled {
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
