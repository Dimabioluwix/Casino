<script setup>
import { ref } from 'vue';

// 1. Текст для слайдера
const slides = [
  { id: 1, title: 'Бонус +200% к депозиту!', bg: '#4a148c', text: 'Начни играть прямо сейчас' },
  { id: 2, title: 'Новые кейсы с ножами', bg: '#1a237e', text: 'Успей забрать свой дроп' },
  { id: 3, title: 'Турнир на 1 000 000₽', bg: '#b71c1c', text: 'Стань лидером недели' }
];

const currentSlide = ref(0);

function nextSlide() {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = slides.length - 1;
  }
}

</script>

<template>
  <main class="home">
    
    <!-- Рекламный баннер-слайдер -->
    <section class="slider" :style="{ backgroundColor: slides[currentSlide].bg }">
      <button class="arrow prev" @click="prevSlide">❮</button>
      
      <div class="slide-content">
        <h1>{{ slides[currentSlide].title }}</h1>
        <p>{{ slides[currentSlide].text }}</p>
        <button class="cta-button">Участвовать</button>
      </div>

      <button class="arrow next" @click="nextSlide">❯</button>
    </section>

    <!-- Сетка кейсов -->
    <section class="cases-section">
      <h2>Кейсы для ролла</h2>
     
      
    </section>

    <!-- Твой блок "О нас" -->
    <section class="about-simple">
      <div class="content">
        <h3>О проекте memoRRRRy</h3>
        <p>Мы работаем в <b>Москве</b> и <b>Петербурге</b>. Занимаемся куплей и продажей редких скинов.</p>
      </div>
    </section>

  </main>
</template>

<style scoped>
.home {
  background: #121212;
  color: white;
  min-height: 100vh;
}

/* Слайдер */
.slider {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  transition: background 0.5s ease;
  border-bottom: 2px solid #333;
}

.slide-content {
  text-align: center;
}

.cta-button {
  background: #ffc107;
  border: none;
  padding: 10px 25px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 5px;
}

.arrow {
  background: rgba(0,0,0,0.3);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
}

.about-simple {
  padding: 40px;
  background: #181818;
  color: #888;
  font-size: 0.9rem;
}
</style>
