import { useState } from "react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { Book } from "@/types/Book";

export default function BookDetails({ book }: { book: Book }) {
  const [quantity, setQuantity] = useState(book.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1 && newQuantity <= book.inStock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16">
      <div className="flex gap-8">
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            className=" h-[300px] object-fit rounded-md shadow-md"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl mb-2">{book.title}</h1>
              <p>by {book.author}</p>
            </div>
            <Badge>{book.genre}</Badge>
          </div>
          <p>{book.description}</p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Publication Date:</strong>{" "}
            {format(book.publicationDate, "yyyy-MM-dd")}
          </p>
          <p>
            <strong>In Stock:</strong> {book.inStock}
          </p>
          <div className="flex items-center">
            <strong className="mr-2">Rating:</strong>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2">{book.rating}</span>
          </div>
          <div className="flex  items-center">
            <div className="text-2xl font-bold">${book.price}</div>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min={1}
                max={book.inStock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20"
              />
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
