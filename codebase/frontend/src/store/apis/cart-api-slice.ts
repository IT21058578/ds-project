import { baseApi } from "./base-api";
import { ICartDTO } from "./types/response-types";

export const cartApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCart: build.query<ICartDTO, { userId: string }>({
			query: ({ userId }) => `/carts/${userId}`,
		}),
		editCart: build.mutation<
			ICartDTO,
			{ userId: string; items: ICartDTO["items"] }
		>({
			query: ({ userId, ...body }) => ({
				url: `]/carts/${userId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteCart: build.mutation<null, { userId: string }>({
			query: ({ userId }) => ({
				url: `/carts/${userId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useDeleteCartMutation,
	useEditCartMutation,
	useLazyGetCartQuery,
} = cartApi;
