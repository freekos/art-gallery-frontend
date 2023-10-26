import { createApi } from "unsplash-js";

const ACCESS_KEY = "G-K_1l7KXOrAt72RfldpFCrq_BG_gmoIm_kAe2ZdNSc";

export const unsplashApi = createApi({
	accessKey: ACCESS_KEY,
	fetch,
});
