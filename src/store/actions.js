import * as types from './mutation-types.js'

export const toggleNav = ({ commit }, config) => {  
  commit(types.TOGGLE_NAV, config) 
}

