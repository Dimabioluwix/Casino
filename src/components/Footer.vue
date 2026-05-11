<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-section">
        <h4 class="footer-title">Навигация</h4>
        <ul>
          <li><RouterLink :to="{ name: 'Page1' }">Главная</RouterLink></li>
          <li><RouterLink :to="{ name: 'Page2' }">Больше/Меньше</RouterLink></li>
          <li><RouterLink :to="{ name: 'Page3' }">Ставки</RouterLink></li>
          <li><RouterLink :to="{ name: 'Page4' }">Слоты</RouterLink></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Информация</h4>
        <ul>
          <li><a href="#">О нас</a></li>
          <li><a href="#">Правила</a></li>
          <li><a href="#">Политика конфиденциальности</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Контакты</h4>
        <p>+7 (999) 999-99-99</p>
        <p>info@memoRRRRy.ru</p>
        <p class="timezone">GMT+3</p>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Соцсети</h4>
        <div class="social-links">
          <a href="#" target="_blank" class="social-badge">VK</a>
          <a href="#" target="_blank" class="social-badge">TG</a>
          <a href="#" target="_blank" class="social-badge">YT</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 Casino memoRRRRy. Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0a0a14;
  padding: 3rem 2rem 1.5rem;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  margin-top: auto;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #ffd700;
  margin-bottom: 1rem;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #888;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: #ffd700;
}

.footer-section p {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.timezone {
  color: #555;
  font-size: 0.8rem;
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #1a1a2e;
  color: #aaa;
  font-size: 0.75rem;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
}

.social-badge:hover {
  background: #ffd700;
  color: #0d0d1a;
}

.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid #1a1a2e;
  text-align: center;
  color: #555;
  font-size: 0.8rem;
}
</style>
