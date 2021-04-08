export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    }
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload)
    },
    setRequests(state, payload) {
      state.requests = payload
    },
  },
  actions: {
    async contactPartner(context, payload) {
      const newRequest = {
        userEmail: payload.email,
        message: payload.message,
      }
      const response = await fetch(
        `https://tennis-partner-finder-dd22d-default-rtdb.firebaseio.com/requests/${payload.partnerId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      )

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to send request.'
        )
        throw error
      }

      const responseData = await response.json()

      newRequest.id = responseData.name
      newRequest.partnerId = payload.partnerId

      context.commit('addRequest', newRequest)
    },
    async fetchRequests(context) {
      const partnerId = context.rootGetters.userId
      const token = context.rootGetters.token
      const response = await fetch(
        `https://tennis-partner-finder-dd22d-default-rtdb.firebaseio.com/requests/${partnerId}.json?auth=` +
          token
      )
      const responseData = await response.json()
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch requests.'
        )
        throw error
      }

      const requests = []

      for (const key in responseData) {
        const request = {
          id: key,
          partnerId: partnerId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].message,
        }
        requests.push(request)
      }

      context.commit('setRequests', requests)
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const PartnerId = rootGetters.userId
      return state.requests.filter((req) => req.partnerId === PartnerId)
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0
    },
  },
}
