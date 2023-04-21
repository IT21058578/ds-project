import { model, Schema } from "mongoose";
import { OrderDocument } from "../types/";


const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    date: {
        type: Date,
      },
    deliveryfee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    payment: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0.0,
    },
    deliverystatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<OrderDocument>("Order", orderSchema);
