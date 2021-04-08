<template>
  <the-header></the-header>
  <div class="content">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch('autoLogin')
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout
    },
  },
  watch: {
    didAutoLogout(curvalue, oldValue) {
      if (curvalue && curvalue !== oldValue) {
        this.$router.replace('/partners')
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
  color: #4f515a;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  background: #fafafa;
}

.content {
  margin: 0 auto;
  max-width: 60rem;
  padding: 0 20px;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
