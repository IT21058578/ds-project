import { API_URI } from "../../constants/admin-constants";
import { IPageRequest, ProductListTableItem } from "../../types";
import { baseApi } from "./base-api";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.mutation<ProductListTableItem[], IPageRequest>({
      query: (body) => ({
        url: `${API_URI}/products/search`,
        method: "POST",
        body,
      }),
    }),
    getProduct: build.query<any, { id: string }>({
      query: ({ id }) => `${API_URI}/products/${id}`,
    }),
    deleteProducts: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URI}/products/${id}`,
        method: "DELETE",
      }),
    }),
    createProduct: build.mutation<
      any,
      { name?: string; price?: string; imageUrl?: number; description?: string }
    >({
      query: (body) => ({
        url: `${API_URI}/products`,
        method: "POST",
        body,
      }),
    }),
    editProduct: build.mutation<
      any,
      {
        id: string;
        name?: string;
        price?: string;
        imageUrl?: number;
        description?: string;
      }
    >({
      query: (body) => ({
        url: `${API_URI}/products`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsMutation,
  useLazyGetProductQuery,
  useDeleteProductsMutation,
  useCreateProductMutation,
  useEditProductMutation,
} = productApi;
