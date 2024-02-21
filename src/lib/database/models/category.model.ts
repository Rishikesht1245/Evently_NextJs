import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = models.Category || model("Category", categorySchema);
export default Category;
