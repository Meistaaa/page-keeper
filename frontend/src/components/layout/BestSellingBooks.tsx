import { Book } from "@/types/Book";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";
import BookCard from "../Cards/Book";
import axios from "axios";

const BestSellingBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/books/get-all-books/1`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setBooks(response.data.data.books);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleAddToCart = (book: Book) => {
    // Implement cart functionality
    console.log("Adding to cart:", book.title);
  };

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading books: {error}
      </div>
    );
  }
  return (
    <div className="my-16 space-y-12">
      <div className="flex justify-between items-center max-w-7xl  mx-auto">
        <h1 className="text-3xl font-bold">
          Bestselling books
          <span role="img" aria-label="fire" className="ml-2">
            🔥
          </span>
        </h1>
        <a
          href="/books"
          className="text-primary hover:underline inline-flex items-center"
        >
          View All
          <span className="ml-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12  max-w-7xl  mx-auto">
        {loading
          ? books.map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="h-[300px] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))
          : books.map((book: Book) => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={handleAddToCart}
              />
            ))}
      </div>
    </div>
  );
};

export default BestSellingBooks;
