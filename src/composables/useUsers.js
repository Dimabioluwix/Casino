import { computed } from 'vue'
import { currentUser, updateBalance } from './useAuth.js'

const balance = computed(function () {
  if (currentUser.value) {
    return currentUser.value.balance
  }
  return 0
})

function addMoney() {
  updateBalance(500)
}

function removeMoney() {
  if (balance.value >= 100) {
    updateBalance(-100)
  }
}

function changeBalance(amount) {
  updateBalance(amount)
}

export { balance, addMoney, removeMoney, changeBalance }
