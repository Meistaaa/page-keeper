import axios from "axios";
import BookDetails from "../layout/BookDetails";
import { Book } from "@/types/Book";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetailsPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    const getBook = async (id: string | undefined) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/books/get-book-by-id/${id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setBook(res.data.data.book);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBook(bookId);
  }, [bookId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {book && <BookDetails book={book} />}
    </div>
  );
}
