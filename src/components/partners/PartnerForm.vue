<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="fistname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid" class="error">Firstname must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">LastName</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid" class="error">Lastname must not be empty</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid" class="error">
        Description must not be empty
      </p>
    </div>

    <div class="form-control">
      <h3>Level of player</h3>
      <div>
        <input
          type="radio"
          id="beginner"
          value="Beginner"
          name="level"
          checked
          v-model="level"
        />
        <label for="beginner">Beginner</label>
      </div>
      <div>
        <input
          type="radio"
          id="intermediate"
          value="Intermediate"
          name="level"
          v-model="level"
        />
        <label for="intermediate">Intermediate</label>
      </div>
      <div>
        <input
          type="radio"
          id="advanced"
          value="Advanced"
          name="level"
          v-model="level"
        />
        <label for="advanced">Advanced</label>
      </div>
    </div>

    <div class="form-control" :class="{ invalid: !times.isValid }">
      <h3>Time of the day</h3>
      <div>
        <input
          type="checkbox"
          id="morning"
          value="morning"
          v-model="times.val"
          @blur="clearValidity('times')"
        />
        <label for="morning">Morning</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="evening"
          value="evening"
          v-model="times.val"
          @blur="clearValidity('times')"
        />
        <label for="evening">Evening</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="night"
          value="night"
          v-model="times.val"
          @blur="clearValidity('times')"
        />
        <label for="night">Night</label>
      </div>
      <p v-if="!times.isValid" class="error">At least one must be selected.</p>
    </div>

    <p v-if="!formIsValid" class="error">
      Please fix the above errors and submit again.
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      level: 'Beginner',
      times: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true
    },
    validateForm() {
      this.formIsValid = true
      if (this.firstName.val === '') {
        this.firstName.isValid = false
        this.formIsValid = false
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false
        this.formIsValid = false
      }
      if (this.description.val === '') {
        this.description.isValid = false
        this.formIsValid = false
      }
      if (this.times.val.length === 0) {
        this.times.isValid = false
        this.formIsValid = false
      }
    },
    submitForm() {
      this.validateForm()

      if (!this.formIsValid) {
        return
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        level: this.level,
        times: this.times.val,
      }
      this.$emit('save-data', formData)
    },
  },
}
</script>

<style scoped>
.form-control {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 70%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus,
input[type='radio']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.error {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
