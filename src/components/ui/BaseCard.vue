<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 16px;
  margin: 20px auto;
  max-width: 60rem;
}
</style>
