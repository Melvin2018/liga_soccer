import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/jugador',
        name: 'listJ',
        component: () =>
            import ('../views/ListaJugador.vue')
    },
    {
        path: '/equipo',
        name: 'listE',
        component: () =>
            import ('../views/ListadoEquipo.vue')
    },
    {
        path: '/tabla',
        name: 'tablag',
        component: () =>
            import ('../views/Tabla.vue')
    },
    {
        path: '/temporada',
        name: 'listT',
        component: () =>
            import ('../views/Temporada.vue')
    },
    {
        path: '/equipotemporada',
        name: 'listET',
        component: () =>
            import ('../views/EquipoTList.vue')
    },
    {
        path: '/partidos',
        name: 'part',
        component: () =>
            import ('../views/Partidos.vue')
    },
    {
        path: '/partido',
        name: 'partido',
        component: () =>
            import ('../views/Partido.vue')
    },
    {
        path: '/jornada_actual',
        name: 'jornActual',
        component: () =>
            import ('../views/Jornada.vue')
    },
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router