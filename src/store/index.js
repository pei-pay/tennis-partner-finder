import { createStore } from 'vuex'

import partnersModule from './modules/partners.js'
import requestsModule from './modules/requests.js'
import authModule from './modules/auth.js'

const store = createStore({
  modules: {
    partners: partnersModule,
    requests: requestsModule,
    auth: authModule,
  },
})

export default store
