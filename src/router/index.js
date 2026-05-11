import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../composables/useAuth.js'
import HomePage from '../pages/HomePage.vue'
import HighLowPage from '../pages/HighLowPage.vue'
import BetsPage from '../pages/BetsPage.vue'
import SlotsPage from '../pages/SlotsPage.vue'
import CaseOpenPage from '../pages/CaseOpenPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { guest: true }
  },
  {
    path: '/',
    name: 'Page1',
    component: HomePage,
    meta: { auth: true }
  },
  {
    path: '/high-low',
    name: 'Page2',
    component: HighLowPage,
    meta: { auth: true }
  },
  {
    path: '/bets',
    name: 'Page3',
    component: BetsPage,
    meta: { auth: true }
  },
  {
    path: '/slots',
    name: 'Page4',
    component: SlotsPage,
    meta: { auth: true }
  },
  {
    path: '/case/:id',
    name: 'CaseOpen',
    component: CaseOpenPage,
    meta: { auth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta.auth && !isLoggedIn.value) {
    next({ name: 'Login' })
    return
  }

  if (to.meta.guest && isLoggedIn.value) {
    next({ name: 'Page1' })
    return
  }

  next()
})

export default router
