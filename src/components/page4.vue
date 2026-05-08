<script setup>
import { ref } from 'vue';

// Состояние барабанов
const slots = ref(['❓', '❓', '❓']);
// Флаг процесса анимации
const isSpinning = ref(false);

function spin() {
  isSpinning.value = true;

  // Имитация вращения барабанов
  setTimeout(() => {
    const symbols = ['🍒', '🍋', '💎', '7️⃣'];
    
    // Генерация случайных символов
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
        <button 
          @click="spin" 
          :disabled="isSpinning"
          class="spin-btn"
        >
          {{ isSpinning ? 'Вращение...' : 'ИСПЫТАТЬ УДАЧУ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Контейнер страницы */
.slots-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: white;
}

/* Оформление автомата */
.machine-container {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 20px;
  border: 2px solid #333;
}

.slots-display {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.slot-box {
  background: #222;
  width: 100px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 10px;
}

/* Стили кнопки управления */
.spin-btn {
  background: #4caf50;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

.spin-btn:disabled {
  background: #333;
  cursor: not-allowed;
}
</style>