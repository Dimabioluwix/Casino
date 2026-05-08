<script setup>
/**
 * Компонент игровых слотов
 * Использует глобальный баланс из composables/useUsers.js
 */
import { balance } from '../composables/useUsers.js';
import { ref } from 'vue';

// Состояние барабанов
const slots = ref(['❓', '❓', '❓']);
const isSpinning = ref(false);

/**
 * Логика вращения барабанов
 */
function spin() {
  if (balance.value < 50) {
    alert('Недостаточно средств для ставки!');
    return;
  }
  
  balance.value -= 50; // Списание ставки
  isSpinning.value = true;
  
  // Имитация задержки вращения
  setTimeout(() => {
    const symbols = ['🍒', '🍋', '🔔', '💎'];
    slots.value = slots.value.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    isSpinning.value = false;
    
    // Простая проверка на выигрыш (три одинаковых)
    if (slots.value[0] === slots.value[1] && slots.value[1] === slots.value[2]) {
      balance.value += 500;
      alert('ПОБЕДА! +500₽');
    }
  }, 1000);
}
</script>

<template>
  <div class="slots-container">
    <h1>🎰 Игровые Слоты</h1>
    <div class="machine">
      <div class="slot" :class="{ 'spinning': isSpinning }" v-for="(symbol, index) in slots" :key="index">
        {{ symbol }}
      </div>
    </div>
    <div class="controls">
      <button @click="spin" :disabled="isSpinning" class="spin-button">
        {{ isSpinning ? 'Вращение...' : 'Крутить (50₽)' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.slots-container { text-align: center; padding: 60px; color: white; background: #121212; min-height: 50vh; }
.machine { display: flex; justify-content: center; gap: 15px; margin: 30px 0; }
.slot { 
  background: #1a1a1a; padding: 30px; border-radius: 12px; border: 2px solid #333; 
  width: 100px; font-size: 3.5rem; transition: transform 0.1s;
}
.spinning { animation: shake 0.1s infinite; }
@keyframes shake { 0% { transform: translateY(-2px); } 100% { transform: translateY(2px); } }
.spin-button { 
  background: #4caf50; color: white; padding: 15px 40px; border: none; 
  border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1.1rem;
}
.spin-button:disabled { background: #333; cursor: not-allowed; }
</style>