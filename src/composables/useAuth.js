import { ref, computed } from 'vue'

const USERS_KEY = 'memory_users'
const SESSION_KEY = 'memory_session'

const ADMIN_EMAIL = 'admin@memory.ru'
const ADMIN_PASSWORD = 'admin123'

function loadUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    const adminUser = {
      name: 'Администратор',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      balance: 99999
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([adminUser]))
    return [adminUser]
  }
  return JSON.parse(raw)
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  const email = localStorage.getItem(SESSION_KEY)
  if (!email) return null
  const users = loadUsers()
  const found = users.find(function (u) { return u.email === email })
  return found || null
}

const currentUser = ref(loadSession())

const isLoggedIn = computed(function () {
  return currentUser.value !== null
})

const isAdmin = computed(function () {
  return currentUser.value !== null && currentUser.value.role === 'admin'
})

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function register(name, email, password) {
  const errors = {}

  if (!name || name.trim().length < 2) {
    errors.name = 'Имя должно быть минимум 2 символа'
  }

  if (!email || !email.trim()) {
    errors.email = 'Введите email'
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Некорректный формат email'
  }

  if (!password) {
    errors.password = 'Введите пароль'
  } else if (password.length < 6) {
    errors.password = 'Пароль минимум 6 символов'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors: errors }
  }

  const users = loadUsers()
  const exists = users.find(function (u) { return u.email === email.trim().toLowerCase() })

  if (exists) {
    return { success: false, errors: { email: 'Пользователь с таким email уже существует' } }
  }

  const newUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password,
    role: 'user',
    balance: 1000
  }

  users.push(newUser)
  saveUsers(users)

  currentUser.value = newUser
  localStorage.setItem(SESSION_KEY, newUser.email)

  return { success: true, errors: {} }
}

function login(email, password) {
  const errors = {}

  if (!email || !email.trim()) {
    errors.email = 'Введите email'
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Некорректный формат email'
  }

  if (!password) {
    errors.password = 'Введите пароль'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors: errors }
  }

  const users = loadUsers()
  const found = users.find(function (u) {
    return u.email === email.trim().toLowerCase() && u.password === password
  })

  if (!found) {
    return { success: false, errors: { email: 'Неверный email или пароль' } }
  }

  currentUser.value = found
  localStorage.setItem(SESSION_KEY, found.email)

  return { success: true, errors: {} }
}

function logout() {
  currentUser.value = null
  localStorage.removeItem(SESSION_KEY)
}

function updateBalance(amount) {
  if (!currentUser.value) return
  currentUser.value.balance += amount

  const users = loadUsers()
  const idx = users.findIndex(function (u) { return u.email === currentUser.value.email })
  if (idx !== -1) {
    users[idx].balance = currentUser.value.balance
    saveUsers(users)
  }
}

export {
  currentUser,
  isLoggedIn,
  isAdmin,
  register,
  login,
  logout,
  updateBalance
}
