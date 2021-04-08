import { createRouter, createWebHistory } from 'vue-router'

import PartnersList from './pages/partners/PartnersList.vue'
import PartnerDetail from './pages/partners/PartnerDetail.vue'
import PartnerRegistration from './pages/partners/PartnerRegistration.vue'
import ContactPartner from './pages/requests/ContactPartner.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue'
import store from './store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/partners' },
    { path: '/partners', component: PartnersList },
    {
      path: '/partners/:id',
      component: PartnerDetail,
      props: true,
      children: [{ path: 'contact', component: ContactPartner }],
    },
    {
      path: '/register',
      component: PartnerRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
})

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/partners')
  } else {
    next()
  }
})

export default router
