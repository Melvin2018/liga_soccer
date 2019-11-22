import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/jugador',
        name: 'listJ',
        component: () =>
            import ( /* webpackChunkName: "lj" */ '../views/ListaJugador.vue')
    },
    {
        path: '/equipo',
        name: 'listE',
        component: () =>
            import ( /* webpackChunkName: "le" */ '../views/ListadoEquipo.vue')
    },
    {
        path: '/temporada',
        name: 'listT',
        component: () =>
            import ( /* webpackChunkName: "te" */ '../views/Temporada.vue')
    },
    {
        path: '/equipotemporada',
        name: 'listET',
        component: () =>
            import ( /* webpackChunkName: "et" */ '../views/EquipoTList.vue')
    },
    {
        path: '/partidos',
        name: 'part',
        component: () =>
            import ('../views/Partidos.vue')
    },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router