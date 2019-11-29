import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import InputMask from 'vue-input-mask'
import VueAxios from 'vue-axios'
import firebase from 'firebase/app'
import Vuetify from 'vuetify'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.prototype.$path = "http://localhost:8080"
Vue.prototype.$axios = axios
firebase.initializeApp({
    apiKey: "AIzaSyDivyvXgYoDQnLX8j02ErCs3upsm6OiFKY",
    authDomain: "action-gol.firebaseapp.com",
    databaseURL: "https://action-gol.firebaseio.com",
    projectId: "action-gol",
    storageBucket: "action-gol.appspot.com",
    messagingSenderId: "253574338725",
    appId: "1:253574338725:web:883d607e79a6bb3263554c",
    measurementId: "G-ES21S4TLB7"
});
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(Vuetify)
Vue.component('input-mask', InputMask)
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');