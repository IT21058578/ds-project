import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import {
  ICreateReviewRequestData,
  IDeleteReviewRequestData,
  IGetAllUserReviewsRequestData,
  IGetReviewRequestData,
  ISearchReviewsRequestData,
  IUpdateReviewRequestData,
} from "./types/request-types";
import {
  ICreateReviewResponseData,
  IDeleteReviewResponseData,
  IGetAllUserReviewsResponseData,
  IGetReviewResponseData,
  ISearchReviewsResponseData,
  IUpdateReviewResponseData,
} from "./types/response-types";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchReviews: build.mutation<
      ISearchReviewsResponseData,
      ISearchReviewsRequestData
    >({
      query: (body) => ({
        url: `${API_URI}/reviews/search`,
        method: "POST",
        body,
      }),
    }),
    getAllUserReviews: build.query<
      IGetAllUserReviewsResponseData,
      IGetAllUserReviewsRequestData
    >({
      query: ({ userId }) => `${API_URI}/reviews/users/${userId}`,
    }),
    createReview: build.mutation<
      ICreateReviewResponseData,
      ICreateReviewRequestData
    >({
      query: ({ productId, ...body }) => ({
        url: `${API_URI}/products/${productId}/reviews`,
        method: "POST",
        body,
      }),
    }),
    editReview: build.mutation<
      IUpdateReviewResponseData,
      IUpdateReviewRequestData
    >({
      query: ({ reviewId, ...body }) => ({
        url: `${API_URI}/reviews/${reviewId}`,
        method: "PUT",
        body,
      }),
    }),
    getReview: build.query<IGetReviewResponseData, IGetReviewRequestData>({
      query: ({ reviewId }) => `${API_URI}/reviews/${reviewId}`,
    }),
    deleteReview: build.mutation<
      IDeleteReviewResponseData,
      IDeleteReviewRequestData
    >({
      query: ({ reviewId }) => ({
        url: `${API_URI}/reviews/${reviewId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSearchReviewsMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
  useCreateReviewMutation,
  useLazyGetReviewQuery,
  useLazyGetAllUserReviewsQuery,
} = reviewApi;
