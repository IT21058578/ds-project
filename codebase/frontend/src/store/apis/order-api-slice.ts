import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import { TPageRequest } from "./types/request-types";
import { IOrderDTO, IPageDTO } from "./types/response-types";

export const orderApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		searchOrders: build.mutation<IPageDTO<IOrderDTO>, TPageRequest<IOrderDTO>>({
			query: (body) => ({
				url: `${API_URI}/orders/search`,
				method: "POST",
				body,
			}),
		}),
		createOrder: build.mutation<IOrderDTO, Omit<Partial<IOrderDTO>, "id">>({
			query: (body) => ({
				url: `${API_URI}/orders`,
				method: "POST",
				body,
			}),
		}),
		getOrder: build.query<IOrderDTO, { orderId: string }>({
			query: ({ orderId }) => `${API_URI}/orders/${orderId}`,
		}),
		updateOrder: build.mutation<Partial<IOrderDTO>, { orderId: string }>({
			query: ({ orderId, ...body }) => ({
				url: `${API_URI}/orders/${orderId}`,
				method: "PUT",
				body,
			}),
		}),
		deleteOrder: build.mutation<null, { orderId: string }>({
			query: ({ orderId }) => ({
				url: `${API_URI}/orders/${orderId}`,
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
