<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <partner-filter @change-filter="setFilters"></partner-filter>
    </section>
    <section>
      <div class="controls">
        <base-button @click="loadPartners(true)">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
          >Login to register as Partner</base-button
        >
        <base-button
          v-if="isLoggedIn && !isPartner && !isLoading"
          link
          to="/register"
          >Register as Partner</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div v-else-if="hasPartners">
        <partner-item
          v-for="partner in filteredPartners"
          :key="partner.id"
          :id="partner.id"
          :first-name="partner.firstName"
          :last-name="partner.lastName"
          :level="partner.level"
          :times="partner.times"
        ></partner-item>
      </div>
      <h3 v-else>No partners found.</h3>
    </section>
  </div>
</template>

<script>
import PartnerItem from '@/components/partners/PartnerItem.vue'
import PartnerFilter from '@/components/partners/PartnerFilter.vue'

export default {
  components: {
    PartnerItem,
    PartnerFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        morning: true,
        evening: true,
        night: true,
        beginner: true,
        intermediate: true,
        advanced: true,
      },
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    isPartner() {
      return this.$store.getters['partners/isPartner']
    },
    filteredPartners() {
      const partners = this.$store.getters['partners/partners']
      return partners.filter((partner) => {
        if (this.activeFilters.beginner && partner.level === 'Beginner') {
          return true
        }
        if (
          this.activeFilters.intermediate &&
          partner.level === 'Intermediate'
        ) {
          return true
        }
        if (this.activeFilters.advanced && partner.level === 'Advanced') {
          return true
        }
        if (this.activeFilters.morning && partner.times.includes('morning')) {
          return true
        }
        if (this.activeFilters.evening && partner.times.includes('evening')) {
          return true
        }
        if (this.activeFilters.night && partner.times.includes('night')) {
          return true
        }
        return false
      })
    },
    hasPartners() {
      return !this.isLoading && this.$store.getters['partners/hasPartners']
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadPartners(refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('partners/loadPartners', {
          forceRefresh: refresh,
        })
      } catch (error) {
        this.error = error.messagae || 'Something went wrong!'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
  },
  created() {
    this.loadPartners()
  },
}
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
