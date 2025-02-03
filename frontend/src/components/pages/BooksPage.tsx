import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/Book";
import BookCard from "../Cards/Book";
import { CartContext } from "@/context/CartContext";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1; // Get page from URL or default to 1

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("TrendingBooksPage must be used within a CartProvider");
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
    const fetchTrendingBooks = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URI
          }/api/books/get-all-books?page=${page}&limit=2`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data);
        console.log(res.data.data.pagination.totalPages);
        setBooks(res.data.data.books);
        setTotalPages(res.data.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching trending books:", error);
      }
    };

    fetchTrendingBooks();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    navigate(`/books/all-books?page=${newPage}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 mt-12">All Books</h2>
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
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <span className="text-lg font-semibold">
          Page {page} of {totalPages === 0 ? 1 : totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages || books.length === 0}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
