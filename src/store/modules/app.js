import * as types from '../mutation-types.js'

const state = {
  nav: {
    opened: true
  }
}

const mutations = {
  [types.TOGGLE_NAV] (state, config) {
    if(config.hasOwnProperty('opened'))
      state.nav.opened = config.opened;
    else
      state.nav.opened = ! state.nav.opened;
  }
}

export default {
  state,
  mutations
}