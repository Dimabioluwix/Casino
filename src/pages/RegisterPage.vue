<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../composables/useAuth.js'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const showPassword = ref(false)

function handleRegister() {
  errors.value = {}

  if (password.value !== confirmPassword.value) {
    errors.value.confirm = 'Пароли не совпадают'
  }

  if (!confirmPassword.value) {
    errors.value.confirm = 'Подтвердите пароль'
  }

  const result = register(name.value, email.value, password.value)

  if (result.errors && Object.keys(result.errors).length > 0) {
    errors.value = { ...errors.value, ...result.errors }
    return
  }

  if (errors.value.confirm) {
    return
  }

  if (result.success) {
    router.push({ name: 'Page1' })
  }
}

function goToLogin() {
  router.push({ name: 'Login' })
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-logo">memoRRRRy</span>
        <h2 class="auth-title">Регистрация</h2>
        <p class="auth-subtitle">Создайте аккаунт и начните играть</p>
      </div>

      <form class="auth-form" @submit.prevent="handleRegister" novalidate>
        <div class="field">
          <label class="field-label">Имя</label>
          <input
            v-model="name"
            type="text"
            class="field-input"
            :class="{ 'field-error': errors.name }"
            placeholder="Ваше имя"
          />
          <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label class="field-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="field-input"
            :class="{ 'field-error': errors.email }"
            placeholder="example@mail.ru"
          />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label class="field-label">Пароль</label>
          <div class="password-wrap">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="field-input"
              :class="{ 'field-error': errors.password }"
              placeholder="Минимум 6 символов"
            />
            <button type="button" class="toggle-pass" @click="togglePassword">
              {{ showPassword ? '&#128065;' : '&#128064;' }}
            </button>
          </div>
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>

        <div class="field">
          <label class="field-label">Подтвердите пароль</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="field-input"
            :class="{ 'field-error': errors.confirm }"
            placeholder="Повторите пароль"
          />
          <span v-if="errors.confirm" class="error-msg">{{ errors.confirm }}</span>
        </div>

        <button type="submit" class="submit-btn">Зарегистрироваться</button>
      </form>

      <div class="auth-footer">
        <p>Уже есть аккаунт? <button class="link-btn" @click="goToLogin">Войти</button></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: #0d0d1a;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: #1a1a2e;
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 215, 0, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-title {
  font-size: 1.3rem;
  color: #fff;
  margin-top: 0.75rem;
}

.auth-subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.field-label {
  color: #aaa;
  font-size: 0.85rem;
  font-weight: 600;
}

.field-input {
  padding: 0.75rem 1rem;
  background: #12121f;
  border: 1px solid #2a2a3e;
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.2s;
  outline: none;
  width: 100%;
}

.field-input::placeholder {
  color: #444;
}

.field-input:focus {
  border-color: #ffd700;
}

.field-input.field-error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.error-msg {
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 2px;
}

.password-wrap {
  position: relative;
}

.password-wrap .field-input {
  padding-right: 3rem;
}

.toggle-pass {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #666;
  padding: 4px;
}

.submit-btn {
  margin-top: 0.5rem;
  padding: 0.85rem;
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #0d0d1a;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.15s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.25);
}

.submit-btn:active {
  transform: scale(0.98);
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;
}

.link-btn {
  background: none;
  border: none;
  color: #ffd700;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: underline;
}

.link-btn:hover {
  color: #ffaa00;
}
</style>
