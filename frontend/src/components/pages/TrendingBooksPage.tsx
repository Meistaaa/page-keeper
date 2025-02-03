import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/Book";
import BookCard from "../Cards/Book";
import { CartContext } from "@/context/CartContext";

export default function TrendingBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { addToCart } = cartContext;

  const handleAddToCart = async (book: Book) => {
    try {
      await addToCart(book._id, 1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
  useEffect(() => {
    fetchTrendingBooks();
  }, [page]);

  const fetchTrendingBooks = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URI
        }/api/books/get-trending-books?page=${page}&limit=2`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data.trendingBooks);
      setBooks(res.data.data.trendingBooks);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching trending books:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
          <BookCard key={book._id} book={book} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span className="text-lg font-semibold">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
