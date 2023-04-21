import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import {
  IDeleteOrderRequestData,
  IGetAllUserOrdersRequestData,
  IGetOrderRequestData,
  ISearchOrdersRequestData,
  IUpdateOrderDeliveryStatusRequestData,
} from "./types/request-types";
import {
  IDeleteOrderResponseData,
  IGetAllUserOrdersResponseData,
  IGetOrderResponseData,
  ISearchOrdersResponseData,
  IUpdateOrderDeliveryStatusResponseData,
} from "./types/response-types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchOrders: build.mutation<
      ISearchOrdersResponseData,
      ISearchOrdersRequestData
    >({
      query: (body) => ({
        url: `${API_URI}/orders/search`,
        method: "POST",
        body,
      }),
    }),
    getOrder: build.query<IGetOrderResponseData, IGetOrderRequestData>({
      query: ({ orderId }) => `${API_URI}/orders/${orderId}`,
    }),
    getAllUserOrders: build.query<
      IGetAllUserOrdersResponseData,
      IGetAllUserOrdersRequestData
    >({
      query: ({ userId }) => `${API_URI}/orders/users/${userId}`,
    }),
    updateOrderPaymentStatus: build.mutation<
      IUpdateOrderDeliveryStatusResponseData,
      IUpdateOrderDeliveryStatusRequestData
    >({
      query: ({ orderId, ...body }) => ({
        url: `${API_URI}/orders/${orderId}/payment-status`,
        method: "PUT",
        body,
      }),
    }),
    updateOrderDeliveryStatus: build.mutation<
      IUpdateOrderDeliveryStatusResponseData,
      IUpdateOrderDeliveryStatusRequestData
    >({
      query: ({ orderId, ...body }) => ({
        url: `${API_URI}/orders/${orderId}/delivery-status`,
        method: "PUT",
        body,
      }),
    }),
    deleteOrder: build.mutation<
      IDeleteOrderResponseData,
      IDeleteOrderRequestData
    >({
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
  useLazyGetOrderQuery,
  useLazyGetAllUserOrdersQuery,
  useUpdateOrderPaymentStatusMutation,
  useUpdateOrderDeliveryStatusMutation,
} = orderApi;
