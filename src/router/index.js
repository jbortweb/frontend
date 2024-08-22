import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservasLayout from '../views/reservas/ReservasLayout.vue'
import authAPI from '@/api/authAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {requiresAdmin: true},
      children : [
        {
          path: '',
          name: 'admin-reservas',
          component: () => import('../views/admin/AdminReservasView.vue'),
        },
      ]
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ReservasLayout,
      meta: {requiresAuth: true},
      children : [
        {
          path: '',
          name: 'mis-reservas',
          component: () => import('../views/reservas/MisReservasView.vue'),
        },
        {
          path: 'nueva',
          component: () => import('../views/reservas/NuevaReservaLayout.vue'),
          children: [
            {
              path: '',
              name: 'nueva-reserva',
              component: () => import('../views/reservas/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'detalles-reserva',
              component: () => import('../views/reservas/DetailsView.vue'),
            }
          ]
        },
        {
          path:":id/editar",
          component: () => import('../views/reservas/EditReservasLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-reserva',
              component: () => import('../views/reservas/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'edit-detalles-reserva',
              component: () => import('../views/reservas/DetailsView.vue'),
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children : [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'newPassword',
          component: () => import('../views/auth/NewPasswordView.vue'),
        },
      ]
    }
  ]
})

// Proteger rutas autentificadas
router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
    try {
      const { data } =  await AuthAPI.auth()
      if(data.admin) {
        next({name: 'admin'})
      } else {
        next()
      }
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

router.beforeEach( async (to, from, next) => {
const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
if(requiresAdmin) {
  try {
    await AuthAPI.admin()
    next()
  } catch (error) {
    next({name: 'login'})
  }
} else {
  next()
}

})


export default router
