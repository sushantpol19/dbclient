import Vue from 'vue'
import App from './App.vue' 

import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify); 

import Vuex from 'vuex'
Vue.use(Vuex);

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

import store from './store'

new Vue({
  el: '#app',
  store, router,
  render: h => h(App)
})
