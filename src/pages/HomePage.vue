<script setup>
import { ref } from 'vue'
import CaseCard from './components/CaseCard.vue'

const slides = [
  { id: 1, title: 'Бонус +200% к депозиту!', text: 'Начни играть прямо сейчас', theme: 'slide-purple' },
  { id: 2, title: 'Новые кейсы с молоком', text: 'Успей забрать свой дроп', theme: 'slide-blue' },
  { id: 3, title: 'Турнир на 1 000 000 &#8381;', text: 'Стань лидером недели', theme: 'slide-red' }
]

const currentSlide = ref(0)

function nextSlide() {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = slides.length - 1
  }
}

const cases = [
  { id: 1, name: 'Молочный Стандарт', price: 150, emoji: '🥛', color: 'blue' },
  { id: 2, name: 'Сырный Премиум', price: 350, emoji: '🧀', color: 'gold' },
  { id: 3, name: 'Йогуртовый Люкс', price: 500, emoji: '🍦', color: 'purple' },
  { id: 4, name: 'Масляный VIP', price: 1000, emoji: '🧈', color: 'red' },
  { id: 5, name: 'Кефирный Элит', price: 250, emoji: '🥤', color: 'green' },
  { id: 6, name: 'Сметанный Голд', price: 750, emoji: '🍶', color: 'gold' }
]
</script>

<template>
  <div class="home">
    <section class="slider" :class="slides[currentSlide].theme">
      <button class="arrow arrow-prev" @click="prevSlide">&#10094;</button>

      <div class="slide-content">
        <h1 class="slide-title" v-html="slides[currentSlide].title"></h1>
        <p class="slide-text">{{ slides[currentSlide].text }}</p>
        <button class="cta-btn">Участвовать</button>
      </div>

      <button class="arrow arrow-next" @click="nextSlide">&#10095;</button>

      <div class="dots">
        <span
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="dot"
          :class="{ active: index === currentSlide }"
          @click="currentSlide = index"
        ></span>
      </div>
    </section>

    <section class="cases-section">
      <h2 class="section-title">Кейсы</h2>
      <div class="cases-grid">
        <CaseCard
          v-for="item in cases"
          :key="item.id"
          :case-item="item"
        />
      </div>
    </section>

    <section class="about">
      <div class="about-inner">
        <h3 class="about-title">О проекте memoRRRRy</h3>
        <p class="about-text">
          Мы работаем в <strong>Москве</strong> и <strong>Петербурге</strong>.
          Занимаемся куплей и продажей редких молочных продуктов.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.slider {
  position: relative;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4rem;
  transition: background 0.5s ease;
  overflow: hidden;
}

.slide-purple {
  background: linear-gradient(135deg, #4a148c, #7c3aed);
}

.slide-blue {
  background: linear-gradient(135deg, #1a237e, #3b82f6);
}

.slide-red {
  background: linear-gradient(135deg, #b71c1c, #ef4444);
}

.slide-content {
  text-align: center;
  z-index: 2;
}

.slide-title {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.slide-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.cta-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  z-index: 3;
  transition: background 0.2s;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.6);
}

.arrow-prev {
  left: 1.5rem;
}

.arrow-next {
  right: 1.5rem;
}

.dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: background 0.2s;
}

.dot.active {
  background: #ffd700;
}

.cases-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  border-left: 3px solid #ffd700;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.about {
  padding: 3rem 2rem;
  background: #12121f;
}

.about-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffd700;
}

.about-text {
  color: #888;
  font-size: 1rem;
  line-height: 1.6;
}
</style>
