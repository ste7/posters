import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import createPersistedState from 'vuex-persistedstate'

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      app
    },
    plugins: [createPersistedState()],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
