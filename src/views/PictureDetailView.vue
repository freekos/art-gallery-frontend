<script setup lang="ts">
import { usePictureStore } from '@/stores/picture';
import { useFavoritePictures } from '@/stores/favorite';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import MaximizeIcon from '@/assets/icons/MaximizeIcon.vue'
import DownloadIcon from '@/assets/icons/DownloadIcon.vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue';
import FillHeartIcon from '@/assets/icons/FillHeartIcon.vue';
import SpinnerIcon from '@/assets/icons/SpinnerIcon.vue';

const route = useRoute()
const router = useRouter()
const pictureStore = usePictureStore()
const favoritePicturesStore = useFavoritePictures()
const id = computed(() => route.params.id as string)
const isFavorite = computed(() => {
  const findIndex = favoritePicturesStore.favoritePictures.findIndex((favoritePicture) => favoritePicture.id === id.value)
  return findIndex !== -1;
})
const isMaximized = ref<boolean>(false)

const handleDownloadImage = async () => {
  if (!pictureStore.picture) return
  const response = await fetch(pictureStore.picture.urls.regular)
  const blob = await response.blob()

  const pictureUrlBlob = URL.createObjectURL(blob)
  const downloadLink = document.createElement("a");
  downloadLink.href = pictureUrlBlob;
  downloadLink.download = `${pictureStore.picture.id}.jpg`;
  downloadLink.click()
  URL.revokeObjectURL(pictureUrlBlob);
}

const handleToggleFavorite = () => {
  if (!pictureStore.picture) return
  if (isFavorite.value) {
    favoritePicturesStore.removeFavoritePicture(pictureStore.picture)
  } else {
    favoritePicturesStore.addFavoritePicture(pictureStore.picture)
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, })
  pictureStore.getPicture(id.value)
})
</script>
<template>
  <main>
    <div class="back">
      <div class="container">
        <div class="back__content">
          <a @click="router.go(-1)">Назад</a>
        </div>
      </div>
    </div>
    <section class="picture_detail">
      <div class="container">
        <div class="center" v-if="!pictureStore.picture && !pictureStore.isPending">
          Нету данных
        </div>
        <SpinnerIcon v-else-if="!pictureStore.picture && pictureStore.isPending" class="loading" />
        <div v-else-if="pictureStore.picture" class="picture_detail__wrapper">
          <div class="picture_detail__background">
            <img :src="pictureStore.picture.urls.regular" alt="" />
          </div>

          <div class="picture_detail__content">
            <header class="picture_detail__header">
              <div class="picture_detail__left">
                <img class="user__img" :src="pictureStore.picture.user.profile_image.large" alt="" width="55"
                  height="55" />
                <div class="user__title">
                  <h5>{{ pictureStore.picture.user.name }}</h5>
                  <p>@{{ pictureStore.picture.user.username }}</p>
                </div>
              </div>

              <div class="picture_detail__right">
                <button :checked="isFavorite" class="picture_detail__favorite" @click="handleToggleFavorite">
                  <FillHeartIcon v-if="isFavorite" />
                  <HeartIcon v-else="isFavorite" fill="black" />
                </button>
                <button class="picture_detail__download" @click="handleDownloadImage">
                  <DownloadIcon />
                  <span>Download</span>
                </button>
              </div>
            </header>
            <div class="picture_detail__img" :class="isMaximized && 'picture_detail__img--active'">
              <img :src="pictureStore.picture.urls.regular" :alt="pictureStore.picture.alt_description!" />
              <MaximizeIcon class="picture_detail__maximize" @click="isMaximized = !isMaximized" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
.back {
  width: 100%;

  background: rgb(var(--black-800));
  padding: 20px 0;

  &__content>a {
    font-size: 1.1rem;
    font-weight: 700;
    color: rgb(var(--white-800));
    cursor: pointer;
  }
}



.picture_detail {
  position: relative;

  padding-bottom: 50px;

  &__background {
    width: 100%;
    height: 75vh;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
  }

  &__background>img {
    width: 100%;
    filter: grayscale(100%);
  }

  &__background:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background: rgb(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  &__wrapper {}

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;


    position: relative;
  }

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 70vh;


    position: relative;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.50);
    will-change: width, height, transform;
    transition: width 0.5s ease, height 0.5s ease;
  }

  &__img>img {
    /* width: 100%; */
    height: 100%;
  }

  &__img--active {
    width: 100%;
    height: 100vh;


    position: fixed;
    top: 50%;
    left: 50%;
    z-index: var(--modal-index);
    transform: translateX(-50%) translateY(-50%);

    box-shadow: none;
  }

  &__img--active>img {
    width: auto;
    height: 100%;
  }

  &__maximize {
    position: absolute;
    bottom: 30px;
    right: 30px;
    fill: darkgray;

    cursor: pointer;

    will-change: transform;
    transition: transform 0.5s ease;
  }

  &__maximize:hover {
    transform: scale(1.1);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 35px 0;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__favorite {
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    background: rgb(var(--white-800));
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 50px 0px rgba(0, 0, 0, 0.50);

    padding: 13px;
    will-change: transform;
    transition: transform 0.5s ease;
  }

  &__favorite:hover {
    transform: scale(1.025);
  }

  &__download {
    display: flex;
    align-items: center;
    gap: 15px;

    cursor: pointer;
    background: rgb(var(--yellow-800));
    border: none;
    border-radius: 8px;

    will-change: transform;
    transition: transform 0.5s ease;
    padding: 13px 24px;

    font-size: 1.25rem;
    font-weight: 400;
  }

  &__download:hover {
    transform: scale(1.025);
  }
}

.user {
  &__img {
    border: 1px solid rgb(var(--white-800));
    border-radius: 8px;
  }

  &__title {
    font-weight: 400;
  }

  &__title>h5 {
    font-size: 1.875rem;
    margin: 0;
    color: rgb(var(--white-800));
  }

  &__title>p {
    font-size: 1.125rem;
    margin: 0;
    color: rgb(189, 189, 189);
  }
}

@media (max-width:768px) {
  .picture_detail {
    &__background {
      display: none;
    }

    &__download {
      padding: 12px;
    }

    &__download>span {
      display: none;
    }

    &__img {
      height: auto;
    }
  }

  .user {
    &__title>h5 {
      font-size: 1.125rem;
      color: rgb(var(--black-800));
    }

    &__title>p {
      font-size: 0.875rem;
    }
  }
}
</style>