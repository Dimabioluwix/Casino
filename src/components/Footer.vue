<script setup>

</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- Навигация -->
      <div class="footer-section">
        <h4>Навигация</h4>
        <ul>
          <li><a href="#">Главная</a></li>
          <li><a href="#">Казино</a></li>
          <li><a href="#">Слоты</a></li>
          <li><a href="#">Акции</a></li>
        </ul>
      </div>

      <!-- Страницы информации -->
      <div class="footer-section">
        <h4>Информация</h4>
        <ul>
          <li><a href="#">О нас</a></li>
          <li><a href="#">Правила</a></li>
          <li><a href="#">Политика конфиденциальности</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </div>

      <!-- Контакты -->
      <div class="footer-section">
        <h4>Контакты</h4>
        <p>+7 (999) 999-99-99</p>
        <p>info@memoRRRRy.ru</p>
        <p class="timezone">GMT+3</p>
      </div>

      <!-- Соцсети -->
      <div class="footer-section">
        <h4>Соцсети</h4>
        <div class="social-links">
          <a href="#" target="_blank">VK</a>
          <a href="#" target="_blank">Telegram</a>
          <a href="#" target="_blank">YouTube</a>
        </div>
      </div>

      <!-- Копирайт -->
      <div class="footer-bottom">
        <p>© 2026 Casino memoRRRRy. Все права защищены.</p>
        <p class="company-name">Казино «memoRRRRy»</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #141414;
  color: #ccc;
  padding: 2rem 1rem 1rem;
  border-top: 1px solid #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 200px;
   color: #fff;
  margin-bottom: 0.5rem;
}

.footer-bottom {
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #333;   /* полоска */
  font-size: 0.85rem;             /*размер текста всего */
  color: #aaa;                  /*цвет полоски */
}

.social-links{
    padding: 2px;
    padding-top: 2px;
}
</style>