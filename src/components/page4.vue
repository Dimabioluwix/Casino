<script setup>
import useUsers from '../composables/useUsers';
const users = useUsers()
</script>
<template>
    <div>
        <!-- {{ users.pips }} -->
        <!-- {{ users.userList }} -->
    </div>
    <div v-for="value in users.userList.value">
        <div>Имя: {{ value.name }}</div>
        <div>Возраст: {{ value.digit }}</div>
    </div>
</template>s