import { API_URI } from "../../constants/constants";
import { baseApi } from "./base-api";
import { TPageRequest } from "./types/request-types";
import { IPageDTO, IReviewDTO } from "./types/response-types";

export const reviewApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		searchReviews: build.mutation<
			IPageDTO<IReviewDTO>,
			TPageRequest<IReviewDTO>
		>({
			query: (body) => ({
				url: `${API_URI}/reviews/search`,
				method: "POST",
				body,
			}),
		}),
		createReview: build.mutation<IReviewDTO, Omit<Partial<IReviewDTO>, "id">>({
			query: (body) => ({
				url: `${API_URI}/reviews`,
				method: "POST",
				body,
			}),
		}),
		editReview: build.mutation<IReviewDTO, Partial<IReviewDTO>>({
			query: ({ id, ...body }) => ({
				url: `${API_URI}/reviews/${id}`,
				method: "PUT",
				body,
			}),
		}),
		getReview: build.query<IReviewDTO, { reviewId: string }>({
			query: ({ reviewId }) => `${API_URI}/reviews/${reviewId}`,
		}),
		deleteReview: build.mutation<null, { reviewId: string }>({
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
} = reviewApi;
