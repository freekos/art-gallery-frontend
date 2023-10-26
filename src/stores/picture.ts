import { unsplashApi } from "@/api";
import { defineStore } from "pinia";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

import { ref } from "vue";

export const usePictureStore = defineStore("picture", () => {
	const pictures = ref<Basic[]>([]);
	const picturesPending = ref<boolean>(false);
	const picture = ref<Basic | null>(null);
	const picturePending = ref<boolean>(false);

	function getPictures({
		page,
		perPage = 8,
		query,
	}: {
		page: number;
		perPage?: number;
		query: string;
	}) {
		picturesPending.value = true;
		unsplashApi.search
			.getPhotos({ page: page, perPage, query, orientation: "squarish" })
			.then((res) => {
				picturesPending.value = false;
				if (res.type === "success") {
					pictures.value = [...pictures.value, ...res.response.results];
				}
			});
	}

	function getPicture(id: string) {
		picturePending.value = true;
		const findIndex = pictures.value.findIndex((picture) => picture.id === id);
		if (findIndex !== -1) {
			picturePending.value = false;
			picture.value = pictures.value[findIndex];
		} else {
			unsplashApi.photos.get({ photoId: id }).then((res) => {
				picturePending.value = false;
				if (res.type === "success") {
					picture.value = res.response;
				}
			});
		}
	}

	function searchPictures({ query }: { query: string }) {
		unsplashApi.search
			.getPhotos({ page: 1, perPage: 8, query, orientation: "squarish" })
			.then((res) => {
				if (res.type === "success") {
					pictures.value = [...res.response.results];
				}
			});
	}

	return {
		pictures,
		picturesPending,
		picture,
		picturePending,
		getPictures,
		getPicture,
		searchPictures,
	};
});
