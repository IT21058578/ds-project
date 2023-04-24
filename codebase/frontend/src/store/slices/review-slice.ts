import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview, IReviewState } from "../../types";

const initialState: IReviewState = {
    review : [],
};

const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {
		getAllReviews: (
			review,
			{
				payload,
			}: PayloadAction<{
				review:IReview[];
			}>
		) => {
			review.review = payload.review;
		},
        addReview: (
            review,
            { payload }: PayloadAction<IReview>
          ) => {
            review.review!.push(payload);
          },

	},
});

// Exporting action creators
export const { getAllReviews , addReview } = reviewSlice.actions;

//Exporting reducer
export const reviewReducer = reviewSlice.reducer;
