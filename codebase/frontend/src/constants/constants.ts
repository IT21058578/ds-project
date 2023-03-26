export const publicAccessTokenKey: string =
	import.meta.env.VITE_PUBLIC_ACCESS_TOKEN_KEY.replace(/\\n/g, "\n");

export const API_URI: string = (import.meta.env.VITE_API_HOST || "") + "/api";
