import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import VueAxios from 'vue-axios'
import firebase from 'firebase/app'
import vuetify from './plugins/vuetify'
import moment from "moment"
import VueMomentJS from "vue-momentjs"
import VueLodash from 'vue-lodash'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.prototype.$path = "http://192.168.43.16:8080"
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
Vue.use(VueMomentJS, moment)
Vue.use(VueSweetalert2)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(vuetify)
Vue.use(VueLodash, options)
const options = { name: 'lodash' }
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');