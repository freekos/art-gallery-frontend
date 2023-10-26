<script setup lang="ts">
import { routesMap } from '@/router';
import { useFavoritePictures } from '@/stores/favorite';
import { useRouter } from 'vue-router';

const router = useRouter()
const favoritePicturesStore = useFavoritePictures()

const handleClickPicture = (id: string) => {
  router.push(routesMap.picture(id))
}

</script>
<template>
  <main>
    <section class="favorite_picture">
      <div class="container">
        <h1 class="favorite_picture__title">Избранное</h1>

        <div v-if="!favoritePicturesStore.favoritePictures.length">Нету избранных</div>
        <div v-else class="favorite_picture__list" transition-duration="0.3s" item-selector=".item">
          <div class="favorite_picture__item" v-for="picture in favoritePicturesStore.favoritePictures" :key="picture.id"
            @click="handleClickPicture(picture.id)">
            <img :src="picture.urls.regular" :alt="picture.alt_description!" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
.favorite_picture {
  padding-top: 110px;
  padding-bottom: 167px;

  &__title {
    font-size: 4.5rem;
    font-weight: 700;
    margin: 0;

    text-align: center;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    margin-top: 100px;
  }

  &__item {
    border-radius: 10px;

    cursor: pointer;
  }

  &__item>img {
    max-width: 100%;
    height: auto;
    aspect-ratio: 1;

    border-radius: inherit;
  }
}

@media (max-width: 1024px) {
  .favorite_picture {
    &__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width:768px) {


  .favorite_picture {
    padding-top: 40px;
    padding-bottom: 50px;

    &__title {
      font-size: 2.25rem;
    }

    &__list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>