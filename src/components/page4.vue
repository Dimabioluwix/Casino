<script setup>
import { balance } from '../composables/useUsers.js';
import { ref } from 'vue';

const slots = ref(['❓', '❓', '❓']);
</script>

<template>
  <div class="slots-container">
    <h1>Игровые Слоты</h1>
    <div class="machine">
      <div class="slot" v-for="s in slots">{{ s }}</div>
    </div>
  </div>
</template>

<style scoped>
.slots-container { text-align: center; padding: 50px; color: white; }
.machine { display: flex; justify-content: center; gap: 10px; margin: 20px 0; font-size: 3rem; }
.slot { background: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #333; }
</style>