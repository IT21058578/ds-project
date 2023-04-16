import { API_URI } from "../../constants/admin-constants";
import {
  CustomerListTableItem,
  IPageRequest,
  SellerListTableItem,
} from "../../types";
import { baseApi } from "./base-api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id: string) => `${API_URI}/users/${id}`,
    }),
    getCustomerUser: build.query<any, { id: string }>({
      query: ({ id }) => `${API_URI}/users/customers/${id}`,
    }),
    getSellerUser: build.query<any, { id: string }>({
      query: ({ id }) => `${API_URI}/users/sellers/${id}`,
    }),
    getCustomers: build.mutation<CustomerListTableItem[], IPageRequest>({
      query: (body) => ({
        url: `${API_URI}/users/buyers/search`,
        method: "POST",
        body,
      }),
    }),
    getSellers: build.mutation<SellerListTableItem[], IPageRequest>({
      query: (body) => ({
        url: `${API_URI}/users/sellers/search`,
        method: "POST",
        body,
      }),
    }),
    deleteUser: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URI}/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useGetCustomersMutation,
  useLazyGetSellerUserQuery,
  useGetSellersMutation,
  useLazyGetCustomerUserQuery,
  useDeleteUserMutation,
} = userApi;
