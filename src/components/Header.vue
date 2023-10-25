<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import SearchIcon from '@/assets/icons/SearchIcon.vue'

const route = useRoute()
const hasSearch = computed(() => route.path !== '/')
</script>
<template>
  <header class="header">
    <div class="header__content">
      <div class="header__left">
        <img src="@/assets/logo.svg" alt="logo" />
      </div>
      <div class="header__right">
        <button v-if="hasSearch" class="header__button">
          <SearchIcon />
          <span>Поиск</span>
        </button>
        <button class="header__button">
          <HeartIcon />
          <span>Избранное</span>
        </button>
      </div>

    </div>
  </header>
</template>
<style scoped lang="scss">
.header {
  width: 100%;
  height: var(--header-height);

  background: rgb(var(--black-800));

  position: fixed;
  left: 0;
  top: 0;
  z-index: var(--header-index);

  &__content {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    width: 100%;
    max-width: var(--max-width);
    height: 100%;

    margin: 0 auto;
    padding: 0 20px;
  }

  &__left {
    justify-self: start;
  }

  &__right {
    display: flex;
    justify-self: end;
    align-items: center;
    gap: 38px;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 10px;

    cursor: pointer;
    background: transparent;
    border: none;
    will-change: color;
    transition: color 0.55s ease;

    font-size: 1.25rem;
    font-weight: 400;
    color: rgb(var(--white-800));

    >svg {
      will-change: fill;
      transition: fill 0.55s ease;
    }
  }

  &__button:hover {
    color: rgb(var(--yellow-800));

    >svg {
      fill: rgb(var(--yellow-800));
    }
  }

  @media (max-width:768px) {
    .header {
      &__button>span {
        display: none;
      }
    }
  }
}
</style>