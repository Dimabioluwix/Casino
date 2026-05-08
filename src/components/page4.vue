<script setup>
import { ref } from 'vue';
import { balance } from '../composables/useUsers.js';

const s = ref(['7️⃣', '7️⃣', '7️⃣']);
const b = ref(0);
const L = ref(false);
const msg = ref('Сыграем?');

function play() {
    const bet = 50;

    if (balance.value < bet) {
        msg.value = 'У вас дерьмовый счёт баланса!';
        return;
    }

    balance.value -= bet;
    L.value = true;

    setTimeout(function() {
        const icons = ['🍒', '🍋', '💎', '7️⃣'];
        s.value = [
            icons[Math.floor(Math.random() * icons.length)],
            icons[Math.floor(Math.random() * icons.length)],
            icons[Math.floor(Math.random() * icons.length)]
        ];

        // Проверка победы (три в ряд)
        if (s.value[0] === s.value[1] && s.value[1] === s.value[2]) {
            balance.value += 250;
            msg.value = 'ПОБЕДА! +250₽. Выпало три в ряд!';
        } else {
            msg.value = 'Проигрыш! Попробуй еще раз.';
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
            <strong>{{ s[0] }} {{ s[1] }} {{ s[2] }}</strong>
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
.game-container { padding: 25px; background: #1a1a1a; color: white; border-radius: 12px; text-align: center; border: 1px solid #333; }
.display { font-size: 3rem; margin: 20px 0; color: #4caf50; letter-spacing: 10px; }
.error-text { color: #ff4444; font-weight: bold; background: rgba(255, 0, 0, 0.1); padding: 5px; }
.actions { margin-bottom: 20px; }
button { padding: 12px 24px; cursor: pointer; background: #333; color: white; border: 1px solid #555; font-weight: bold; }
button:hover { background: #444; }
.info { border-top: 1px solid #333; padding-top: 15px; }
</style>