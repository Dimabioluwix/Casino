import { ref, watch } from 'vue';
// const pips = ref(3034)
// function divide() {
//     pips.value/= 2
// }
const userList = ref([])
const userId = ref(1)

function addUser(newUser) {
    // userList.value.push(newUser)
    userList.value.push({...newUser, id: userId.value})
    userId.value++
}
export default function useUsers() {
    // return {pips, divide} 
    return {userList, addUser}
}

function movement() {
    
}

//                                     Баланс Игрока
// Инициализируем баланс
const initialBalance = localStorage.getItem('user_balance');
export const balance = ref(initialBalance ? parseInt(initialBalance) : 0);

// Следим за изменениями (автосохранение)
watch(balance, function(val) {
  localStorage.setItem('user_balance', val);
});

// Функции изменения
export function addMoney() {
  balance.value += 100;
}

export function removeMoney() {
  balance.value -= 100;
}
