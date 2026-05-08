<script setup>
import { ref } from 'vue';
import { balance } from '../composables/useUsers.js';

const slots = ref(['❓', '❓', '❓']);
const isSpinning = ref(false);

function spin() {
  // Проверка баланса перед запуском
  if (balance.value < 50) {
    alert('Недостаточно средств');
    return;
  }

  isSpinning.value = true;

  setTimeout(() => {
    const symbols = ['🍒', '🍋', '💎', '7️⃣'];
    
    slots.value = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    isSpinning.value = false;
  }, 800);
}
</script>

<template>
  <div class="slots-page">
    <h1>Игровые Слоты</h1>
    <div class="machine-container">
      <div class="slots-display">
        <div class="slot-box" v-for="(symbol, index) in slots" :key="index">
          {{ symbol }}
        </div>
      </div>
      <div class="controls-section">
        <button @click="spin" :disabled="isSpinning" class="spin-btn">
          {{ isSpinning ? 'Вращение...' : 'ИСПЫТАТЬ УДАЧУ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slots-page { display: flex; flex-direction: column; align-items: center; padding: 40px; color: white; }
.machine-container { background: #1a1a1a; padding: 30px; border-radius: 20px; border: 2px solid #333; }
.slots-display { display: flex; gap: 15px; margin-bottom: 25px; }
.slot-box { background: #222; width: 100px; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 3rem; border-radius: 10px; }
.spin-btn { background: #4caf50; color: white; padding: 15px 40px; border: none; border-radius: 10px; cursor: pointer; width: 100%; font-weight: bold; }
.spin-btn:disabled { background: #333; cursor: not-allowed; }
</style>