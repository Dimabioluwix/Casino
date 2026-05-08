<script setup>
import { ref } from 'vue';
import { balance } from '../composables/useUsers.js';

const s = ref(['❓', '❓', '❓']);
const b = ref(0); // Счетчик игр
const L = ref(false);
const msg = ref('Удачи!');

function play() {
    if (balance.value < 50) {
        msg.value = 'Недостаточно средств!';
        return;
    }

    // Списание суммы за ставку
    balance.value -= 50;
    L.value = true;

    setTimeout(function() {
        const icons = ['🍒', '🍋', '💎', '7️⃣'];
        s.value = [
            icons[Math.floor(Math.random() * icons.length)],
            icons[Math.floor(Math.random() * icons.length)],
            icons[Math.floor(Math.random() * icons.length)]
        ];

        L.value = false;
        b.value++; // Инкремент счетчика
        msg.value = 'Ставка принята. Крутим дальше?';
    }, 800);
}
</script>

<template>
    <div class="game-container">
        <div>Игровые Слоты</div>
        <div class="display">
            {{ s[0] }} | {{ s[1] }} | {{ s[2] }}
        </div>
        <div class="actions">
            <button @click="function() { play() }" :disabled="L">
                КРУТИТЬ (50₽)
            </button>
        </div>
        <div class="info">
            <p>{{ msg }}</p>
            <p>Кошелёк: {{ balance }}₽</p>
            <p>Всего игр: {{ b }}</p>
        </div>
    </div>
</template>

<style scoped>
.game-container { padding: 25px; background: #1a1a1a; color: white; border-radius: 12px; text-align: center; }
.display { font-size: 3rem; margin: 20px 0; color: #4caf50; }
button { padding: 12px 24px; cursor: pointer; background: #333; color: white; border: 1px solid #555; font-weight: bold; }
button:disabled { opacity: 0.5; }
.info { border-top: 1px solid #333; padding-top: 15px; }
</style>