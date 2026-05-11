<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const showLayout = computed(function () {
  return route.name !== 'Login' && route.name !== 'Register'
})
</script>

<template>
  <Header v-if="showLayout" />
  <main class="main-content">
    <RouterView />
  </main>
  <Footer v-if="showLayout" />
</template>

<style scoped>
.main-content {
  flex: 1;
}
</style>
