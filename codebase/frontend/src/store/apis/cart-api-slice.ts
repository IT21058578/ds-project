import { baseApi } from "./base-api";
import { API_URI } from "../../constants/constants";
import { ICartDTO } from "./types/response-types";

export const cartApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCart: build.query<ICartDTO, { userId: string }>({
			query: ({ userId }) => `${API_URI}/carts/${userId}`,
		}),
		editCart: build.mutation<
			ICartDTO,
			{ userId: string; items: ICartDTO["items"] }
		>({
			query: ({ userId, ...body }) => ({
				url: `${API_URI}/carts/${userId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteCart: build.mutation<null, { userId: string }>({
			query: ({ userId }) => ({
				url: `${API_URI}/carts/${userId}`,
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
