import { useState } from "react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Star } from "lucide-react";
import { Book } from "@/types/Book";

export default function BookDetails({ book }: { book: Book }) {
  const [quantity, setQuantity] = useState(book.quantity);
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
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
            <div className="flex items-center mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(quantity - 1)}
                aria-label={`Decrease quantity of ${book.title}`}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value, 10))
                }
                className="w-16 mx-2 text-center"
                aria-label={`Quantity of ${book.title}`}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(quantity + 1)}
                aria-label={`Increase quantity of ${book.title}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
