<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  caseItem: {
    type: Object,
    required: true
  }
});

const router = useRouter();

function goToCase() {
  router.push({ name: 'case-detail', params: { id: props.caseItem.id } });
}
</script>

<template>
  <div class="case-card" @click="goToCase">
    <img :src="caseItem.image" :alt="caseItem.name" class="case-image" />
    <div class="case-info">
      <h3>{{ caseItem.name }}</h3>
      <p class="price">{{ caseItem.price }} ₽</p>
      <button class="open-btn">Открыть кейс →</button>
    </div>
  </div>
</template>

<style scoped>
.case-card {
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  width: 280px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
}
.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.case-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.case-info {
  padding: 16px;
}
.price {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin: 8px 0;
}
.open-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
}
.open-btn:hover {
  background-color: #369f6e;
}
</style>