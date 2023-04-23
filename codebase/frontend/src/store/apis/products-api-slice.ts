import { API_URI } from "../../constants/constants";
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
				url: `${API_URI}/products/search`,
				method: "POST",
				body,
			}),
		}),
		getProduct: build.query<IProductDTO, { productId: string }>({
			query: ({ productId }) => `${API_URI}/products/${productId}`,
		}),
		deleteProducts: build.mutation<null, { productId: string }>({
			query: ({ productId }) => ({
				url: `${API_URI}/products/${productId}`,
				method: "DELETE",
			}),
		}),
		createProduct: build.mutation<
			IProductDTO,
			Omit<Partial<IProductDTO>, "id">
		>({
			query: (body) => ({
				url: `${API_URI}/products`,
				method: "POST",
				body,
			}),
		}),
		editProduct: build.mutation<IProductDTO, Partial<IProductDTO>>({
			query: ({ id, ...body }) => ({
				url: `${API_URI}/products/${id}`,
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
