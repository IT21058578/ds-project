import {
  CustomerListTableColumns,
  EDeliveryStatusOptions,
  OrderTableColumns,
  ProductsListTableColumns,
  ReviewListTableColumns,
  SellerListTableColumns,
} from "./constants/admin-constants";
import { store } from "./store/store";

/* UI */
export type NavLinkItem = { label: string; link?: string };
export type NavLinkItemWithIcon = NavLinkItem & { icon?: React.ReactNode };

/* Store */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ApiRole = "ADMIN" | "SELLER" | "BUYER";

export interface IAuthState {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  roles: ApiRole[];
  email: string;
  mobile: string;
  id: string;
  isSubscribed: boolean;
  isAuthorized: boolean;
}

export interface IEndpoint {
  url: string;
  method: "post" | "delete" | "put" | "get" | "patch";
}

/* Api Responses and Requests */
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  dateOfBirth: string;
  isSubscribed: boolean;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IPageRequest {
  pageSize?: number;
  pageNum?: number;
  sortDir?: "asc" | "desc";
  sortCol?: string;
  search?: string;
}

export type OrderTableColumn =
  typeof OrderTableColumns[keyof typeof OrderTableColumns];

export type ProductListTableColumn =
  typeof ProductsListTableColumns[keyof typeof ProductsListTableColumns];

export type CustomerListTableColumn =
  typeof CustomerListTableColumns[keyof typeof CustomerListTableColumns];

export type SellerListTableColumn =
  typeof SellerListTableColumns[keyof typeof SellerListTableColumns];

export type ReviewListTableColumn =
  typeof ReviewListTableColumns[keyof typeof ReviewListTableColumns];

export type OrderTableItem = {
  [K in OrderTableColumn]: string;
} & { deliveryStatus: DeliverStatusOptionsKeyType };

export type ProductListTableItem = {
  [K in ProductListTableColumn]: string;
};

export type CustomerListTableItem = {
  [K in CustomerListTableColumn]: string;
};

export type SellerListTableItem = {
  [K in SellerListTableColumn]: string;
};

export type ReviewListTableItem = {
  [K in ReviewListTableColumn]: string;
};

export type DeliverStatusOptionsKeyType =
  typeof EDeliveryStatusOptions[keyof typeof EDeliveryStatusOptions]["value"];
