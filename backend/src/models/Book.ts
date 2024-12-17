import mongoose, { Document, Schema } from "mongoose";
import { User } from "./User";

export interface Book extends Document {
  user: User;
  title: string;
  author: string;
  description?: string;
  publicationDate: Date;
  genre:
    | "Fiction"
    | "Non-fiction"
    | "Science Fiction"
    | "Mystery"
    | "Romance"
    | "Thriller"
    | "Biography"
    | "History"
    | "Self-help"
    | "Other";
  publisher?: string;
  inStock: number;
  price: number;
  quantity: number;
}

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    publicationDate: {
      type: Date,
      required: [true, "Publication date is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "Fiction",
        "Non-fiction",
        "Science Fiction",
        "Mystery",
        "Romance",
        "Thriller",
        "Biography",
        "History",
        "Self-help",
        "Other",
      ],
    },

    publisher: {
      type: String,
      required: false,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inStock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const BookModel =
  (mongoose.models.Book as mongoose.Model<Book>) ||
  mongoose.model<Book>("Book", bookSchema);

export default BookModel;
