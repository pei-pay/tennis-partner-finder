<template>
  <base-card>
    <h3>{{ fullName }}</h3>
    <h4>{{ level }}</h4>
    <div>
      <base-badge v-for="time in times" :key="time" :type="time" :title="time">
      </base-badge>
    </div>
    <div class="actions">
      <base-button link :to="partnerContactLink">
        Contact
      </base-button>
      <base-button link :to="partnerDetailsLink">View Details</base-button>
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'level', 'times'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    partnerContactLink() {
      return this.$route.path + '/' + this.id + '/contact'
    },
    partnerDetailsLink() {
      return this.$route.path + '/' + this.id
    },
  },
}
</script>

<style scoped>
h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

/* div {
  margin: 0.5rem 0;
} */

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
