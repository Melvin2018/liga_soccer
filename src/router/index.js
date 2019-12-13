import Vue from 'vue'
import VueRouter from 'vue-router'
import partido from '../views/Partido.vue'
Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/jugador',
        name: 'listadoJugador',
        component: () =>
            import ('../views/ListaJugador.vue')
    },
    {
        path: '/equipo',
        name: 'listEquipos',
        component: () =>
            import ('../views/ListadoEquipo.vue')
    },
    {
        path: '/tabla',
        name: 'tabla',
        component: () =>
            import ('../views/Tabla.vue')
    },
    {
        path: '/temporada',
        name: 'temporada',
        component: () =>
            import ('../views/Temporada.vue')
    },
    {
        path: '/equipotemporada',
        name: 'listadoET',
        component: () =>
            import ('../views/EquipoTList.vue')
    },
    {
        path: '/equipotemporada/carnet/:id',
        name: 'carnet',
        component: () =>
            import ('../components/Carnet.vue')
    },
    {
        path: '/equipotemporada/equipo',
        name: 'equipot',
        component: () =>
            import ('../components/EquipoT.vue')
    },
    {
        path: '/equipotemporada/carnet/lista/:id',
        name: 'carnetlist',
        component: () =>
            import ('../components/Carnets.vue')
    },
    {
        path: '/partidos',
        name: 'partidos',
        component: () =>
            import ('../views/Partidos.vue')
    },
    {
        path: '/partido/:id',
        name: 'partido',
        component: partido,
    },
    {
        path: '/partido/formacion/:id',
        name: 'formacion',
        component: () =>
            import ('../components/Formacion.vue')
    },
    {
        path: '/jugador/editar/:id',
        name: 'editarj',
        component: () =>
            import ('../components/EditarJ.vue')
    },
    {
        path: '/jugador/agregar',
        name: 'agregarj',
        component: () =>
            import ('../components/AgregarJ.vue')
    },
    {
        path: '/temporada/estadisticas',
        name: 'estadistica',
        component: () =>
            import ('../views/Estadisticas.vue')
    },
    {
        path: '/partido/gol/:id/:minuto',
        name: 'gol',
        component: () =>
            import ('../components/Gol.vue')
    },
    {
        path: '/partido/cambio/:id/:minuto',
        name: 'cambio',
        component: () =>
            import ('../components/Cambio.vue')
    },
    {
        path: '/partido/tarjeta/:id/:minuto',
        name: 'tarjeta',
        component: () =>
            import ('../components/Tarjeta.vue')
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