<script setup>
import page1 from './components/page1.vue'
import page2 from './components/page2.vue'
import page3 from './components/page3.vue'
import page4 from './components/page4.vue';
import page5 from './components/page5.vue';


</script>

<template>
    <div>
        <RouterLink :to="{name:'Page1'}">1</RouterLink>
        <RouterLink :to="{name:'Page2'}">2</RouterLink>
        <RouterLink :to="{name:'Page3'}">3</RouterLink>
        <RouterLink :to="{name:'Page4'}">4</RouterLink>
        <RouterLink :to="{name:'Page5'}">5</RouterLink>
    </div>
    <RouterView />

</template>

<style scoped></style>
