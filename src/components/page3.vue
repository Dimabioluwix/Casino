<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
</script>
<template>
    <div>
        Текст страницы 3
    </div>
    <button @click="router.push({ name: 'Page5' })">Путь</button>
    <div>{{ route }}</div>
</template>