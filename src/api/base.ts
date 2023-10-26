import { createApi } from "unsplash-js";

export const unsplashApi = createApi({
	accessKey: import.meta.env.VITE_ACCESS_KEY as string,
	fetch,
});
