<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
const a = ref()
const b = ref()

const dasha = computed(() => {

    console.log('Check')
    console.log(b.value) //для изменения 
    return Math.round(a.value)
})

// watch(a, () => {
//     console.log('Сработал')
// })

// onMounted(() => {
//     console.log(('koga'));
//     if(localStorage.getItem('a')) {
//         a.value = localStorage.getItem('a')
//     } else {
//         a.value = 'Значвение по умолчанию'
//     }

// })

// onUnmounted(() => {
//     console.log('Уипо')
// })
</script>
<template>
    <div>
        Текст страницы 2
    </div>
    <button @click="a = Math.random() * 600">Рнадом</button>
    <button @click="b++">+</button>
    <div>{{ a }}</div>
    <div>{{ dasha }}</div>
</template>