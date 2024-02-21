import { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  event: { _id: string; title: string };
  buyer: { _id: string; firstName: string; lastName: string };
}

const orderSchema = new Schema({
  createdAt: {
    type: Date,
    defaule: Date.now(),
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },

  totalAmount: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
