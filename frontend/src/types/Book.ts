import { User } from "./User";

export interface Book {
  id: string;
  coverImage: string;
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
  rating: number;
}
