import { Order } from "./Order";
import { PaymentResult } from "../Payment/PaymentResult";

export interface OrderListMy extends Order {
  _id: string;
  user: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  paymentResult?: PaymentResult;
}

export interface OrderListMyState {
  orders?: OrderListMy[];
  loading: boolean;
  error?: any;
}

export enum OrderListMyActionTypes {
  ORDER_LIST_MY_REQUEST = "ORDER_LIST_MY_REQUEST",
  ORDER_LIST_MY_SUCCESS = "ORDER_LIST_MY_SUCCESS",
  ORDER_LIST_MY_FAILURE = "ORDER_LIST_MY_FAILURE",
  ORDER_LIST_MY_RESET = "ORDER_LIST_MY_RESET",
}

export interface OrderListMyRequestAction {
  type: OrderListMyActionTypes.ORDER_LIST_MY_REQUEST;
}

export interface OrderListMySuccessAction {
  type: OrderListMyActionTypes.ORDER_LIST_MY_SUCCESS;
  payload: OrderListMy[];
}

export interface OrderListMyFailureAction {
  type: OrderListMyActionTypes.ORDER_LIST_MY_FAILURE;
  payload: any;
}

export interface OrderListMyResetAction {
  type: OrderListMyActionTypes.ORDER_LIST_MY_RESET;
}

export type OrderListMyAction =
  | OrderListMyRequestAction
  | OrderListMySuccessAction
  | OrderListMyFailureAction
  | OrderListMyResetAction;