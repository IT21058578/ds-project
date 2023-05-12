import { API_URI } from "../../constants/constants";
import { Iproduct } from "../../types";
import { baseApi } from "./base-api";
import {
  ICreateProductRequestData,
  IDeleteProductRequestData,
  IGetProductRequestData,
  ISearchProductsRequestData,
  IUpdateProductRequestData,
} from "./types/request-types";
import {
  ICreateProductResponseData,
  IDeleteProductResponseData,
  IGetProductResponseData,
  ISearchProductsResponseData,
  IUpdateProductResponseData,
} from "./types/response-types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchProducts: build.mutation<
      ISearchProductsResponseData,
      ISearchProductsRequestData
    >({
      query: (body) => ({
        url: `${API_URI}/products/search`,
        method: "POST",
        body,
      }),
    }),
    // getProduct: build.query<IGetProductResponseData, IGetProductRequestData>({
    //   query: ({ productId }) => `${API_URI}/products/${productId}`,
    // }),
    getProduct: build.query<Iproduct, { id: string }>({
      query: ({ id }) => `${API_URI}/products/${id}`,
    }),
    getProducts: build.query<Iproduct[], void>({
      query: () => `${API_URI}/products}`,
    }),
    deleteProducts: build.mutation<
      IDeleteProductResponseData,
      IDeleteProductRequestData
    >({
      query: ({ productId }) => ({
        url: `${API_URI}/products/${productId}`,
        method: "DELETE",
      }),
    }),
    createProduct: build.mutation<
      ICreateProductResponseData,
      ICreateProductRequestData
    >({
      query: (body) => ({
        url: `${API_URI}/products`,
        method: "POST",
        body,
      }),
    }),
    editProduct: build.mutation<
      IUpdateProductResponseData,
      IUpdateProductRequestData
    >({
      query: ({ productId, ...body }) => ({
        url: `${API_URI}/products/${productId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useSearchProductsMutation,
  useGetProductQuery,
  useDeleteProductsMutation,
  useCreateProductMutation,
  useEditProductMutation,
  useGetProductsQuery
} = productApi;
