import { createRouter, createWebHistory } from "vue-router";
import PictureListView from "../views/PictureListView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			redirect: "/pictures",
		},
		{
			path: "/pictures",
			name: "pictureList",
			component: PictureListView,
		},
		{
			path: "/pictures/:id",
			name: "pictureDetail",
			component: () => import("@/views/PictureDetailView.vue"),
		},
		{
			path: "/favorites",
			name: "favoriteList",
			component: () => import("@/views/FavoriteListView.vue"),
		},
	],
});

export const routesMap = {
	pictures: () => "/pictures",
	picture: (id: string) => `/pictures/${id}`,
	favorites: () => `/favorites`,
};

export default router;
