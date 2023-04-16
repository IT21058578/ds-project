import { API_URI } from "../../constants/admin-constants";
import {
  DeliverStatusOptionsKeyType,
  IPageRequest,
  OrderTableItem,
} from "../../types";
import { baseApi } from "./base-api";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.mutation<OrderTableItem[], IPageRequest>({
      query: (body) => ({
        url: `${API_URI}/orders/search`,
        method: "POST",
        body,
      }),
    }),
    updateOrderStatus: build.mutation<
      OrderTableItem[],
      { id: string; status: DeliverStatusOptionsKeyType }
    >({
      query: (body) => ({
        url: `${API_URI}/orders/status`,
        method: "PUT",
        body,
      }),
    }),
    getOrder: build.query<any, { id: string }>({
      query: ({ id }) => `${API_URI}/orders/${id}`,
    }),
    deleteOrder: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URI}/orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrdersMutation,
  useLazyGetOrderQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
