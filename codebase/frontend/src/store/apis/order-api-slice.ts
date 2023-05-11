import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import { TPageRequest } from "./types/request-types";
import { IOrderDTO, IPageDTO } from "./types/response-types";

export const orderApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		searchOrders: build.mutation<IPageDTO<IOrderDTO>, TPageRequest<IOrderDTO>>({
			query: (body) => ({
				url: `/orders/search`,
				method: "POST",
				body,
			}),
		}),
		createOrder: build.mutation<IOrderDTO, Omit<Partial<IOrderDTO>, "id">>({
			query: (body) => ({
				url: `/orders`,
				method: "POST",
				body,
			}),
		}),
		getOrder: build.query<IOrderDTO, { orderId: string }>({
			query: ({ orderId }) => `/orders/${orderId}`,
		}),
		updateOrder: build.mutation<Partial<IOrderDTO>, Partial<IOrderDTO>>({
			query: ({ id, ...body }) => ({
				url: `/orders/${id}`,
				method: "PUT",
				body,
			}),
		}),
		deleteOrder: build.mutation<null, { orderId: string }>({
			query: ({ orderId }) => ({
				url: `/orders/${orderId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useSearchOrdersMutation,
	useDeleteOrderMutation,
	useUpdateOrderMutation,
	useCreateOrderMutation,
	useLazyGetOrderQuery,
} = orderApi;
