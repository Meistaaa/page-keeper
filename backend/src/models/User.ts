import mongoose, { Document, Schema } from "mongoose";
import { Book } from "./Book";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  books?: Book[];
  cart: Book[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please use a valid email address"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
