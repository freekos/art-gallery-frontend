<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import SearchIcon from '@/assets/icons/SearchIcon.vue'
import { routesMap } from '@/router';
import { usePicturesStore } from '@/stores/picture';

const route = useRoute()
const router = useRouter()
const picturesStore = usePicturesStore()
const searchValue = ref<string>('')
const isInput = ref<boolean>(false)
const hasSearch = computed(() => route.path !== routesMap.pictures())


const handleShowInput = () => {
  isInput.value = true;
}

const handleSearchBlur = () => {
  isInput.value = false
}

const handleSearch = () => {
  if (searchValue.value === '') return
  picturesStore.searchPictures({ query: searchValue.value })
  router.push(routesMap.pictures())
}

</script>
<template>
  <header class="header">
    <div class="header__content">
      <div class="header__left">
        <RouterLink :to="routesMap.pictures()">
          <img src="@/assets/logo.svg" alt="logo" />
        </RouterLink>
      </div>
      <div class="header__right">
        <button v-if="hasSearch && !isInput" class="header__button" @click="handleShowInput">
          <SearchIcon />
          <span>Поиск</span>
        </button>
        <form v-else-if="hasSearch && isInput" class="search" @submit.prevent="handleSearch" @blur="handleSearchBlur">
          <input class="search__input" v-model="searchValue" />
          <button type="submit" class="search__button">
            <SearchIcon fill="black" />
          </button>
        </form>
        <RouterLink class="header__button" :to="routesMap.favorites()">
          <HeartIcon />
          <span>Избранное</span>
        </RouterLink>
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

  &__right>a {
    text-decoration: none;
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

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;

    position: relative;

    &__input {
      width: 100%;
      height: 100%;

      padding: 5px 10px;

      background: transparent;
      border: none;
      border-bottom: 1px solid rgb(var(--white-800));

      font-size: 1rem;
      font-weight: 400;
      color: rgb(var(--white-800));
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      cursor: pointer;

      background: rgb(var(--white-800));
      border: none;
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