<script setup>
import { computed, ref } from 'vue';
import { balance } from '../composables/useUsers.js';

const a = ref(Math.random() * 100); // Текущее число
const b = ref(0); // Счетчик игр
const resultMessage = ref('Угадай: следующее число будет больше или меньше?');

// округляет число
const okrug = computed(function() {
    return Math.round(a.value);
});

function play(guess) {
    const bet = 100; // Сумма ставки

    // ПРОВЕРКА БАЛАНСА
    if (balance.value <= 0) {
        resultMessage.value = 'ПОПОЛНИТЕ СЧЁТ! У вас дерьмовый счёт баланса.';
        return; // Останавка
    }

    const nextNumber = Math.random() * 100;
    const isHigher = nextNumber > a.value;

    if ((guess === 'more' && isHigher) || (guess === 'less' && !isHigher)) {
        balance.value += bet; // Прибавляем к глобальному балансу
        resultMessage.value = 'Победа! +100₽. Выпало ' + Math.round(nextNumber);
    } else {
        balance.value -= bet; // Вычитаем из глобального баланса
        resultMessage.value = 'Проигрыш! -100₽. Выпало ' + Math.round(nextNumber);
    }

    // Обновляем состояние игры
    a.value = nextNumber;
    b.value++;
}
</script>

<template>
    <div class="game-container">
        <div>Мини-казино</div>
        
        <div class="display">
            Число: <strong>{{ okrug }}</strong>
        </div>

        <!-- Кнопки управления -->
        <div class="actions">
            <button @click="function() { play('more') }">Будет БОЛЬШЕ (100₽)</button>
            <button @click="function() { play('less') }">Будет МЕНЬШЕ (100₽)</button>
        </div>

        <div class="info">
            <p :class="{ 'error-text': balance <= 0 }">
                {{ resultMessage }}
            </p>
            <p>Текущий кошелёк: {{ balance }}₽</p>
            <p>Всего игр: {{ b }}</p>
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
}
.display {
    font-size: 3rem;
    margin: 20px 0;
    color: #4caf50;
}
.error-text {
    color: #ff4444;
    font-weight: bold;
    font-size: 1.2rem;
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
