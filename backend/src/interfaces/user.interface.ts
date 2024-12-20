import { Document } from "mongoose";
import { Book } from "./book.interface";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  books?: Book[];
  cart: Book[];
}
