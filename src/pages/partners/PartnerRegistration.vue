<template>
  <section>
    <base-card>
      <h2>Register as a partner</h2>
      <partner-form @save-data="saveData"></partner-form>
    </base-card>
  </section>
</template>

<script>
import PartnerForm from '@/components/partners/PartnerForm.vue'
export default {
  components: {
    PartnerForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('partners/registerPartner', data)
      this.$router.replace('/partners')
    },
  },
}
</script>
