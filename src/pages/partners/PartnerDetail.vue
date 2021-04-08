<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ level }}</h3>
        <base-badge
          v-for="time in times"
          :key="time"
          :type="time"
          :title="time"
        ></base-badge>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedPartner: null,
    }
  },
  computed: {
    fullName() {
      return (
        this.selectedPartner.firstName + ' ' + this.selectedPartner.lastName
      )
    },
    times() {
      return this.selectedPartner.times
    },
    level() {
      return this.selectedPartner.level
    },
    description() {
      return this.selectedPartner.description
    },
    contactLink() {
      return '/partners' + '/' + this.id + '/contact'
    },
  },
  created() {
    this.selectedPartner = this.$store.getters['partners/partners'].find(
      (partner) => partner.id === this.id
    )
  },
}
</script>

<style></style>
