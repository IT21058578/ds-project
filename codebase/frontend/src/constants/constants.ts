export const publicAccessTokenKey: string =
	import.meta.env.VITE_PUBLIC_ACCESS_TOKEN_KEY.replace(/\\n/g, "\n");

export const API_URI: string = import.meta.env.VITE_API_URI || "";

export const OrderTableColumns = {
	ID: "id",
	CREATED_BY: "createdBy",
	CREATED_ON: "createdOn",
	LAST_UPDATE: "lastUpdate",
	STATUS: "deliveryStatus",
} as const;

export const ReviewListTableColumns = {
	ID: "id",
	CREATED_BY: "createdBy",
	CREATED_ON: "createdOn",
	RATING: "rating",
} as const;

export const CustomerListTableColumns = {
	ID: "id",
	NAME: "name",
	CREATED_ON: "createdOn",
	LAST_LOGGED_AT: "lastLoggedAt",
} as const;

export const SellerListTableColumns = {
	ID: "id",
	NAME: "name",
	CREATED_ON: "createdOn",
	LAST_LOGGED_AT: "lastLoggedAt",
	ITEMS: "items",
} as const;

export const ProductsListTableColumns = {
	ID: "id",
	NAME: "name",
	BRAND: "brand",
	STOCK: "stock",
} as const;

export const EDeliveryStatusOptions = {
	NOT_STARTED: { value: "NOT_STARTED", label: "Not Started" },
	IN_PROGRESS: { value: "IN_PROGRESS", label: "In Progress" },
	FINISHED: { value: "FINISHED", label: "Finished" },
} as const;

export const EPaymentStatusOptions = {
	PAID: { value: "PAID", label: "Paid" },
	UNPAID: { value: "UNPAID", label: "Unpaid" },
};
