<script setup>
import { computed, ref } from 'vue';
import { balance } from '../composables/useUsers.js';

const s = ref(['7️⃣', '7️⃣', '7️⃣']); // Текущие слоты
const b = ref(0); // Счетчик игр
const L = ref(false); // Состояние кручения
const msg = ref('Сыграем?');

// округляет результат или собирает строку (как у Димы okrug)
const displaySlots = computed(function() {
    return s.value[0] + ' ' + s.value[1] + ' ' + s.value[2];
});

function play() {
    const bet = 50; // Сумма ставки

    // ПРОВЕРКА БАЛАНСА
    if (balance.value < bet) {
        msg.value = 'У вас дерьмовый счёт баланса!';
        return;
    }

    balance.value -= bet; // Вычитаем из глобального баланса
    L.value = true;

    setTimeout(function() {
        const icons = ['🍒', '🍋', '💎', '7️⃣'];
        
        s.value = [
            icons[Math.floor(Math.random() * icons.length)],
            icons[Math.floor(Math.random() * icons.length)],
            icons[Math.floor(Math.random() * icons.length)]
        ];

        // Проверка на выигрыш
        if (s.value[0] === s.value[1] && s.value[1] === s.value[2]) {
            balance.value += 250; 
            msg.value = 'Победа! +250₽. Выпало ' + displaySlots.value;
        } else {
            msg.value = 'Проигрыш! -50₽. Выпало ' + displaySlots.value;
        }

        L.value = false;
        b.value++;
    }, 800);
}
</script>

<template>
    <div class="game-container">
        <div>Мини-Слоты</div>
        
        <div class="display">
            <strong>{{ displaySlots }}</strong>
        </div>

        <div class="actions">
            <button @click="function() { play() }" :disabled="L">
                {{ L ? 'Ждем...' : 'КРУТИТЬ (50₽)' }}
            </button>
        </div>

        <div class="info">
            <p :class="{ 'error-text': balance <= 0 }">
                {{ msg }}
            </p>
            <p>Текущий кошелёк: {{ balance }}₽</p>
            <p>Всего прокрутов: {{ b }}</p>
        </div>
    </div>
</template>

<style scoped>
.game-container {
    padding: 25px;
    background: #1a1a1a;
    color: white;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #333;
}
.display {
    font-size: 3rem;
    margin: 20px 0;
    color: #4caf50;
}
.error-text {
    color: #ff4444;
    font-weight: bold;
    background: rgba(255, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
}
.actions {
    margin-bottom: 20px;
}
button {
    padding: 12px 24px;
    margin: 5px;
    cursor: pointer;
    background: #333;
    color: white;
    border: 1px solid #555;
    font-weight: bold;
}
button:hover {
    background: #444;
}
.info {
    border-top: 1px solid #333;
    padding-top: 15px;
}
</style>