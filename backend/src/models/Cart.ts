import mongoose, { Document, Schema } from "mongoose";
import { Book } from "./Book";
import { User } from "./User";

export interface Cart extends Document {
  book: Book[];
  user: User;
  quantity: number;
}

const CartSchema = new Schema<Cart>({
  book: [{ type: Schema.Types.ObjectId, ref: "Book", required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const CartModel =
  (mongoose.models.Cart as mongoose.Model<Cart>) ||
  mongoose.model<Cart>("Cart", CartSchema);

export default CartModel;
