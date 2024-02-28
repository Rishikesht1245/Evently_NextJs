import { Document, Schema, Types, model, models } from "mongoose";

// setting types for out model

export interface IEvent extends Document {
  title: string;
  description?: string;
  location?: string;
  createdAt?: Date;
  imageUrl: string;
  startDateTime?: Date;
  endDateTime?: Date;
  price: string;
  isFree: boolean;
  url?: string;
  //Here we mentioned the data which we will populate
  category?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
}

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now() },
  endDateTime: { type: Date, default: Date.now() },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

// existing model or creating new model
const Event = models.Event || model("Event", eventSchema);

export default Event;
