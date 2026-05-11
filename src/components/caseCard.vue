<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  caseItem: {
    type: Object,
    required: true
  }
})

const router = useRouter()

function goToCase() {
  router.push({ name: 'CaseOpen', params: { id: props.caseItem.id } })
}
</script>

<template>
  <div class="case-card" @click="goToCase">
    <div class="case-image-wrap">
      <div class="case-image" :class="'bg-' + caseItem.color">
        <span class="case-emoji">{{ caseItem.emoji }}</span>
      </div>
    </div>
    <div class="case-info">
      <h3 class="case-name">{{ caseItem.name }}</h3>
      <p class="case-price">{{ caseItem.price }} &#8381;</p>
      <button class="open-btn">Открыть кейс</button>
    </div>
  </div>
</template>

<style scoped>
.case-card {
  background: #1a1a2e;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.case-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 215, 0, 0.2);
}

.case-image-wrap {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.case-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  transition: transform 0.3s;
}

.case-card:hover .case-image {
  transform: scale(1.1) rotate(5deg);
}

.bg-purple {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
}

.bg-blue {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
}

.bg-red {
  background: linear-gradient(135deg, #dc2626, #ef4444);
}

.bg-gold {
  background: linear-gradient(135deg, #d97706, #f59e0b);
}

.bg-green {
  background: linear-gradient(135deg, #059669, #10b981);
}

.case-emoji {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.case-info {
  padding: 0 1.25rem 1.25rem;
  text-align: center;
}

.case-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.case-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #00e676;
  margin-bottom: 0.75rem;
}

.open-btn {
  width: 100%;
  padding: 0.6rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  transition: opacity 0.2s, transform 0.1s;
}

.open-btn:hover {
  opacity: 0.9;
}

.open-btn:active {
  transform: scale(0.97);
}
</style>
