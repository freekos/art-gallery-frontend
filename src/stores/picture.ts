import { unsplashApi } from "@/api";
import { defineStore } from "pinia";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

import { ref } from "vue";

export const usePicturesStore = defineStore("pictures", () => {
	const pictures = ref<Basic[]>([]);
	const isPending = ref<boolean>(false);
	const totalPages = ref<number | null>(null);

	function getPictures({
		page,
		perPage = 8,
		query,
	}: {
		page: number;
		perPage?: number;
		query: string;
	}) {
		isPending.value = true;
		unsplashApi.search
			.getPhotos({ page: page, perPage, query, orientation: "squarish" })
			.then((res) => {
				if (res.type === "success") {
					pictures.value = [...pictures.value, ...res.response.results];
					totalPages.value = res.response.total_pages;
				}
			})
			.finally(() => {
				isPending.value = false;
			});
	}

	function searchPictures({ query }: { query: string }) {
		isPending.value = true;
		unsplashApi.search
			.getPhotos({ page: 1, perPage: 8, query, orientation: "squarish" })
			.then((res) => {
				if (res.type === "success") {
					pictures.value = [...res.response.results];
					totalPages.value = res.response.total_pages;
				}
			})
			.finally(() => {
				isPending.value = false;
			});
	}

	return {
		pictures,
		isPending,
		totalPages,
		getPictures,
		searchPictures,
	};
});

export const usePictureStore = defineStore("picture", () => {
	const picture = ref<Basic | null>(null);
	const isPending = ref<boolean>(false);
	const picturesStore = usePicturesStore();

	function getPicture(id: string) {
		isPending.value = true;
		const findIndex = picturesStore.pictures.findIndex((picture) => picture.id === id);
		if (findIndex !== -1) {
			isPending.value = false;
			picture.value = picturesStore.pictures[findIndex];
		} else {
			unsplashApi.photos
				.get({ photoId: id })
				.then((res) => {
					if (res.type === "success") {
						picture.value = res.response;
					}
				})
				.finally(() => {
					isPending.value = false;
				});
		}
	}

	return { picture, isPending, getPicture };
});
