import { API_URI } from "../../constants/constants";
import { Iproduct } from "../../types";
import { baseApi } from "./base-api";
import { TPageRequest } from "./types/request-types";
import { IPageDTO, IProductDTO } from "./types/response-types";

export const productApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		searchProducts: build.mutation<
			IPageDTO<IProductDTO>,
			TPageRequest<IProductDTO>
		>({
			query: (body) => ({
				url: `/products/search`,
				method: "POST",
				body,
			}),
		}),
		getProduct: build.query<IProductDTO, { productId: string }>({
			query: ({ productId }) => `/products/${productId}`,
		}),
		deleteProducts: build.mutation<null, { productId: string }>({
			query: ({ productId }) => ({
				url: `/products/${productId}`,
				method: "DELETE",
			}),
		}),
		createProduct: build.mutation<
			IProductDTO,
			Omit<Partial<IProductDTO>, "id">
		>({
			query: (body) => ({
				url: `/products`,
				method: "POST",
				body,
			}),
		}),
		editProduct: build.mutation<IProductDTO, Partial<IProductDTO>>({
			query: ({ id, ...body }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body,
			}),
		}),
	}),
});

export const {
	useSearchProductsMutation,
	useLazyGetProductQuery,
	useDeleteProductsMutation,
	useCreateProductMutation,
	useEditProductMutation,
} = productApi;
