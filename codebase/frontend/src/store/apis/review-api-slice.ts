import { API_URI } from "../../constants/admin-constants";
import { IPageRequest, ReviewListTableItem } from "../../types";
import { baseApi } from "./base-api";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.mutation<ReviewListTableItem[], IPageRequest>({
      query: (body) => ({
        url: `${API_URI}/reviews/search`,
        method: "POST",
        body,
      }),
    }),
    getReview: build.query<any, { id: string }>({
      query: ({ id }) => `${API_URI}/reviews/${id}`,
    }),
    deleteReview: build.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URI}/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReviewsMutation,
  useDeleteReviewMutation,
  useLazyGetReviewQuery,
} = reviewApi;
