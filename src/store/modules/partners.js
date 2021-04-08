export default {
  namespaced: true,

  state() {
    return {
      lastFetch: null,
      partners: [],
    }
  },

  getters: {
    partners(state) {
      return state.partners
    },
    hasPartners(state) {
      return state.partners && state.partners.length > 0
    },
    isPartner(_, getters, _2, rootGetters) {
      const partners = getters.partners
      const userId = rootGetters.userId
      return partners.some((partner) => partner.id === userId)
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch
      if (!lastFetch) {
        return true
      }
      const currentTimestamp = new Date().getTime()
      return (currentTimestamp - lastFetch) / 1000 > 60
    },
  },

  mutations: {
    registerPartner(state, payload) {
      state.partners.push(payload)
    },
    setPartners(state, payload) {
      state.partners = payload
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime()
    },
  },

  actions: {
    async registerPartner(context, data) {
      const userId = context.rootGetters.userId
      const partnerData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        level: data.level,
        times: data.times,
      }

      console.log(userId)

      const token = context.rootGetters.token

      const response = await fetch(
        `https://tennis-partner-finder-dd22d-default-rtdb.firebaseio.com/partners/${userId}.json?auth=` +
          token,
        {
          method: 'PUT',
          body: JSON.stringify(partnerData),
        }
      )

      // const responseData = await response.json()

      if (!response.ok) {
        //error ...
      }

      context.commit('registerPartner', {
        ...partnerData,
        id: userId,
      })
    },
    async loadPartners(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return
      }

      const response = await fetch(
        'https://tennis-partner-finder-dd22d-default-rtdb.firebaseio.com/partners/.json'
      )
      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!')
        throw error
      }

      const partners = []

      for (const key in responseData) {
        const partner = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          level: responseData[key].level,
          times: responseData[key].times,
        }
        partners.push(partner)
      }

      context.commit('setPartners', partners)
      context.commit('setFetchTimestamp')
    },
  },
}
