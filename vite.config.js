import { defineConfig } from 'vite'
import vue from '@vue/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/Casino/', // Добавьте эту строку
})