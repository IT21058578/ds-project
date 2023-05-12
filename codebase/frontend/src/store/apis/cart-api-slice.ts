import { baseApi } from "./base-api";
import { API_URI } from "../../constants/constants";


export const cartApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCart: build.query({
            query: ({id}) => `${API_URI}/carts/${id}`
        }),
        editCart: build.mutation({
            query: ({id, ...body}) => ({
                url: `${API_URI}/carts/${id}`,
                method: 'PUT',
                body
            })
        }),
        addCart: build.mutation({
            query: cart => ({
              url: '/carts/add',
              method: 'POST',
              body: cart,
            }),
          }),
        deleteCart: build.mutation({
            query: ({id}) => ({
                url: `${API_URI}/carts/${id}`,
                method: 'DELETE',
            })
        })
	}),
});

export const {useDeleteCartMutation,useEditCartMutation,useGetCartQuery,useAddCartMutation} = cartApi;

