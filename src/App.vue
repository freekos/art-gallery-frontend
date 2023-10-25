<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <div class="app">
    <Header />
    <RouterView class="app__content" />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__content {
    width: 100%;
    height: 100%;
    flex-grow: 1;
  }
}
</style>
