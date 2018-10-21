import Vuex from 'vuex'
import Vue from 'vue' 

import app from './modules/app.js'
import auth from './modules/auth.js'
import config from './modules/config.js'

import * as getters from './getters.js' 
import * as actions from './actions.js' 

Vue.use(Vuex)

const store = new Vuex.Store({ 
  getters,
  actions,
  modules: {
    app, auth, config
  },
  
})

export default store;