<script setup lang="ts">
import SearchIcon from '@/assets/icons/SearchIcon.vue';
import { usePictureStore } from '@/stores/picture'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const searchValue = ref<string>('');

const pictureStore = usePictureStore()
const page = ref<number>(1)

onMounted(() => {
  loadPictures('random')
})

const loadPictures = (query: string) => {
  pictureStore.getPictures({ page: page.value, query });
  page.value++;
};

const handleSearch = () => {
  if (searchValue.value === '') {
    pictureStore.searchPictures({ query: 'random' })
  } else {
    pictureStore.searchPictures({ query: searchValue.value })
  }
}

const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;


  if (scrollY + windowHeight >= documentHeight - 10 && !pictureStore.picturesPending) {
    if (searchValue.value === '') {
      loadPictures('random');
    } else {
      loadPictures(searchValue.value);
    }
  }
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero__content">
        <div class="search">
          <form @submit.prevent="handleSearch">
            <input class="search__input" placeholder="Поиск" v-model="searchValue" />
            <button class="search__button" type="submit">
              <SearchIcon fill="black" />
            </button>
          </form>
        </div>
      </div>
    </section>
    <section class="picture">
      <div class="container">
        <div class=" picture__list" transition-duration="0.3s" item-selector=".item">
          <div class="picture__item" v-for="picture in pictureStore.pictures" :key="picture.id">
            <img :src="picture.urls.regular" :alt="picture.alt_description!" />
          </div>
        </div>
        <div v-if="pictureStore.picturesPending" class="loading">
          Loading</div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
.hero {
  width: 100%;

  margin-bottom: 130px;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 91px 20px;

    background-image: url('@/assets/images/main_background.jpeg');
    background-position: center 60%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.search {
  width: 100%;
  max-width: 866px;

  background: rgb(var(--white-800));

  position: relative;
  padding: 20px 52px 22px 25px;

  &__input {
    width: 100%;

    background: transparent;
    border: none;

    font-size: 2.5rem;
    font-weight: 300;
  }



  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 100%;

    border: none;

    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    will-change: background;
    transition: background 0.55s ease;

    cursor: pointer;
  }

  &__button>svg {
    will-change: fill;
    transition: fill 0.55s ease;
  }

  &__button:hover {
    background: rgb(var(--black-800));

    >svg {
      fill: white;
    }
  }
}


.picture {
  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  &__item {
    border-radius: 10px;
  }

  &__item>img {
    max-width: 100%;
    height: auto;
    aspect-ratio: 1;

    border-radius: inherit;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;
  font-weight: 700;
}

@media (max-width: 1024px) {
  .picture {
    &__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width:768px) {
  .picture {
    &__list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
