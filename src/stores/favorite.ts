import { defineStore } from "pinia";
import type { Basic } from "unsplash-js/dist/methods/photos/types";
import { ref } from "vue";

export const useFavoritePictures = defineStore(
	"favorite-pictures",
	() => {
		const favoritePictures = ref<Basic[]>([]);

		function addFavoritePicture(picture: Basic) {
			favoritePictures.value = [...favoritePictures.value, picture];
		}

		function removeFavoritePicture(picture: Basic) {
			favoritePictures.value = favoritePictures.value.filter(
				(favoritePicture) => favoritePicture.id !== picture.id
			);
		}

		return { favoritePictures, addFavoritePicture, removeFavoritePicture };
	},
	{ persist: true }
);
