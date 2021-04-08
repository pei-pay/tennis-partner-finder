<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
}
</script>

<style scoped>
/* buttons */
button,
a {
  text-decoration: none;
  background: #ebebeb;
  border-radius: 8px;
  border: 0;
  padding: 0.75rem 1.5rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  margin-right: 0.5rem;
  display: inline-block;
  transition: all 0.2s ease-in-out;
}

a:hover,
a:active,
button:hover,
button:active {
  background: #4f515a;
  color: white;
}

.flat {
  background: none;
  border: none;
  outline: none;
}

.flat:hover,
.flat:active {
  opacity: 0.8;
  background: none;
  color: #4f515a;
}
</style>
