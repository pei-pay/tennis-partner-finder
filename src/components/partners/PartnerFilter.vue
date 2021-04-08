<template>
  <base-card>
    <div class="title">
      <h2>Find Your Partner</h2>
      <base-button v-if="!isShow" @click="toggleShow">Open</base-button>
      <base-button v-else @click="toggleShow">Close</base-button>
    </div>
    <div v-if="isShow">
      <section>
        <h4>Time of the day</h4>
        <span class="filter-option">
          <input type="checkbox" id="morning" checked @change="setFilter" />
          <label for="morning">Morning</label>
        </span>
        <span class="filter-option">
          <input type="checkbox" id="evening" checked @change="setFilter" />
          <label for="evening">Evening</label>
        </span>
        <span class="filter-option">
          <input type="checkbox" id="night" checked @change="setFilter" />
          <label for="night">Night</label>
        </span>
      </section>
      <section>
        <h4>Level of player</h4>
        <span class="filter-option">
          <input type="checkbox" id="beginner" checked @change="setFilter" />
          <label for="beginner">Beginner</label>
        </span>
        <span class="filter-option">
          <input
            type="checkbox"
            id="intermediate"
            checked
            @change="setFilter"
          />
          <label for="intermediate">Intermediate</label>
        </span>
        <span class="filter-option">
          <input type="checkbox" id="advanced" checked @change="setFilter" />
          <label for="advanced">Advanced</label>
        </span>
      </section>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      isShow: false,
      filters: {
        morning: true,
        evening: true,
        night: true,
        beginner: true,
        intermediate: true,
        advanced: true,
      },
    }
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id
      const isActive = event.target.checked
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      }
      this.filters = updatedFilters
      this.$emit('change-filter', updatedFilters)
    },
    toggleShow() {
      this.isShow = !this.isShow
    },
  },
}
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
