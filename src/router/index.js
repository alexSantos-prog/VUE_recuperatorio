import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/areas',
    name: 'areas',
    component: () => import(/* webpackChunkName: "areas" */ '../views/AreaView.vue')
  },
  {
    path: '/area/:id',
    name: 'area-edit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/AreaEditView.vue')
  },

  {
    path: '/tipos',
    name: 'tipos',
    component: () => import(/* webpackChunkName: "areas" */ '../views/TipoView.vue')
  },
  {
    path: '/tipo/:id',
    name: 'tipo-edit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/TipoEditView.vue')
  },

  {
    path: '/empleados',
    name: 'empleados',
    component: () => import(/* webpackChunkName: "areas" */ '../views/EmpleadoView.vue')
  },
  {
    path: '/empleado/:id',
    name: 'empleado-edit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/EmpleadoEditView.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
