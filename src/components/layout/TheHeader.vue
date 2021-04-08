<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Tennis Partner</router-link></h1>
      <ul>
        <li>
          <router-link to="/partners">All Partners</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/partners')
    },
  },
}
</script>

<style scoped>
header {
  /* width: 100%; */
  background-color: white;
  margin-bottom: 30px;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}

header a {
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  transition: color ease 0.2s;
}

a:active,
a:hover,
a.router-link-active {
  color: #000;
}

h1 {
  margin: 0;
}

h1 a {
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  max-width: 70rem;
  height: 5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
