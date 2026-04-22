import { ref } from "vue";
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