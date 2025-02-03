import { useContext, useEffect, useState } from "react";
import Category from "../Cards/Categories";
import { Book } from "@/types/Book";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import axios from "axios";
import BookCard from "../Cards/Book";
import { Button } from "../ui/button";

const BooksByGenre = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1; // Get page from URL or default to 1
  const genre = searchParams.get("genre");

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("RecentlySoldBooksPage must be used within a CartProvider");
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
    const fetchRecentlyOrderedBooks = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URI
          }/api/books/get-books-by-genre?genre=${genre}&page=${page}&limit=2`,
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
    fetchRecentlyOrderedBooks();
  }, [page, genre]);

  const handlePageChange = (newPage: number) => {
    navigate(`/books/genres?genre=${genre}&page=${newPage}&limit=2`);
  };
  return (
    <div>
      <Category />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{genre} Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books?.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {books.length === 0 && genre !== null && (
          <div>No Books In This Genre</div>
        )}
        {books.length === 0 && genre === null && (
          <div>Please Select A Genre</div>
        )}

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
    </div>
  );
};

export default BooksByGenre;
